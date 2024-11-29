from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..crud.Canchas_crud import (obtener_cancha,actualizar_cancha, crear_cancha, eliminar_cancha, obtener_cancha_por_id)
from ..database import get_db

from ..schemas.Canchas import Cancha, CanchaCreate,CanchaUpdate


router = APIRouter()

@router.get("/Ver_canchas", response_model=list[Cancha])
def get_canchas(db: Session = Depends(get_db)):
    return obtener_cancha(db)

@router.get("/Ver_cancha/{id}", response_model=Cancha)
def get_canchaID(id: int, db: Session = Depends(get_db)):
    cancha_db= obtener_cancha_por_id(db, id)
    if cancha_db is None:
        raise HTTPException(status_code=404, detail="No se encontro la cancha con ese id")
    return cancha_db


@router.post("/Crear_cancha", response_model=Cancha)
def create_cancha(cancha:CanchaCreate, db: Session = Depends(get_db)):
    return crear_cancha(db, cancha)

@router.put("/Actualizar_cancha/{id}", response_model=CanchaCreate)
def update_cancha(id: int, cancha:CanchaUpdate, db: Session = Depends(get_db)):
    cancha_db= actualizar_cancha(db, id, cancha)
    if cancha_db is None:
        raise HTTPException(status_code=404, detail="No se encontro la cancha. No se pudo actualizar")
    return cancha_db

@router.delete("/Eliminar_cancha/{id}", response_model=Cancha)
def delete_cancha(id: int, db: Session = Depends(get_db)):
    cancha_db= eliminar_cancha(db, id)
    if cancha_db is None:
        raise HTTPException(status_code=404, detail="No se encontro la cancha.No se pudo eliminar")
    return cancha_db