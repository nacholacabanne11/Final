import NavBar from "./components/NavBar/Nav.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Reservas from "./components/Reservas/Reservas";
import Canchas from "./components/Canchas/Canchas";
import Home from "./utils/Home";
import { Box } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <NavBar />

        <Box flex="1" overflowY="auto">
          <Routes>
            <Route path="/" element={<Navigate to="/Inicio" />} />
            <Route path="/Reservas" element={<Reservas />} />
            <Route path="/Canchas" element={<Canchas />} />
            <Route path="/Inicio" element={<Home />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
