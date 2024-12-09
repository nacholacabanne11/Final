from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

DATABASE_URL = "postgresql+psycopg2://postgres:postgres@localhost/laboratorio4"

try:
    engine = create_engine(DATABASE_URL)
    print("Conexión establecida")
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