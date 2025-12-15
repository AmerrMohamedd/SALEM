import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen flex bg-gray-50">

            {/* Sidebar */}
            <Sidebar />

            {/* Main */}
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-6">
                    {children}
                </main>
            </div>

        </div>
    );
}

export default DashboardLayout;
