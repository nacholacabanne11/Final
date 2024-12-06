from datetime import date
from fastapi import APIRouter, Depends, HTTPException,status
from sqlalchemy.orm import Session
from ..crud.Reserva_crud import (obtener_reserva,actualizar_reserva, crear_reserva, eliminar_reserva, obtener_reserva_id,filtrar_reserva)
from ..database import get_db
from ..schemas.Reserva import ReservaCreate,Reserva, ReservaUpdate

router = APIRouter()

@router.get("/Ver_reservas", response_model=list[Reserva])
def get_reservas(db: Session = Depends(get_db)):
    return obtener_reserva(db)

@router.get("/Ver_reserva/{id}", response_model=Reserva)
def get_reservaID(id: int, db: Session = Depends(get_db)):
    reserva_db= obtener_reserva_id(db, id)
    if reserva_db is None:
        raise HTTPException(status_code=404, detail="No se encontro la reserva con ese id")
    return reserva_db


@router.post("/Crear_reserva", response_model=Reserva)
def create_reserva(reserva:ReservaCreate, db: Session = Depends(get_db)):
    return crear_reserva(db, reserva)

@router.put("/Actualizar_reserva/{id}", response_model=Reserva)
def update_reserva(id: int, reserva:ReservaUpdate, db: Session = Depends(get_db)):
    reserva_db= actualizar_reserva(db, id, reserva)
    if reserva_db is None:
        raise HTTPException(status_code=404, detail="No se encontro la reserva. No se pudo actualizar")
    return reserva_db

@router.delete("/Eliminar_reserva/{id}", response_model=Reserva)
def delete_reserva(id: int, db: Session = Depends(get_db)):
    reserva_db= eliminar_reserva(db, id)
    if reserva_db is None:
        raise HTTPException(status_code=404, detail="No se encontro la reserva.No se pudo eliminar")
    return reserva_db

@router.get("/Filtrar_reserva/{cancha_id}/{dia}", response_model=list[Reserva])
def filtrar_reservas(cancha_id:int, dia:date,db: Session = Depends(get_db)): 
    db_filtradas= filtrar_reserva(db, cancha_id, dia)
    return db_filtradas