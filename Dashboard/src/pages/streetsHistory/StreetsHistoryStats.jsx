import clockIcon from "../../assets/icons/clock.png";
import mostFreqIcon from "../../assets/icons/most-freq.png";
import totalRepIcon from "../../assets/icons/total-rep.png";

function StreetsHistoryStats() {
    const stats = [
        {
            title: "متوسط زمن الحالة",
            value: "4 ساعات و50دقيقة",
            icon: clockIcon,
        },
        {
            title: "المشكلة الأكثر تكرارا",
            value: "2,004",
            description: "80% من الاجمالي (2,004): مشاكل تسريب مياه",
            icon: mostFreqIcon,
        },
        {
            title: "إجمالي البلاغات",
            value: "2,004",
            icon: totalRepIcon,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {stats.map((item, index) => (
                <div key={index}
                className=" bg-gradient-to-t from-[#00816F] to-[#2DDBC9]
                rounded-xl px-6 py-4 text-white flex flex-col gap-2">
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            {item.title}
                        </span>
                        <img src={item.icon} alt={item.title}
                        className="w-7 h-7 opacity-90"/>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/40" />

                    {/* Info */}
                    <div className="flex flex-col items-center text-center gap-4">
                        <span className="text-lg font-extrabold leading-tight">
                            {item.value}
                        </span>
                        <span className="text-[11px] opacity-80 leading-tight">
                            {item.description}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StreetsHistoryStats;
