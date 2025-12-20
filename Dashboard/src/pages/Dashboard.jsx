import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import { Outlet, useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    // ✅ الدالة لازم تكون هنا
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login", { replace: true });
    };

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <Sidebar />

            {/* Main */}
            <div className="flex-1 flex flex-col">

                {/* Header */}
                <Header onLogout={handleLogout} />

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}

export default Dashboard;
