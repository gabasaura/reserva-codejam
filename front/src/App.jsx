import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import injectContext from "./store/AppContext";
import { ToastContainer } from 'react-toastify';
import Navbar from "./components/Navbar";
import UserProfile from "./pages/User";

const App = () => {

    return (
            <BrowserRouter>
            <Navbar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/user" element={<UserProfile />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <ToastContainer />
                
            </BrowserRouter>
    )
}

export default injectContext(App)