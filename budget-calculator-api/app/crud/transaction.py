from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.transaction import Income, Expense
from app.schemas.transaction import IncomeCreate, IncomeUpdate, ExpenseCreate, ExpenseUpdate

# Income CRUD operations
def create_income(db: Session, income: IncomeCreate, user_id: int) -> Income:
    db_income = Income(**income.model_dump(), user_id=user_id)
    db.add(db_income)
    db.commit()
    db.refresh(db_income)
    return db_income

def get_income(db: Session, income_id: int) -> Optional[Income]:
    return db.query(Income).filter(Income.id == income_id).first()

def get_user_incomes(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> List[Income]:
    return db.query(Income).filter(Income.user_id == user_id).offset(skip).limit(limit).all()

def update_income(db: Session, income_id: int, income: IncomeUpdate) -> Optional[Income]:
    db_income = get_income(db, income_id)
    if not db_income:
        return None
    
    update_data = income.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_income, field, value)
    
    db.commit()
    db.refresh(db_income)
    return db_income

def delete_income(db: Session, income_id: int) -> Optional[Income]:
    income = db.query(Income).filter(Income.id == income_id).first()
    if income:
        db.delete(income)
        db.commit()
    return income

# Expense CRUD operations
def create_expense(db: Session, expense: ExpenseCreate, user_id: int) -> Expense:
    db_expense = Expense(**expense.model_dump(), user_id=user_id)
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

def get_expense(db: Session, expense_id: int) -> Optional[Expense]:
    return db.query(Expense).filter(Expense.id == expense_id).first()

def get_user_expenses(db: Session, user_id: int, skip: int = 0, limit: int = 100) -> List[Expense]:
    return db.query(Expense).filter(Expense.user_id == user_id).offset(skip).limit(limit).all()

def update_expense(db: Session, expense_id: int, expense: ExpenseUpdate) -> Optional[Expense]:
    db_expense = get_expense(db, expense_id)
    if not db_expense:
        return None
    
    update_data = expense.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_expense, field, value)
    
    db.commit()
    db.refresh(db_expense)
    return db_expense

def delete_expense(db: Session, expense_id: int) -> Optional[Expense]:
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if expense:
        db.delete(expense)
        db.commit()
    return expense 