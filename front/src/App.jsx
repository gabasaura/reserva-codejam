import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import injectContext from "./store/AppContext";
import { ToastContainer } from 'react-toastify';
import Navbar from "./components/Navbar";
import MakeReservation from "./pages/MakeReservation";

const App = () => {

    return (
            <BrowserRouter>
            <Navbar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/make" element={<MakeReservation />} />
                </Routes>
                <ToastContainer />
                
            </BrowserRouter>
    )
}

export default injectContext(App)