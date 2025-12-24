import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

function DashboardLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // مسح بيانات المستخدم
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // الرجوع لصفحة اللوجين
        navigate("/login", { replace: true });
    };

    return (
        <div className="flex min-h-screen bg-[#F6F7FB]">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                {/* Header ثابت + logout */}
                <Header onLogout={handleLogout} />

                <main className="flex-1 p-6 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;
