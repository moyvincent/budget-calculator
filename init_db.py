import asyncio
from app.core.init_db import init_db, create_first_superuser

async def main() -> None:
    print("Creating initial data")
    init_db()
    create_first_superuser()
    print("Initial data created")

if __name__ == "__main__":
    asyncio.run(main()) 