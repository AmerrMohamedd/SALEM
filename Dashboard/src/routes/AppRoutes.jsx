import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgetPassword from "../pages/auth/ForgetPassword";
import Verification from "../pages/auth/Verification";
import SetNewPassword from "../pages/auth/SetNewPassword";
import Dashboard from "../pages/Dashboard";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="/set-new-password" element={<SetNewPassword />} />

                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
