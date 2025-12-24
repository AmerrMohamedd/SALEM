import DashboardFilters from "./DashboardFilters";
import DashboardCards from "./DashboardCards";
import ChartsSection from "./ChartsSection";
import RecentReportsTable from "./RecentReportsTable";
import QuickNotifications from "./QuickNotifications";

function HomePage() {
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

export default HomePage;
