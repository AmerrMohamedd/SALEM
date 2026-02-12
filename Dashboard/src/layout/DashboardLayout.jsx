import { Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

function DashboardLayout() {
    const navigate = useNavigate();
    const { i18n } = useTranslation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    };

    return (
        <div
            className={`flex min-h-screen bg-[#F6F7FB] ${i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
                }`}
        >
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header onLogout={handleLogout} />

                <main className="flex-1 p-6 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;
