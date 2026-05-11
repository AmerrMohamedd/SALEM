import { useState } from "react";

import StatisticsFilters from "./StatisticsFilters";
import StatisticsCards from "./StatisticsCards";
import StatisticsChart from "./StatisticsChart";

function StatisticsPage() {
  const [filters, setFilters] = useState({
    startDate: "2026-05-01",
    endDate: "2026-05-31",
  });

  return (
    <div className="space-y-5 pb-6">
      <StatisticsFilters onChange={setFilters} />

      <StatisticsCards filters={filters} />

      <StatisticsChart filters={filters} />
    </div>
  );
}

export default StatisticsPage;