import DashboardFilters from "../../components/dashboard/home/DashboardFilters";
import DashboardCards from "../../components/dashboard/home/DashboardCards";
import ChartsSection from "../../components/dashboard/home/ChartsSection";
import RecentReportsTable from "../../components/dashboard/home/RecentReportsTable";
import QuickNotifications from "../../components/dashboard/home/QuickNotifications";

function Home() {
    return (
        <div className="flex flex-col gap-4 pb-8">

            {/* Filters */}
            <DashboardFilters />

            {/* Cards */}
            <DashboardCards />

            {/* Charts */}
            <ChartsSection />

            {/* Table */}
            <RecentReportsTable />

            {/* Quick Notifications */}
            <QuickNotifications />

        </div>
    );
}

export default Home;
