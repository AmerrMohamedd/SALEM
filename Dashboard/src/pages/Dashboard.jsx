import { useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import Home from "./dashboard/Home";

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1">
                <Header onLogout={handleLogout} /> {/* 👈 هنا الربط */}
                <div className="p-6">
                    <Home />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
