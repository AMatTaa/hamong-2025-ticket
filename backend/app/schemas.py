from pydantic import BaseModel, constr, validator
from typing import Optional
from datetime import datetime

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
    id: str
    created_at: str

    class Config:
        orm_mode = True

class RSVPResponse(BaseModel):
    message: str
    rsvp: RSVP