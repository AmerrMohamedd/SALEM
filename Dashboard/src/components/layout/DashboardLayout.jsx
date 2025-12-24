import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

function DashboardLayout() {
    return (
        <div className="flex min-h-screen bg-[#F6F7FB]">
            {/* Sidebar ثابت */}
            <Sidebar />

            {/* المحتوى */}
            <div className="flex-1 flex flex-col">
                <Header />

                <main className="flex-1 p-6 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;
