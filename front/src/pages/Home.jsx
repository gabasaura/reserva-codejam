import { useContext } from "react";
import { Context } from '../store/AppContext';
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar";

const Home = () => {

    const { store, actions } = useContext(Context);


    return (
        <>
        <Navbar/>
        <div className="d-flex flex-column min-vh-100 align-items-center">
            <div className="flex-grow-1 w-75 mx-auto py-5 ">
                <h1 className="text-center">Calendario Reservas</h1>
                <h3 className="mb-3 text-center">Por favor, regístrate.</h3>
                <div className="mt-5  p-0 border border-2 border-black justify-content-center">
                    <div className="text-center">
                        <Link to="/register">
                            <button className="btn btn-primary px-5 m-3">Registro</button>
                        </Link>
                    </div>
                </div>
                {store.access_token ? (
                    <div className="mt-5  p-0 border border-2 border-black text-center">
                    <div className="mt-1 mb-5">
                        <h2 className="text-info">Hola {store?.current_user?.email}</h2>
                        <p>Te has logueado con exitosamente.</p>
                        <p>Genera una reserva</p>
                        <Link className="nav-link " onClick={actions.logout}>Log Out</Link>
                    </div>
                </div>
                ) : (
                    <div className="mt-5  p-0 border border-2 border-black justify-content-center">
                    <div className="text-center">
                        <Link to="/login">
                            <button className="btn btn-primary px-5 m-3">Ingresar</button>
                        </Link>
                    </div>
                </div>
                )}
            </div>
        </div>
                </>
    )
}

export default Home