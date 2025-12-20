import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgetPassword from "../pages/auth/ForgetPassword";
import Verification from "../pages/auth/Verification";
import SetNewPassword from "../pages/auth/SetNewPassword";
import Dashboard from "../pages/Dashboard"
import Home from "../pages/dashboard/Home";
import ReportsPage from "../components/reports/ReportsPage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Auth */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="/set-new-password" element={<SetNewPassword />} />

                {/* Dashboard Layout */}
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<Home />} />
                    <Route path="reports" element={<ReportsPage />} />
                </Route>

            </Routes>
        </BrowserRouter>

    );
}

export default AppRoutes;
