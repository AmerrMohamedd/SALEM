import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    };

    return (
        <div className="flex h-screen bg-[#F6F7FB]">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Area */}
            <div className="flex-1 flex flex-col">

                {/* Header */}
                <Header onLogout={handleLogout} />

                {/* Page Content Wrapper */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-[1400px] mx-auto px-6 py-6">
                        <Outlet />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
