import { useState, useEffect } from "react";
import ReportsFilters from "./ReportsFilters";
import ReportsTableHeader from "./ReportsTableHeader";
import ReportsTableRows from "./ReportsTableRows";
import EmptyState from "./EmptyState";
import ReportDetailsPage from "./ReportDetailsPage";
import ReportMapPage from "./ReportMapPage";

function ReportsPage() {
    /* ===== Filters State ===== */
    const [searchId, setSearchId] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEntity, setSelectedEntity] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    /* ===== Pagination ===== */
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const totalPages = 50;

    /* ===== Details Modal ===== */
    const [openDetails, setOpenDetails] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    /* ========= Mock Data ========= */
    const reports = [
        {
            id: 999,
            category: "حفرة طريق",
            location: "مدينة نصر",
            date: "2025-10-30",
            status: "قيد التنفيذ",
            entity: "هيئة الطرق",
            priority: "عالية",
        },
        {
            id: 1000,
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
            category: "حفرة طريق",
            location: "شبرا",
            date: "2025-10-04",
            status: "قيد التنفيذ",
            entity: "هيئة الطرق",
            priority: "عالية",
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
        {
            id: 1011,
            category: "حفرة طريق",
            location: "شبرا",
            date: "2025-10-04",
            status: "قيد التنفيذ",
            entity: "هيئة الطرق",
            priority: "عالية",
        },
        {
            id: 1012,
            category: "كسر ماسورة",
            location: "الدقي",
            date: "2025-10-03",
            status: "تم الحل",
            entity: "شركة المياه",
            priority: "متوسطة",
        },
    ];

    /* ========= FILTER LOGIC ========= */
    const filteredReports = reports.filter((report) => {
        const entityMatch =
            selectedEntity === "" || report.entity === selectedEntity;

        const statusMatch =
            selectedStatus === "" || report.status === selectedStatus;

        const dateMatch =
            !selectedDate ||
            report.date ===
            `${selectedDate.getFullYear()}-${String(
                selectedDate.getMonth() + 1
            ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

        const searchMatch =
            searchId === "" ||
            report.id.toString().includes(searchId.trim());

        return entityMatch && statusMatch && dateMatch && searchMatch;
    });

    /*   رجوع الصفحة للأولى مع أي فلتر */
    useEffect(() => {
        setPage(1);
    }, [searchId, selectedDate, selectedEntity, selectedStatus]);

    /* ========= Pagination ========= */
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const visibleReports = filteredReports.slice(startIndex, endIndex);
    const hasData = filteredReports.length > 0;

    return (
        <>
            <div className={`px-6 py-4 ${openDetails ? "blur-sm" : ""}`}>
                <ReportsFilters
                    onSearchChange={setSearchId}
                    onDateChange={setSelectedDate}
                    onEntityChange={setSelectedEntity}
                    onStatusChange={setSelectedStatus}
                />

                <div className="mt-4">
                    <ReportsTableHeader />

                    {hasData ? (
                        <>
                            <ReportsTableRows
                                reports={visibleReports}
                                onView={(report) => {
                                    setSelectedReport(report);
                                    setOpenDetails(true);
                                    setShowMap(false);
                                }}
                            />

                            <div className="flex justify-between items-center mt-4 text-sm">
                                <span className="text-gray-500">
                                    صفحة {page} من {totalPages}
                                </span>

                                <div className="flex gap-2">
                                    <button
                                        disabled={page === 1}
                                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                        className="px-3 py-1 rounded-lg border disabled:opacity-40">
                                        السابق
                                    </button>

                                    <button
                                        disabled={page === totalPages}
                                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
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

            {openDetails && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="absolute inset-0 backdrop-blur-sm"></div>

                    <div className="relative bg-white w-[90%] max-w-6xl h-[85vh] rounded-2xl p-6">
                        <button
                            onClick={() => {
                                setOpenDetails(false);
                                setShowMap(false);
                            }}
                            className="absolute top-4 left-4 text-green-800 text-xl font-bold">
                            ✕
                        </button>

                        {!showMap ? (
                            <ReportDetailsPage
                                report={selectedReport}
                                onOpenMap={() => setShowMap(true)}
                            />
                        ) : (
                            <ReportMapPage
                                location={selectedReport?.location}
                                onBack={() => setShowMap(false)}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default ReportsPage;
