import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { router } from '../router/router'; 
import Navbar from './Components/conteiners/navbar';


function App() {

 

    return(
    <>
    
    <RouterProvider router={router}/>
    </>
    )
  
  
}

export default App
