from pydantic import BaseModel
from typing import Optional


class CanchaBase(BaseModel):
    nombre: str
    techada: bool

class CanchaCreate(CanchaBase):
    pass

class CanchaUpdate(CanchaCreate):
    nombre: Optional[str] = None
    techada:Optional[bool] = None 

class Cancha(CanchaBase):
    id: int
    class Config:
        from_attributes = True
