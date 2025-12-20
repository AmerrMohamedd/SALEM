import DashboardFilters from "../../components/dashboard/DashboardFilters";
import DashboardCards from "../../components/dashboard/DashboardCards";
import ChartsSection from "../../components/dashboard/ChartsSection";
import RecentReportsTable from "../../components/dashboard/RecentReportsTable";
import QuickNotifications from "../../components/dashboard/QuickNotifications";

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
