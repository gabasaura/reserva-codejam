import { useContext } from "react";
import { Context } from '../store/AppContext';

import { Link } from "react-router-dom"

const Home = () => {

    const { store, actions } = useContext(Context);


    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="flex-column flex-grow-1 w-75 mx-auto py-5 align-items-center">
                <h1 className="text-center">Hello</h1>
                <h3 className="mb-3 text-center">Por favor, regístrate.</h3>
                <h3 className="mb-3 text-center">┐(￣∀￣)┌</h3>
                <div className="mt-5  p-0 border border-2 border-black justify-content-center">
                    <div className="text-center">
                        <Link to="/register">
                            <button className="btn btn-primary px-5 m-3">Regístrate</button>
                        </Link>
                    </div>
                </div>
                {store.access_token ? (
                <div className="mt-5  p-0 border border-2 border-black text-center">
                    <div className="mt-1 mb-5">
                        <h2 className="text-info">Estimadx. {store?.current_user?.email}</h2>
                        <p>Ya estas logueadx con exitosamente.</p>
                        <p>Se que acabas de llegar, pero. Adios.</p>
                        <Link className="nav-link " onClick={actions.logout}>Log Out</Link>
                    </div>
                </div>
                ) : (
                    <div className="mt-5  p-0 border border-2 border-black justify-content-center">
                    <div className="text-center">
                        <Link to="/login">
                            <button className="btn btn-primary px-5 m-3">Identifícate</button>
                        </Link>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default Home