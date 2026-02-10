import eyeIcon from "../../assets/icons/eyes.png";

function ReportsTableRows({ reports = [], onView }) {
    return (
        <div className="bg-white rounded-xl shadow mt-2 divide-y overflow-x-auto">
            {reports.map((report, index) => (
                <div
                    key={`${report.id}-${index}`}
                    className="
                    grid grid-cols-8
                    items-center text-center
                    px-2 sm:px-4 py-2 sm:py-3
                    text-[10px] sm:text-xs md:text-sm
                    gap-1 sm:gap-2
                "
                >
                    {/* ID */}
                    <div className="font-bold text-primary truncate">
                        {report.id}
                    </div>

                    <div className="truncate">{report.category}</div>
                    <div className="truncate">{report.location}</div>
                    <div className="truncate">{report.date}</div>

                    {/* Status */}
                    <div
                        className={`font-semibold truncate ${report.status === "تم الحل"
                                ? "text-green-600"
                                : report.status === "قيد التنفيذ"
                                    ? "text-orange-500"
                                    : "text-red-500"
                            }`}
                    >
                        {report.status}
                    </div>

                    <div className="truncate">{report.entity}</div>

                    {/* Priority */}
                    <div
                        className={`font-semibold truncate ${report.priority === "عالية"
                                ? "text-red-600"
                                : report.priority === "متوسطة"
                                    ? "text-yellow-500"
                                    : "text-green-600"
                            }`}
                    >
                        {report.priority}
                    </div>

                    {/* 👁️ View */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => onView(report)}
                            className="hover:scale-110 transition"
                        >
                            <img
                                src={eyeIcon}
                                alt="view"
                                className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ReportsTableRows;
