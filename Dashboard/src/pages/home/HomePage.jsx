import { useTranslation } from "react-i18next";
import DashboardFilters from "./DashboardFilters";
import DashboardCards from "./DashboardCards";
import ChartsSection from "./ChartsSection";
import RecentReportsTable from "./RecentReportsTable";
import QuickNotifications from "./QuickNotifications";

function HomePage() {
    const { i18n } = useTranslation(); 

    return (
        <div key={i18n.language} className="flex flex-col gap-4 pb-8">
            <DashboardFilters />
            <DashboardCards />
            <ChartsSection />
            <RecentReportsTable />
            <QuickNotifications />
        </div>
    );
}

export default HomePage;
