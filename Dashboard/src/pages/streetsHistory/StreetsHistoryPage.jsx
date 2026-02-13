import { useState } from "react";
import { useTranslation } from "react-i18next";


import StreetsHistoryFilters from "./StreetsHistoryFilters";
import StreetsHistoryStats from "./StreetsHistoryStats";
import StreetsHistoryTable from "./StreetsHistoryTable";
import StreetsHistoryTableRows from "./StreetsHistoryTableRows";
import StreetsHistoryDetails from "./StreetsHistoryDetails";
import StreetsHistoryMap from "./StreetsHistoryMap";

function StreetsHistoryPage() {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";


    const [selectedReport, setSelectedReport] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [showMap, setShowMap] = useState(false);

    const [searchId, setSearchId] = useState("");
    const [filterDate, setFilterDate] = useState(null);
    const [filterCategory, setFilterCategory] = useState("");

    /* ===== Pagination ===== */
    const [page, setPage] = useState(1);
    const firstPageCount = 7;
    const rowsPerPage = 10;
    const totalPages = 50;

    // ===== Mock Data =====
    const records = [
        { id: "1000", date: "30-10-2025", category: "roadHole", status: "inProgress", repairTime: "threeDays", process: "roads" },
        { id: "1001", date: "29-10-2025", category: "pipeBreak", status: "solved", repairTime: "twoDays", process: "water" },
        { id: "1002", date: "28-10-2025", category: "lightingPole", status: "solved", repairTime: "oneDay", process: "electricity" },
        { id: "1003", date: "27-10-2025", category: "roadHole", status: "inProgress", repairTime: "noTime", process: "roads" },
        { id: "1004", date: "26-10-2025", category: "waterLeak", status: "rejected", repairTime: "noTime", process: "water" },
        { id: "1005", date: "25-10-2025", category: "groundSubsidence", status: "solved", repairTime: "fourDays", process: "roads" },
        { id: "1006", date: "24-10-2025", category: "trafficSignalFailure", status: "inProgress", repairTime: "noTime", process: "traffic" },
        { id: "1007", date: "23-10-2025", category: "lightingPoleDamage", status: "solved", repairTime: "threeDays", process: "electricity" },
        { id: "1008", date: "22-10-2025", category: "sewageBlockage", status: "inProgress", repairTime: "noTime", process: "water" },
        { id: "1009", date: "21-10-2025", category: "asphaltCracks", status: "solved", repairTime: "fiveDays", process: "roads" },
        { id: "1010", date: "20-10-2025", category: "speedBumpDamage", status: "rejected", repairTime: "noTime", process: "traffic" },
        { id: "1011", date: "19-10-2025", category: "rainWaterAccumulation", status: "inProgress", repairTime: "noTime", process: "roads" },
    ];


    /* ===== Filters ===== */
    const filteredRecords = records.filter((item) => {
        const matchId =
            !searchId || item.id.includes(searchId);

        const matchCategory =
            !filterCategory || item.category === filterCategory;

        const matchDate =
            !filterDate ||
            item.date ===
            filterDate.toLocaleDateString("en-GB").replaceAll("/", "-");
        return matchId && matchCategory && matchDate;
    });

    /* ===== Pagination Logic ===== */
    let visibleReports = [];

    if (page === 1) {
        visibleReports = filteredRecords.slice(0, firstPageCount);
    } else {
        const startIndex =
            firstPageCount + (page - 2) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;

        visibleReports = filteredRecords.slice(startIndex, endIndex);
    }

    return (
        <>
            <StreetsHistoryFilters
                onSearchChange={setSearchId}
                onDateChange={setFilterDate}
                onCategoryChange={setFilterCategory}
            />

            <StreetsHistoryStats />

            <div className="mt-4">
                <StreetsHistoryTable />

                <StreetsHistoryTableRows
                    records={visibleReports}
                    onView={(report) => {
                        setSelectedReport(report);
                        setOpenDetails(true);
                        setShowMap(false);
                    }}
                />

                {/* Pagination */}
                <div
                    dir={isArabic ? "rtl" : "ltr"}
                    className="flex justify-between items-center mt-4 text-sm">
                    <span className="text-gray-500">
                        {t("page")} {page} {t("of")} {totalPages}
                    </span>

                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => {
                                setPage((p) => Math.max(p - 1, 1));
                                setOpenDetails(false);
                            }}
                            className="px-3 py-1 rounded-lg border disabled:opacity-40">
                            {t("previous")}
                        </button>

                        <button
                            disabled={page === totalPages}
                            onClick={() => {
                                setPage((p) => Math.min(p + 1, totalPages));
                                setOpenDetails(false);
                            }}
                            className="px-3 py-1 rounded-lg border disabled:opacity-40">
                            {t("next")}
                        </button>
                    </div>
                </div>

            </div>

            {/* ===== Details Modal ===== */}
            {openDetails && selectedReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="absolute inset-0 backdrop-blur-sm"></div>

                    <div className="relative bg-white w-[90%] max-w-6xl h-[85vh] rounded-2xl p-6">
                        <button onClick={() => {
                            setOpenDetails(false);
                            setShowMap(false);}}
                            className="absolute top-4 left-4 text-green-800 text-xl font-bold">
                            ✕
                        </button>

                        {!showMap ? (
                            <StreetsHistoryDetails
                                report={selectedReport}
                                onOpenMap={() => setShowMap(true)}
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
