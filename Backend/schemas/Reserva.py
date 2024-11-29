from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from datetime import date, time
class ReservaBase(BaseModel):
    dia: date
    hora: time
    duracion: int
    telefono: str
    nombre_contacto: str
    cancha_id: int
class ReservaCreate(ReservaBase):
    pass

class ReservaUpdate(BaseModel):
    dia: Optional[date] = None
    hora: Optional[time] = None
    duracion:Optional[int] = None
    telefono: Optional[str] = None
    nombre_contacto: Optional[str] = None
    cancha_id: Optional[int] = None

class Reserva(ReservaBase):
    id: int

    class Config:
        from_attributes = True