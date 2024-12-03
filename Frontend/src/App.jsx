import NavBar from "./components/NavBar/Nav.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reservas from "./components/Reservas/Reservas";
import Canchas from "./components/Canchas/Canchas";
import Home from "./utils/Home";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/Reservas" element={<Reservas />} />
          <Route path="/Canchas" element={<Canchas />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
