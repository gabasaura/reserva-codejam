import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Inicio</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/register">Registrar</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Ingresar</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user">Usuario</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/make">Make a Reservation</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
