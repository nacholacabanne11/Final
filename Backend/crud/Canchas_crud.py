from sqlalchemy.orm import Session
from ..models.Canchas import Cancha
from ..schemas.Canchas import CanchaCreate
from fastapi import HTTPException

def obtener_cancha(db: Session):
    return db.query(Cancha).all()

def obtener_cancha_por_id(db: Session, id: int):
   cancha_db =  db.query(Cancha).filter(Cancha.id == id).first()
   if not cancha_db:
        raise Exception(f"No se encontro la cancha con id {id}")
   return cancha_db

def crear_cancha(db: Session, canchas: CanchaCreate):
    if(canchas.nombre == "" or canchas.techada == None):
        raise HTTPException(status_code=422, detail="El nombre o techada no pueden estar vacios")
    if verificar_cancha(db, canchas):
        raise HTTPException(status_code=500, detail="El nombre de la cancha ya existe")

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
    if not db_cancha:
        raise HTTPException(status_code=404, detail="Cancha no encontrada")
    if db_cancha:
        for key, value in canchas.model_dump(exclude_unset=True).items():
            setattr(db_cancha, key, value)
            db.commit()
            db.refresh(db_cancha)
        return db_cancha

def eliminar_cancha(db: Session, cancha_id: int):
    db_cancha = db.query(Cancha).filter(Cancha.id == cancha_id).first()
    if not db_cancha:
        raise HTTPException(status_code=404, detail="Cancha no encontrada")
    if db_cancha:
        db.delete(db_cancha)
        db.commit()
        return db_cancha

def verificar_cancha(db: Session, cancha: CanchaCreate):
    cancha_db = db.query(Cancha).filter(
        Cancha.nombre == cancha.nombre,
    ).first()
    return cancha_db 