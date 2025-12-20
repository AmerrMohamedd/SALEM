import eyeIcon from "../../assets/icons/eyes.png";

function ReportsTableRows({ reports, onView }) {
    return (
        <div className="bg-white rounded-xl shadow mt-2 divide-y">
            {reports.map((report, index) => (
                <div key={`${report.id}-${index}`}
                    className="grid grid-cols-8 text-center text-sm py-4 px-4 items-center">
                    <div>{report.id}</div>
                    <div>{report.category}</div>
                    <div>{report.location}</div>
                    <div>{report.date}</div>

                    {/* الحالة */}
                    <div
                        className={`font-semibold ${report.status === "تم الحل"
                                ? "text-green-600"
                                : report.status === "قيد التنفيذ"
                                ? "text-orange-500"
                                : "text-red-500"}`}>
                        {report.status}
                    </div>

                    <div>{report.entity}</div>

                    {/* الأولوية */}
                    <div
                        className={`font-semibold ${report.priority === "عالية"
                                ? "text-red-600"
                                : report.priority === "متوسطة"
                                ? "text-yellow-500"
                                : "text-green-600"}`}>
                        {report.priority}
                    </div>

                    {/* 👁️ */}
                    <div className="flex justify-center">
                        <button onClick={() => onView(report)}
                            className="hover:scale-110 transition">
                            <img src={eyeIcon} alt="view" className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ReportsTableRows;
