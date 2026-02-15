import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getHomeData } from "../../services/homeService";

import HomeFilters from "./HomeFilters";
import HomeCards from "./HomeCards";
import HomeCharts from "./HomeCharts";
import HomeRecentReportsTable from "./HomeRecentReportsTable";
import HomeQuickNotifications from "./HomeQuickNotifications";

function HomePage() {
    const { i18n } = useTranslation();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getHomeData();
                setData(res);
            } catch (err) {
                console.error("Error loading home data:", err);
            }
        };

        fetchData();
    }, []);

    if (!data) return null;

    return (
        <div key={i18n.language} className="flex flex-col gap-3 sm:gap-4 pb-6 sm:pb-8 w-full max-w-full overflow-x-hidden">
            <HomeCards data={data.cards} />
            <HomeCharts lineData={data.lineChart}
                donutData={data.donutChart} />
            <HomeRecentReportsTable reports={data.reports} />
            <HomeQuickNotifications notifications={data.notifications} />
        </div>
    );
}

export default HomePage;
