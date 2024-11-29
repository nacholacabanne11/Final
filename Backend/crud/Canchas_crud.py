from sqlalchemy.orm import Session
from ..models.Canchas import Cancha
from ..schemas.Canchas import CanchaCreate

def obtener_cancha(db: Session):
    return db.query(Cancha).all()

def obtener_cancha_por_id(db: Session, id: int):
   return  db.query(Cancha).filter(Cancha.id == id).first()

def crear_cancha(db: Session, canchas: CanchaCreate):
    try:
        db_cancha = Cancha(**canchas.model_dump())
        db.add(db_cancha)
        db.commit()
        db.refresh(db_cancha)
        
        return db_cancha
    
    except Exception as e:
        print(f"Error al crear cancha: {e}")
        db.rollback()
        raise e

def actualizar_cancha(db: Session, cancha_id: int, canchas: CanchaCreate):
    db_cancha = db.query(Cancha).filter(Cancha.id == cancha_id).first()
    if db_cancha:
        for key, value in canchas.model_dump(exclude_unset=True).items():
            setattr(db_cancha, key, value)
            db.commit()
            db.refresh(db_cancha)
        return db_cancha

def eliminar_cancha(db: Session, cancha_id: int):
    db_cancha = db.query(Cancha).filter(Cancha.id == cancha_id).first()
    if db_cancha:
        db.delete(db_cancha)
        db.commit()
        return db_cancha
    