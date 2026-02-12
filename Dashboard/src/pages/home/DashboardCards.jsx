import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDashboardStats } from "../../services/dashboardService";

import solvedIcon from "../../assets/icons/solved.png";
import transferredIcon from "../../assets/icons/transferred.png";
import reviewIcon from "../../assets/icons/review.png";
import openIcon from "../../assets/icons/open.png";
import totalIcon from "../../assets/icons/total.png";

function DashboardCards() {
    const [stats, setStats] = useState(null);
    const { t, i18n } = useTranslation();

    const isArabic = i18n.language === "ar";

    useEffect(() => {
        async function fetchStats() {
            const data = await getDashboardStats();
            setStats(data);
        }
        fetchStats();
    }, []);

    if (!stats) return null;

    const cards = [
        { title: t("solvedToday"), value: stats.solvedToday, icon: solvedIcon },
        { title: t("transferred"), value: stats.transferred, icon: transferredIcon },
        { title: t("inReview"), value: stats.inReview, icon: reviewIcon },
        { title: t("openReports"), value: stats.open, icon: openIcon },
        { title: t("totalReports"), value: stats.total, icon: totalIcon },
    ];

    return (
        <div
            dir={isArabic ? "rtl" : "ltr"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className={`bg-white rounded-lg px-3 py-2 flex items-center shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                    ${isArabic ? "justify-between text-right" : "justify-between text-left"}`}>
                    {/* Text */}
                    <div>
                        <p className="text-[11px] text-gray-500">
                            {card.title}
                        </p>
                        <p className="text-lg font-extrabold text-[#00816F]">
                            {card.value}
                        </p>
                    </div>

                    {/* Icon */}
                    <img src={card.icon} alt="" className="w-8 h-8" />
                </div>
            ))}
        </div>
    );
}

export default DashboardCards;
