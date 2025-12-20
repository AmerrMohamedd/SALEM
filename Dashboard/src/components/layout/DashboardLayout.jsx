import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
    return (
        <div className="flex min-h-screen overflow-y-auto bg-gray-100">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;
