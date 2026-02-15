import { useTranslation } from "react-i18next";

function HomeRecentReportsTable({ reports = [] }) {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    

    const statusStyles = {
        inProgress: "bg-purple-100 text-purple-700",
        underReview: "bg-orange-100 text-orange-700",
        solved: "bg-green-100 text-green-700",
    };

    return (
        <div
            dir={isArabic ? "rtl" : "ltr"}
            className="bg-white rounded-xl shadow-sm overflow-x-auto text-center">
            <table className="w-full text-xs sm:text-sm min-w-[400px]">

                {/* ===== Header ===== */}
                <thead className="bg-gradient-to-r from-[#00816F] to-[#2DDBC9] text-white">
                    <tr>
                        <th className="px-2 sm:px-4 py-2 font-bold">
                            {t("reportId")}
                        </th>
                        <th className="px-2 sm:px-4 py-2">
                            {t("date")}
                        </th>
                        <th className="px-2 sm:px-4 py-2">
                            {t("status")}
                        </th>
                        <th className="px-2 sm:px-4 py-2">
                            {t("entity")}
                        </th>
                    </tr>
                </thead>

                {/* ===== Body ===== */}
                <tbody>
                    {reports.map((r) => (
                        <tr key={r.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                            <td className="px-2 sm:px-4 py-2 font-bold text-black">
                                {r.id}
                            </td>

                            <td className="px-2 sm:px-4 py-2 whitespace-nowrap">
                                {r.date ? String(r.date).split("T")[0] : ""}
                            </td>

                            <td className="px-2 sm:px-4 py-2">
                                <span
                                    className={`px-2  rounded-full text-xs font-semibold ${statusStyles[r.status]}`}>
                                    {t(r.status)}
                                </span>
                            </td>

                            <td className="px-2 sm:px-4 py-2">
                                {t(r.entity)}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

export default HomeRecentReportsTable;
