from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.transaction import TransactionType

class TransactionBase(BaseModel):
    amount: float
    description: Optional[str] = None
    category: str
    type: TransactionType
    date: datetime

class TransactionCreate(TransactionBase):
    pass

class TransactionUpdate(BaseModel):
    amount: Optional[float] = None
    description: Optional[str] = None
    category: Optional[str] = None
    type: Optional[TransactionType] = None
    date: Optional[datetime] = None

class TransactionInDBBase(TransactionBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class Transaction(TransactionInDBBase):
    pass 