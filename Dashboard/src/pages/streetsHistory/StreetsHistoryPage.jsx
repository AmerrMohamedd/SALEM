import { useState } from "react";

import StreetsHistoryFilters from "./StreetsHistoryFilters";
import StreetsHistoryStats from "./StreetsHistoryStats";
import StreetsHistoryTable from "./StreetsHistoryTable";
import StreetsHistoryTableRows from "./StreetsHistoryTableRows";
import StreetsHistoryDetails from "./StreetsHistoryDetails";
import StreetsHistoryMap from "./StreetsHistoryMap";


function StreetsHistoryPage() {
    const [selectedReport, setSelectedReport] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);

    const [showMap, setShowMap] = useState(false);

    /* ===== Pagination ===== */
    const [page, setPage] = useState(1);

    const firstPageCount = 7;   
    const rowsPerPage = 10;
    const totalPages = 50;     

    // ===== Mock Data =====
    const records = [
        { id: "1000", date: "30-10-2025", category: "حفرة طريق", status: "قيد التنفيذ", repairTime: "3 أيام", process: "البلدية" },
        { id: "1001", date: "29-10-2025", category: "كسر ماسورة مياه", status: "تم الحل", repairTime: "2 أيام", process: "المياه" },
        { id: "1002", date: "28-10-2025", category: "انقطاع إنارة", status: "تم الحل", repairTime: "يوم واحد", process: "الكهرباء" },
        { id: "1003", date: "27-10-2025", category: "تلف رصيف", status: "قيد التنفيذ", repairTime: "—", process: "البلدية" },
        { id: "1004", date: "26-10-2025", category: "تسريب مياه", status: "مرفوض", repairTime: "—", process: "المياه" },
        { id: "1005", date: "25-10-2025", category: "هبوط أرضي", status: "تم الحل", repairTime: "4 أيام", process: "البلدية" },
        { id: "1006", date: "24-10-2025", category: "عطل إشارة مرور", status: "قيد التنفيذ", repairTime: "—", process: "المرور" },
        { id: "1007", date: "23-10-2025", category: "تلف أعمدة إنارة", status: "تم الحل", repairTime: "3 أيام", process: "الكهرباء" },
        { id: "1008", date: "22-10-2025", category: "انسداد صرف صحي", status: "قيد التنفيذ", repairTime: "—", process: "المياه" },
        { id: "1009", date: "21-10-2025", category: "تشققات إسفلت", status: "تم الحل", repairTime: "5 أيام", process: "البلدية" },
        { id: "1010", date: "20-10-2025", category: "تلف مطبات", status: "مرفوض", repairTime: "—", process: "المرور" },
        { id: "1011", date: "19-10-2025", category: "تجمع مياه أمطار", status: "قيد التنفيذ", repairTime: "—", process: "البلدية" },
      
    ];

    /* ===== Pagination Logic ===== */
    let visibleReports = [];

    if (page === 1) {
        //  1000 → 1006
        visibleReports = records.slice(0, firstPageCount);
    } else {
        const startIndex =
            firstPageCount + (page - 2) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;

        visibleReports = records.slice(startIndex, endIndex);
    }

    return (
        <>
            <StreetsHistoryFilters />
            <StreetsHistoryStats />

            <div className="mt-4">
                <StreetsHistoryTable />

                <StreetsHistoryTableRows
                    records={visibleReports}
                    onView={(report) => {
                        setSelectedReport(report);
                        setOpenDetails(true); // ✅ دي كانت ناقصة
                    }}
                />


                {/* ===== Pagination (دايمًا باينة) ===== */}
                <div className="flex justify-between items-center mt-4 text-sm">
                    <span className="text-gray-500">
                        صفحة {page} من {totalPages}
                    </span>

                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => {
                                setPage((p) => Math.max(p - 1, 1));
                                setSelectedReport(null);
                            }}
                            className="px-3 py-1 rounded-lg border disabled:opacity-40">
                            السابق
                        </button>

                        <button
                            disabled={page === totalPages}
                            onClick={() => {
                                setPage((p) => Math.min(p + 1, totalPages));
                                setSelectedReport(null);
                                setOpenDetails(false);
                            }}

                            className="px-3 py-1 rounded-lg border disabled:opacity-40">
                            التالي
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== Details Card ===== */}
            {openDetails && selectedReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="absolute inset-0 backdrop-blur-sm"></div>

                    <div className="relative bg-white w-[90%] max-w-6xl h-[85vh] rounded-2xl p-6">
                        {/* Close */}
                        <button
                            onClick={() => {
                                setOpenDetails(false);
                                setShowMap(false);
                            }}
                            className="absolute top-4 left-4 text-green-800 text-xl font-bold">
                            ✕
                        </button>

                        {!showMap ? (
                            <StreetsHistoryDetails
                                report={selectedReport}
                                onOpenMap={() => setShowMap(true)}   // 👈 هنا السر
                            />
                            ) : (
                            <StreetsHistoryMap
                                location={selectedReport?.location || "Cairo"}
                                onBack={() => setShowMap(false)}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default StreetsHistoryPage;
