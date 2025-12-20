import { useEffect, useState } from "react";
import { getDashboardStats } from "../../../services/dashboardService";

import solvedIcon from "../../../assets/icons/solved.png";
import transferredIcon from "../../../assets/icons/transferred.png";
import reviewIcon from "../../../assets/icons/review.png";
import openIcon from "../../../assets/icons/open.png";
import totalIcon from "../../../assets/icons/total.png";

function DashboardCards() {
    const [stats, setStats] = useState(null);

    // 🔹 هنا بنجيب الداتا (دلوقتي mock – بعدين API)
    useEffect(() => {
        async function fetchStats() {
            const data = await getDashboardStats();
            setStats(data);
        }

        fetchStats();
    }, []);

    // لو الداتا لسه مجتش
    if (!stats) return null;

    const cards = [
        {
            title: "البلاغات التي تم حلها اليوم",
            value: stats.solvedToday,
            icon: solvedIcon,
        },
        {
            title: "البلاغات المحولة",
            value: stats.transferred,
            icon: transferredIcon,
        },
        {
            title: "البلاغات قيد المراجعة",
            value: stats.inReview,
            icon: reviewIcon,
        },
        {
            title: "البلاغات المفتوحة",
            value: stats.open,
            icon: openIcon,
        },
        {
            title: "إجمالي البلاغات",
            value: stats.total,
            icon: totalIcon,
        },
    ];

    return (
        <div dir="rtl" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {cards.map((card, index) => (
                <div key={index} className=" bg-white rounded-lg px-3 py-2
                    flex items-center justify-between
                    shadow-[0_2px_4px_rgba(0,0,0,0.12)]">
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
