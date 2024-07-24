import { useContext } from 'react';
import { Context } from '../store/AppContext';
import { useNavigate } from 'react-router';



const UserProfile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    useEffect(() => {
        if (store.access_token !== null) navigate("/")
    }, [store.access_token])



    return (
        <>
            {store.access_token && (
                <div className="d-flex flex-column min-vh-100">
                    <div className="flex-column flex-grow-1 w-75 mx-auto p-5 align-items-center justify-content-center">
                        <h1 className="">User Profile</h1>

                        <div className="my-3">
                        </div>
                        <div className="mt-1 mb-5">
                            <h2 className="text-info">Hello de nuevo. {store?.current_user?.email}</h2>
                            <p>Acabas de loguearte con Exito. Me alegro por mi, ser etereo que programo esto.</p>
                
                        </div>
                        <hr className='border-0 border-top border-black border-1 opacity-100' />
                        <p>Se que acabas de llegar, pero. Adios.</p>
                        <Link to="/" className="nav-link " onClick={actions.logout}>Log Out</Link>
                    </div>
                </div>

            )}
        </>
    )
}

export default UserProfile