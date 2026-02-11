import { useState } from "react";
import StatisticsFilters from "./StatisticsFilters";
import StatisticsCards from "./StatisticsCards";
import StatisticsChart from "./StatisticsChart";

function StatisticsPage() {
    const [filters, setFilters] = useState({
        period: "month",
    });

    return (
        <div>
            <StatisticsFilters onChange={setFilters} />

            <StatisticsCards filters={filters} />

            <StatisticsChart filters={filters} />
        </div>
    );
}

export default StatisticsPage;
