from fastapi import FastAPI 
from .database import engine, Base
from .router import Cancha_router,Reserva_router 
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

def startup():
    Base.metadata.create_all(bind=engine)

app.add_event_handler("startup", startup)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

app.include_router(Cancha_router.router, prefix="/cancha",tags=["cancha"])
app.include_router(Reserva_router.router, prefix="/reserva",tags=["reserva"])
