from sqlalchemy import Column, Integer, String, DateTime
from database import Base

class RSVP(Base):
    __tablename__ = "rsvps"

    id = Column(Integer, primary_key=True, index=True)
    phone_number = Column(String, index=True)
    name = Column(String)
    guest_count = Column(Integer)
    created_at = Column(DateTime)