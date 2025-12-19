import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import Home from "../components/dashboard/Home";

function Dashboard() {
    const navigate = useNavigate();
    // حماية الصفحة
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen bg-[#F6F7FB]">

            {/* Sidebar */}
            <Sidebar />

            {/* Content */}
            <div className="flex-1 flex flex-col">
                <Header onLogout={handleLogout} />

                <main className="p-6">
                    <Home />
                </main>
            </div>

        </div>
    );
}

export default Dashboard;
