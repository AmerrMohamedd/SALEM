import { useTranslation } from "react-i18next";

function RecentReportsTable() {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    const reports = [
        { id: 1025, date: "2025-10-30", status: "inProgress", entity: "electricity" },
        { id: 1027, date: "2025-10-30", status: "underReview", entity: "water" },
        { id: 1028, date: "2025-10-30", status: "solved", entity: "roads" },
    ];

    const statusStyles = {
        inProgress: "bg-purple-100 text-purple-700",
        underReview: "bg-orange-100 text-orange-700",
        solved: "bg-green-100 text-green-700",
    };

    return (
        <div
            dir={isArabic ? "rtl" : "ltr"}
            className="bg-white rounded-xl shadow-sm overflow-hidden text-center">
            <table className="w-full text-sm">

                {/* ===== Header ===== */}
                <thead className="bg-gradient-to-r from-[#00816F] to-[#2DDBC9] text-white">
                    <tr>
                        <th className="px-4 py-2 font-bold">
                            {t("reportId")}
                        </th>
                        <th className="px-4 py-2">
                            {t("date")}
                        </th>
                        <th className="px-4 py-2">
                            {t("status")}
                        </th>
                        <th className="px-4 py-2">
                            {t("entity")}
                        </th>
                    </tr>
                </thead>

                {/* ===== Body ===== */}
                <tbody>
                    {reports.map((r) => (
                        <tr key={r.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                            <td className="px-4 py-2 font-bold text-black">
                                {r.id}
                            </td>

                            <td className="px-4 py-2">
                                {r.date}
                            </td>

                            <td className="px-4 py-2">
                                <span
                                    className={`px-2  rounded-full text-xs font-semibold ${statusStyles[r.status]}`}>
                                    {t(r.status)}
                                </span>
                            </td>

                            <td className="px-4 py-2">
                                {t(r.entity)}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

export default RecentReportsTable;
