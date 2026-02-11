import { useState } from "react";

function StatisticsFilters({ onChange }) {
    const [period, setPeriod] = useState("month");

    function handleChange(value) {
        setPeriod(value);
        onChange?.({ period: value });
    }

    return (
        <div
            dir="ltr"
            className="flex items-center gap-3 mb-3 -mt-3"
        >
            {/* هذا الشهر */}
            <button onClick={() => handleChange("month")}
                className={` h-7 px-4 text-sm rounded-full border shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                transition ${period === "month"  ? "bg-[#00816F] text-white border-[#00816F]"
                : "bg-white text-gray-600 border-gray-200"}`} >
                هذا الشهر
            </button>

            {/* اخر 7 ايام */}
            <button  onClick={() => handleChange("last7days")}
                className={`h-7 px-4 text-sm rounded-full border  shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                transition  ${period === "last7days"? "bg-[#00816F] text-white border-[#00816F]"
                : "bg-white text-gray-600 border-gray-200" }`}>
                آخر 7 أيام
            </button>
        </div> 
    );
}

export default StatisticsFilters;
