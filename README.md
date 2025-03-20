# Budget Calculator API

A FastAPI-based REST API for managing personal budgets and tracking income/expenses.

## Features

- User authentication with JWT tokens
- User management (registration, profile updates)
- Transaction management (income and expenses)
- Role-based access control
- PostgreSQL database with async support
- API documentation with Swagger UI

## Prerequisites

- Python 3.7+
- PostgreSQL
- Virtual environment (recommended)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/budget-calculator-api.git
cd budget-calculator-api
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the root directory with the following content:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/budget_calculator
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

5. Initialize the database:
```bash
python -m app.db.init_db
```

## Running the Application

Start the FastAPI server:
```bash
python run.py
```

The API will be available at `http://localhost:8000`

API documentation will be available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and get access token

### Users
- `GET /api/v1/users/me` - Get current user info
- `PUT /api/v1/users/me` - Update current user info
- `GET /api/v1/users` - List all users (admin only)
- `GET /api/v1/users/{user_id}` - Get user by ID (admin only)

### Transactions
- `POST /api/v1/transactions` - Create a new transaction
- `GET /api/v1/transactions` - List user's transactions
- `GET /api/v1/transactions/{transaction_id}` - Get transaction by ID
- `PUT /api/v1/transactions/{transaction_id}` - Update transaction
- `DELETE /api/v1/transactions/{transaction_id}` - Delete transaction

## Development

To run tests:
```bash
pytest
```

## License

This project is licensed under the MIT License.
