from fastapi import FastAPI, HTTPException, Depends, Security, status
from fastapi.security import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import RSVP, RSVPResponse, RSVPCreate
from typing import List
from datetime import datetime
import os
import boto3
from botocore.exceptions import ClientError
from dotenv import load_dotenv
from fastapi.responses import FileResponse
import uuid

# Load environment variables
load_dotenv()

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:5173",  # Vite default dev server
    "http://localhost:3000",
    os.getenv("FRONTEND_URL", ""),  # Production frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

async def get_api_key(
    api_key_header: str = Security(api_key_header),
) -> str:
    if api_key_header == os.getenv("ADMIN_API_KEY"):
        return api_key_header
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid API Key"
    )

# DynamoDB setup
dynamodb = boto3.resource('dynamodb',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_REGION')
)
table = dynamodb.Table(os.getenv('DYNAMODB_TABLE_NAME'))

@app.post("/api/send_rsvp", response_model=RSVPResponse)
async def send_rsvp(rsvp: RSVPCreate):
    """
    Create a new RSVP entry in DynamoDB
    """
    try:
        rsvp_item = {
            'id': str(uuid.uuid4()),
            'phone_number': rsvp.phone_number,
            'name': rsvp.name,
            'guest_count': rsvp.guest_count,
            'created_at': datetime.utcnow().isoformat()
        }
        
        table.put_item(Item=rsvp_item)
        
        return {
            "message": "RSVP successfully created",
            "rsvp": rsvp_item
        }
    except ClientError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create RSVP: {str(e)}"
        )

@app.get("/api/get_info")
async def get_info():
    """
    Return event image
    """
    try:
        image_path = os.getenv("EVENT_IMAGE_PATH")
        if not image_path or not os.path.exists(image_path):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Image not found"
            )
        return FileResponse(image_path)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve image"
        )

@app.get("/api/admin/rsvps", response_model=List[RSVP])
async def get_all_rsvps(
    api_key: str = Depends(get_api_key)
):
    """
    Get all RSVPs from DynamoDB (admin only)
    """
    try:
        response = table.scan()
        items = response.get('Items', [])
        
        # Handle pagination if there are more items
        while 'LastEvaluatedKey' in response:
            response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            items.extend(response['Items'])
            
        return items
    except ClientError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve RSVPs: {str(e)}"
        )
    