from pydantic import BaseModel, constr, validator, Field
from typing import Optional
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, SmallInteger, Boolean, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

# Base = declarative_base()

# class RSVPTable(Base):
#     __tablename__ = "rsvps"

#     idx = Column(SmallInteger, primary_key=True, autoincrement=True, nullable=False)
#     cancelled = Column(Boolean, nullable=False, default=False)
#     guest_name = Column(String, nullable=False)
#     guest_contact = Column(String(50), nullable=False)
#     created_at = Column(DateTime(timezone=True), nullable=False, server_default='CURRENT_TIMESTAMP')
#     accompany = Column(SmallInteger, nullable=False, default=1)

class RSVPBase(BaseModel):
    phone: str = Field(..., pattern=r'^\d{11}$')  # Changed pattern to exactly 11 digits
    name: str = Field(..., min_length=1, max_length=100)
    guests: int = Field(..., ge=0, le=10)

    @validator('phone')
    def validate_phone(cls, v):
        if not v.isdigit() or len(v) != 11:
            raise ValueError('Phone number must be exactly 11 digits')
        return v

class RSVPCreate(RSVPBase):
    pass

class RSVP(RSVPBase):
    idx: int  # Changed from id to idx to match database schema
    created_at: datetime

    class Config:
        from_attributes = True

class RSVPResponse(BaseModel):
    message: str
    rsvp: RSVP