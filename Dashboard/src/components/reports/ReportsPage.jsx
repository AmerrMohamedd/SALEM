import { useState } from "react";
import ReportsFilters from "./ReportsFilters";
import ReportsTableHeader from "./ReportsTableHeader";
import ReportsTableRows from "./ReportsTableRows";
import EmptyState from "./EmptyState";
import ReportDetailsPage from "./ReportDetailsPage";

function ReportsPage() {
    /* ===== Details Modal State ===== */
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    /* ========= Mock Data ========= */
    const [reports] = useState([
        {
            id: 1025,
            category: "حفرة طريق",
            location: "مدينة نصر",
            date: "2025-10-30",
            status: "قيد التنفيذ",
            entity: "هيئة الطرق",
            priority: "عالية",
        },
        {
            id: 1026,
            category: "كسر ماسورة",
            location: "المعادي",
            date: "2025-10-29",
            status: "تم الحل",
            entity: "شركة المياه",
            priority: "متوسطة",
        },
        {
            id: 1001,
            category: "حفرة طريق",
            location: "العباسية",
            date: "2025-10-01",
            status: "قيد التنفيذ",
            entity: "هيئة الطرق",
            priority: "عالية",
        },
        {
            id: 1002,
            category: "عمود إنارة",
            location: "مصر الجديدة",
            date: "2025-10-02",
            status: "مرفوض",
            entity: "الكهرباء",
            priority: "منخفضة",
        },
        {
            id: 1003,
            category: "كسر ماسورة",
            location: "الدقي",
            date: "2025-10-03",
            status: "تم الحل",
            entity: "شركة المياه",
            priority: "متوسطة",
        },
        {
            id: 1004,
            category: "حفرة طريق",
            location: "شبرا",
            date: "2025-10-04",
            status: "قيد التنفيذ",
            entity: "هيئة الطرق",
            priority: "عالية",
        },
        {
            id: 1005,
            category: "حفرة طريق",
            location: "العباسية",
            date: "2025-10-01",
            status: "قيد التنفيذ",
            entity: "هيئة الطرق",
            priority: "عالية",
        },
        {
            id: 1006,
            category: "عمود إنارة",
            location: "مصر الجديدة",
            date: "2025-10-02",
            status: "مرفوض",
            entity: "الكهرباء",
            priority: "منخفضة",
        },
        {
            id: 1007,
            category: "حفرة طريق",
            location: "شبرا",
            date: "2025-10-04",
            status: "قيد التنفيذ",
            entity: "هيئة الطرق",
            priority: "عالية",
        },
        {
            id: 1008,
            category: "كسر ماسورة",
            location: "الدقي",
            date: "2025-10-03",
            status: "تم الحل",
            entity: "شركة المياه",
            priority: "متوسطة",
        },
        {
            id: 1009,
            category: "كسر ماسورة",
            location: "الدقي",
            date: "2025-10-03",
            status: "تم الحل",
            entity: "شركة المياه",
            priority: "متوسطة",
        },
        {
            id: 1010,
            category: "كسر ماسورة",
            location: "الدقي",
            date: "2025-10-03",
            status: "تم الحل",
            entity: "شركة المياه",
            priority: "متوسطة",
        },
    ]);

    /* ========= Pagination ========= */
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const visibleReports = reports.slice(startIndex, endIndex);

    const totalPages = Math.ceil(reports.length / rowsPerPage);
    const hasData = reports.length > 0;

    return (
        <>
            {/* ===== Page Content ===== */}
            <div className={`px-6 py-4 ${openDetails ? "blur-sm" : ""}`}>
                <ReportsFilters />

                <div className="mt-4">
                    <ReportsTableHeader />

                    {hasData ? (
                        <>
                            <ReportsTableRows
                                reports={visibleReports}
                                onView={(report) => {
                                    setSelectedReport(report);
                                    setOpenDetails(true);
                                }}
                            />

                            {/* Pagination */}
                            <div className="flex justify-between items-center mt-4 text-sm">
                                <span className="text-gray-500">
                                    صفحة {page} من {totalPages}
                                </span>

                                <div className="flex gap-2">
                                    <button disabled={page === 1}
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    className="px-3 py-1 rounded-lg border disabled:opacity-40">
                                        السابق
                                    </button>

                                    <button disabled={page === totalPages}
                                    onClick={() =>
                                        setPage((prev) => Math.min(prev + 1, totalPages))
                                    }
                                    className="px-3 py-1 rounded-lg border disabled:opacity-40">
                                        التالي
                                    </button>
                                </div>
                            </div>
                        </>
                        ) : (
                        <EmptyState />
                    )}
                </div>
            </div>

            {/* ===== Details Modal ===== */}
            {openDetails && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    {/* Blur */}
                    <div className="absolute inset-0 backdrop-blur-sm"></div>

                    {/* Card */}
                    <div
                        className=" relative  bg-white  w-[85%]  max-w-6xl  h-[85vh]  rounded-2xl  p-6  flex  flex-col">
                        {/* Close */}
                        <button onClick={() => setOpenDetails(false)}
                        className="absolute top-4 left-4 text-green-700 text-xl font-bold">
                            ✕
                        </button>

                        {/* Content بدون Scroll */}
                        <div className="flex-1 overflow-hidden">
                            <ReportDetailsPage report={selectedReport} />
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}

export default ReportsPage;
