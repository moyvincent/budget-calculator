from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.deps import get_current_active_user, get_db, get_current_user
from app.crud.transaction import (
    create_income, get_income, get_user_incomes, update_income, delete_income,
    create_expense, get_expense, get_user_expenses, update_expense, delete_expense
)
from app.models.user import User
from app.models.transaction import Transaction, TransactionType
from app.schemas.transaction import (
    Income, IncomeCreate, IncomeUpdate,
    Expense, ExpenseCreate, ExpenseUpdate,
    Transaction as TransactionSchema,
    TransactionCreate,
    TransactionUpdate,
)
from sqlalchemy import select, and_

router = APIRouter(prefix="/transactions", tags=["transactions"])

# Income routes
@router.post("/incomes", response_model=Income, status_code=status.HTTP_201_CREATED)
def create_user_income(
    *,
    db: Session = Depends(get_db),
    income_in: IncomeCreate,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Create new income for current user.
    """
    income = create_income(db, income_in, current_user.id)
    return income

@router.get("/incomes", response_model=List[Income])
def read_user_incomes(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Retrieve incomes for current user.
    """
    incomes = get_user_incomes(db, current_user.id, skip=skip, limit=limit)
    return incomes

@router.get("/incomes/{income_id}", response_model=Income)
def read_user_income(
    *,
    db: Session = Depends(get_db),
    income_id: int,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Get a specific income by ID.
    """
    income = get_income(db, income_id)
    if not income:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Income not found"
        )
    if income.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return income

@router.put("/incomes/{income_id}", response_model=Income)
def update_user_income(
    *,
    db: Session = Depends(get_db),
    income_id: int,
    income_in: IncomeUpdate,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Update an income.
    """
    income = get_income(db, income_id)
    if not income:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Income not found"
        )
    if income.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    income = update_income(db, income_id, income_in)
    return income

@router.delete("/incomes/{income_id}", response_model=Income)
def delete_user_income(
    *,
    db: Session = Depends(get_db),
    income_id: int,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Delete an income.
    """
    income = get_income(db, income_id)
    if not income:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Income not found"
        )
    if income.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    income = delete_income(db, income_id)
    return income

# Expense routes
@router.post("/expenses", response_model=Expense, status_code=status.HTTP_201_CREATED)
def create_user_expense(
    *,
    db: Session = Depends(get_db),
    expense_in: ExpenseCreate,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Create new expense for current user.
    """
    expense = create_expense(db, expense_in, current_user.id)
    return expense

@router.get("/expenses", response_model=List[Expense])
def read_user_expenses(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Retrieve expenses for current user.
    """
    expenses = get_user_expenses(db, current_user.id, skip=skip, limit=limit)
    return expenses

@router.get("/expenses/{expense_id}", response_model=Expense)
def read_user_expense(
    *,
    db: Session = Depends(get_db),
    expense_id: int,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Get a specific expense by ID.
    """
    expense = get_expense(db, expense_id)
    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )
    if expense.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return expense

@router.put("/expenses/{expense_id}", response_model=Expense)
def update_user_expense(
    *,
    db: Session = Depends(get_db),
    expense_id: int,
    expense_in: ExpenseUpdate,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Update an expense.
    """
    expense = get_expense(db, expense_id)
    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )
    if expense.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    expense = update_expense(db, expense_id, expense_in)
    return expense

@router.delete("/expenses/{expense_id}", response_model=Expense)
def delete_user_expense(
    *,
    db: Session = Depends(get_db),
    expense_id: int,
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """
    Delete an expense.
    """
    expense = get_expense(db, expense_id)
    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )
    if expense.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    expense = delete_expense(db, expense_id)
    return expense

@router.post("", response_model=TransactionSchema)
async def create_transaction(
    *,
    db: AsyncSession = Depends(get_db),
    transaction_in: TransactionCreate,
    current_user: User = Depends(get_current_user),
) -> Transaction:
    transaction = Transaction(
        **transaction_in.model_dump(),
        user_id=current_user.id
    )
    db.add(transaction)
    await db.commit()
    await db.refresh(transaction)
    return transaction

@router.get("", response_model=List[TransactionSchema])
async def read_transactions(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    transaction_type: TransactionType = None,
    current_user: User = Depends(get_current_user),
) -> List[Transaction]:
    query = select(Transaction).filter(Transaction.user_id == current_user.id)
    if transaction_type:
        query = query.filter(Transaction.type == transaction_type)
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/{transaction_id}", response_model=TransactionSchema)
async def read_transaction(
    *,
    db: AsyncSession = Depends(get_db),
    transaction_id: int,
    current_user: User = Depends(get_current_user),
) -> Transaction:
    result = await db.execute(
        select(Transaction).filter(
            and_(
                Transaction.id == transaction_id,
                Transaction.user_id == current_user.id
            )
        )
    )
    transaction = result.scalar_one_or_none()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

@router.put("/{transaction_id}", response_model=TransactionSchema)
async def update_transaction(
    *,
    db: AsyncSession = Depends(get_db),
    transaction_id: int,
    transaction_in: TransactionUpdate,
    current_user: User = Depends(get_current_user),
) -> Transaction:
    result = await db.execute(
        select(Transaction).filter(
            and_(
                Transaction.id == transaction_id,
                Transaction.user_id == current_user.id
            )
        )
    )
    transaction = result.scalar_one_or_none()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    
    update_data = transaction_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(transaction, field, value)
    
    await db.commit()
    await db.refresh(transaction)
    return transaction

@router.delete("/{transaction_id}", response_model=TransactionSchema)
async def delete_transaction(
    *,
    db: AsyncSession = Depends(get_db),
    transaction_id: int,
    current_user: User = Depends(get_current_user),
) -> Transaction:
    result = await db.execute(
        select(Transaction).filter(
            and_(
                Transaction.id == transaction_id,
                Transaction.user_id == current_user.id
            )
        )
    )
    transaction = result.scalar_one_or_none()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    
    await db.delete(transaction)
    await db.commit()
    return transaction 