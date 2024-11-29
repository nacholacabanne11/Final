from sqlalchemy.orm import Session
from ..models.Reserva import Reserva
from ..schemas.Reserva import ReservaCreate


def obtener_reserva(db: Session):
    return db.query(Reserva).all()

def obtener_reserva_id(db: Session, id: int):
    return db.query(Reserva).filter(Reserva.id == id).first()

def crear_reserva(db:Session, reserva:ReservaCreate):
    try:
        db_reserva = Reserva(**reserva.model_dump())
        db.add(db_reserva)
        db.commit()
        db.refresh(db_reserva)

        return db_reserva
    
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
