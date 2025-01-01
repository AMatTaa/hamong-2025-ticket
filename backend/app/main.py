from fastapi import FastAPI, HTTPException, Depends, Security, status
from fastapi.security import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
from .schemas import RSVP, RSVPResponse, RSVPCreate, RSVPBase
from .models import RSVP as RSVPModel, Base
from .database import SessionLocal, engine
from typing import List
from datetime import datetime
import os
from dotenv import load_dotenv
from fastapi.responses import FileResponse
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
import traceback
import uvicorn
import logging

# Load environment variables
load_dotenv()

app = FastAPI(debug=True)

# Add prefix to all routes
app.router.prefix = "/api"

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your actual domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.get("/")
async def root():
    return {"message": "Hello World"}

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Add table creation here, after database setup and before routes
def init_db():
    try:
        # Drop all tables
        # Base.metadata.drop_all(bind=engine)
        # Create all tables
        Base.metadata.create_all(bind=engine)
        print("Database tables created successfully")
    except Exception as e:
        print(f"Error creating database tables: {e}")

# Call it when the app starts
init_db()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/send_rsvp", response_model=RSVPResponse)
async def send_rsvp(rsvp: RSVPCreate, db: Session = Depends(get_db)):
    """
    Create a new RSVP entry in PostgreSQL
    """
    logger.info(f"Received RSVP request: {rsvp}")
    try:
        # Use the correct model from models.py
        db_rsvp = RSVPModel(
            guest_contact=str(rsvp.phone),  # Map phone to guest_contact
            guest_name=str(rsvp.name),      # Map name to guest_name
            accompany=int(rsvp.guests)      # Map guests to accompany
        )
        print("Created DB model:", db_rsvp.__dict__)  # Debug log
        db.add(db_rsvp)
        db.commit()
        db.refresh(db_rsvp)
        
        # Convert to response format
        response_rsvp = RSVP(
            phone=db_rsvp.guest_contact,
            name=db_rsvp.guest_name,
            guests=db_rsvp.accompany,
            idx=db_rsvp.idx,
            created_at=db_rsvp.created_at
        )
        
        logger.info("RSVP created successfully")
        return {"message": "RSVP created successfully", "rsvp": response_rsvp}
    except Exception as e:
        logger.error(f"Error creating RSVP: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/get_info")
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
    

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        ssl_keyfile="./localhost+2-key.pem",  # path to your key file
        ssl_certfile="./localhost+2.pem",     # path to your cert file
        reload=True
    )