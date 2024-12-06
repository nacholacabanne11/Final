import datetime
from operator import and_
from sqlalchemy import extract, or_
from sqlalchemy.orm import Session
from ..models.Reserva import Reserva
from ..schemas.Reserva import ReservaCreate
from fastapi import HTTPException
from datetime import date


def obtener_reserva(db: Session):
    return db.query(Reserva).all()

def obtener_reserva_id(db: Session, id: int):
    return db.query(Reserva).filter(Reserva.id == id).first()

def crear_reserva(db: Session, reserva: ReservaCreate):
    try:
        if verificar_reserva(db, reserva.cancha_id, reserva.dia, reserva.hora, reserva.duracion) is not None:
            raise HTTPException(status_code=400, detail="La reserva ya existe para la cancha, día y hora especificados")
        
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
  try:
    db_reserva= db.query(Reserva).filter(Reserva.id == id).first()
    if verificar_reserva(db, reserva.cancha_id, reserva.dia, reserva.hora, reserva.duracion, id_reserva=id) is not None:
        raise HTTPException(status_code=400, detail="La reserva ya existe para la cancha, día y hora especificados")
    
    if db_reserva:
        for key, value in reserva.model_dump(exclude_unset=True).items():
            setattr(db_reserva, key, value)
            db.commit()
            db.refresh(db_reserva)
        return db_reserva
  except HTTPException as http_exc:
        raise http_exc
  except Exception as e:
        print(f"Error al crear reserva: {e}")
        db.rollback()
        raise e


    
def eliminar_reserva(db:Session, id:int):
    db_reserva= db.query(Reserva).filter(Reserva.id == id).first()
    if db_reserva: 
        db.delete(db_reserva)
        db.commit()
        return db_reserva
    
    
def verificar_reserva(db: Session, cancha_id: int, dia: str, hora: str, duracion: int,id_reserva:int=None):
    inicio_nueva = hora.hour * 60 + hora.minute
    fin_nueva = inicio_nueva + duracion

    reservas = db.query(Reserva).filter(
        Reserva.id != id_reserva,
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

def filtrar_reserva(db:Session, cancha_id:int,dia:date):
    db_reservas=db.query(Reserva).filter(Reserva.cancha_id==cancha_id,Reserva.dia==dia).all()
    return db_reservas