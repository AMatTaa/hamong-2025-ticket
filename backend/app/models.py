from sqlalchemy import Column, SmallInteger, String, DateTime, Boolean, text
from database import Base

class RSVP(Base):
    __tablename__ = "rsvps"

    idx = Column(SmallInteger, primary_key=True, autoincrement=True, nullable=False)
    cancelled = Column(Boolean, nullable=False, default=False)
    guest_name = Column(String(100), nullable=False)
    guest_contact = Column(String(50), nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    accompany = Column(SmallInteger, nullable=False, default=1)