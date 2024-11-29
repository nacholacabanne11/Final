from fastapi import FastAPI 
from .database import engine, Base
from .router import Cancha_router,Reserva_router 


app = FastAPI()

def startup():
    Base.metadata.create_all(bind=engine)

app.add_event_handler("startup", startup)

app.include_router(Cancha_router.router, prefix="/cancha",tags=["cancha"])
app.include_router(Reserva_router.router, prefix="/reserva",tags=["reserva"])
