from datetime import date
from sqlalchemy.orm import Session
from ..models.Reserva import Reserva
from ..schemas.Reserva import ReservaCreate
from sqlalchemy.sql import extract
from sqlalchemy import and_, extract,or_
from fastapi import HTTPException


def obtener_reserva(db: Session):
    return db.query(Reserva).all()

def obtener_reserva_id(db: Session, id: int):
    return db.query(Reserva).filter(Reserva.id == id).first()

def crear_reserva(db:Session, reserva:ReservaCreate):
    try:
        if verificar_reserva(db, reserva.cancha_id, reserva.dia, reserva.hora, reserva.duracion) is not None:
            raise HTTPException(status_code=400, detail="ya existe una reserva, cambie de cancha o de horario reserva")
        
        db_reserva = Reserva(**reserva.model_dump())
        db.add(db_reserva)
        db.commit()
        db.refresh(db_reserva)
        return db_reserva

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        print(f"Error al crear reserva: {e}")
        db.rollback()
        raise e
    
def actualizar_reserva(db:Session, id:int, reserva:Reserva):
    db_reserva= db.query(Reserva).filter(Reserva.id == id).first()
    if db_reserva:
        for key, value in reserva.model_dump(exclude_unset=True).items():
            setattr(db_reserva, key, value)
            db.commit()
            db.refresh(db_reserva)
        return db_reserva
    
def eliminar_reserva(db:Session, id:int):
    db_reserva= db.query(Reserva).filter(Reserva.id == id).first()
    if db_reserva: 
        db.delete(db_reserva)
        db.commit()
        return db_reserva
    
def filtrar_reserva(db:Session, cancha_id:int,dia:date):
    db_reservas=db.query(Reserva).filter(Reserva.cancha_id==cancha_id,Reserva.dia==dia).all()
    return db_reservas

def verificar_reserva(db: Session, cancha_id: int, dia: str, hora: str, duracion: int):
    inicio_nueva = hora.hour * 60 + hora.minute
    fin_nueva = inicio_nueva + duracion

    reservas = db.query(Reserva).filter(
        Reserva.cancha_id == cancha_id,
        Reserva.dia == dia,
        or_(
            and_(
                extract('hour', Reserva.hora) * 60 + extract('minute', Reserva.hora) <= fin_nueva,
                extract('hour', Reserva.hora) * 60 + extract('minute', Reserva.hora) + Reserva.duracion > inicio_nueva
            ),
            
            and_(
                inicio_nueva <= extract('hour', Reserva.hora) * 60 + extract('minute', Reserva.hora),
                fin_nueva > extract('hour', Reserva.hora) * 60 + extract('minute', Reserva.hora)
            )
        )
    ).first()

    return reservas