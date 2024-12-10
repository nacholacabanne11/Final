import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <button onClick={() => navigate(`/`)} className="btn btn-home">
            Home
          </button>
        </li>
       
      </ul>
    </nav>
  );
};

export default Navbar;
