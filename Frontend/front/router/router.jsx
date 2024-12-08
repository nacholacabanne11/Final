import { createBrowserRouter } from "react-router-dom"
import Home from "../src/Home/Home"
import  Canchas  from '../src/pageCancha/Canchas'
import CreateCancha from '../src/pageCancha/CreateCancha'
import DeletePage from "../src/pageCancha/deletePage"
import EditPage from "../src/pageCancha/editPage"
import CreateReserva from "../src/pageReserva/createReserva"
import EditReserva from "../src/pageReserva/EditReserva"
import DeleteReserva from "../src/pageReserva/deleteReserva"
import VerReserva from "../src/pageReserva/verReserva"


export const router = createBrowserRouter([
    {path:"/",element:<Home/>},
    {path:"/canchas",element:<Canchas/>},
    {path:"/crear_cancha",element:<CreateCancha/>},
    {path:"/eliminar_cancha",element:<DeletePage/>},
    {path:"/editar_cancha",element:<EditPage/>},
    {path:"/crear_reserva",element:<CreateReserva/>},
    {path:"/editar_reserva",element:<EditReserva/>},
    {path:"eliminar_reserva",element:<DeleteReserva/>},
    {path:"ver_reserva",element:<VerReserva/>}

])