import { useTranslation } from "react-i18next";
import clockIcon from "../../assets/icons/clock.png";
import mostFreqIcon from "../../assets/icons/most-freq.png";
import totalRepIcon from "../../assets/icons/total-rep.png";

function StreetsHistoryStats() {
    const { t } = useTranslation();

    const stats = [
        {
            title: t("avgStatusTime"),
            value: t("mock_avgTimeValue"),
            icon: clockIcon,
        },
        {
            title: t("mostFrequentProblem"),
            value: "2,004",
            description: t("mock_mostFrequentDesc"),
            icon: mostFreqIcon,
        },
        {
            title: t("totalReportsCount"),
            value: "2,004",
            icon: totalRepIcon,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {stats.map((item, index) => (
                <div
                    key={index}
                    className="bg-gradient-to-t from-[#00816F] to-[#2DDBC9]
                    rounded-xl px-6 py-4 text-white flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            {item.title}
                        </span>
                        <img
                            src={item.icon}
                            alt={item.title}
                            className="w-7 h-7 opacity-90"
                        />
                    </div>

                    <div className="h-px bg-white/40" />

                    <div className="flex flex-col items-center text-center gap-4">
                        <span className="text-lg font-extrabold">
                            {item.value}
                        </span>
                        {item.description && (
                            <span className="text-[11px] opacity-80">
                                {item.description}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StreetsHistoryStats;
