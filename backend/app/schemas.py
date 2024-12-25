from pydantic import BaseModel, Field, field_validator
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
    phone_number: constr(regex=r'^\+?1?\d{9,15}$')
    name: constr(min_length=1, max_length=100)
    guest_count: int

    @validator('guest_count')
    def validate_guest_count(cls, v):
        if v < 1 or v > 10:
            raise ValueError('Guest count must be between 1 and 10')
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