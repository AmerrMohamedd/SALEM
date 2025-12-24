import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgetPassword from "../pages/auth/ForgetPassword";
import Verification from "../pages/auth/Verification";
import SetNewPassword from "../pages/auth/SetNewPassword";

import Dashboard from "../pages/Dashboard";
import Home from "../pages/dashboard/Home";
import ReportsPage from "../components/reports/ReportsPage";
import WorkflowPage from "../components/workflow/WorkflowPage";

function AppRoutes() {
    return (
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
                <Route path="workflow" element={<WorkflowPage />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
