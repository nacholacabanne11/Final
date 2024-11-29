from sqlalchemy import Column, Integer, String, Boolean
from ..database import Base
from sqlalchemy.orm import relationship

class Cancha(Base):
    __tablename__ = "canchas"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String, unique=True, index=True)
    techada = Column(Boolean, default=False)  

    reservas = relationship("Reserva", back_populates="cancha")