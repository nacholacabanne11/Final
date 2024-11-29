from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

DATABASE_URL = "postgresql://postgres:1234@localhost:5432/final_lab4"

try:
    engine = create_engine(DATABASE_URL)
    print("Conexión exitosa a la base de datos.")
except UnicodeDecodeError as e:
    print("Error de codificación:", e)
except Exception as e:
    print("Error inesperado:", e)

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()