import { useState } from "react";
import EmptyState from "./EmptyState";
import StatisticsChart from "./StatisticsChart";
import StatisticsFilters from "./StatisticsFilters";

export default function StatisticsPage() {
    const [statisticsData, setStatisticsData] = useState([]);

    if (statisticsData.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="h-full flex flex-col gap-6">
            <StatisticsFilters />

            <StatisticsChart data={statisticsData} />
        </div>
    );
}
