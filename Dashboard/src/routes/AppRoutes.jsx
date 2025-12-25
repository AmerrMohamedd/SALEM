import { Routes, Route } from "react-router-dom";

import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgetPassword from "../pages/auth/ForgetPassword";
import Verification from "../pages/auth/Verification";
import SetNewPassword from "../pages/auth/SetNewPassword";

import HomePage from "../pages/home/HomePage";
import ReportsPage from "../pages/reports/ReportsPage";
import WorkflowPage from "../pages/workflow/WorkflowPage";
import StreetsHistoryPage from "../pages/streetsHistory/StreetsHistoryPage";


function AppRoutes() {
    return (
        <Routes>

            {/* ========== Auth ========== */}
            <Route element={<AuthLayout />}>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="/set-new-password" element={<SetNewPassword />} />
            </Route>

            {/* ========== Dashboard ========== */}
            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<HomePage />} />
                <Route path="/dashboard/reports" element={<ReportsPage />} />
                <Route path="/dashboard/workflow" element={<WorkflowPage />} />
                <Route path="/dashboard/streets-history" element={<StreetsHistoryPage/>} />
            </Route>

        </Routes>
    );
}

export default AppRoutes;
