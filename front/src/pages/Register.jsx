import { useState, useContext, useEffect } from "react";
import { Context } from "../store/AppContext";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context);


    useEffect(() => {
        if (store.access_token !== null) navigate("/")
    }, [store.access_token])


    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="flex-column flex-grow-1 w-75 mx-auto py-5 align-items-center justify-content-center">
                <h1 className="mb-3 text-center">Registro</h1>
                <form className="flex-fill" onSubmit={actions.handleRegister}>
                    <div className="card mt-5 p-0 border border-2 border-black">

                        <div className="card-body">
                            <div className="row m-2">
                                <div className="col-12 col-sm-6">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={store.email} onChange={actions.handleChange} />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <label htmlFor="email" className="form-label">Nombre Completo</label>
                                    <input type="text" className="form-control" id="name" name="name" value={store.name} onChange={actions.handleChange} />
                                </div>
                            </div>
                            
                            <div className="row m-2">
                                <div className="col-12 col-sm-6">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" value={store.password} onChange={actions.handleChange} />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <label htmlFor="repeatPassword" className="form-label">Repeat Password</label>
                                    <input type="password" className="form-control" id="repeatPassword" name="repeatPassword" value={store.repeatPassword} onChange={actions.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer border-top border-2 border-black d-flex justify-content-between">
                        <Link className="p-top nav-link ms-3 "to="/">Volver al Inicio</Link>
                            <div className="ms-auto mx-3">
                           
                                <button type="submit" className="btn btn-outline-info ms-2">Sign Up</button>
                                <button type="button" className="btn btn-outline-dark ms-2 me-1" onClick={actions.cancelForm}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Register