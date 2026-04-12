import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import StreetsHistoryFilters from "./StreetsHistoryFilters";
import StreetsHistoryStats from "./StreetsHistoryStats";
import StreetsHistoryTable from "./StreetsHistoryTable";
import StreetsHistoryTableRows from "./StreetsHistoryTableRows";
import StreetsHistoryDetails from "./StreetsHistoryDetails";
import StreetsHistoryMap from "./StreetsHistoryMap";
import { getStreetsHistory } from "../../services/streetshistoryService";

function StreetsHistoryPage() {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    const [records, setRecords] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedReport, setSelectedReport] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [showMap, setShowMap] = useState(false);

    const [searchId, setSearchId] = useState("");
    const [filterDate, setFilterDate] = useState(null);
    const [filterCategory, setFilterCategory] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            const params = {
                street: searchId || undefined,
                priority: filterCategory || undefined,
                date: filterDate
                    ? filterDate.toISOString().split("T")[0]
                    : undefined
            };

            try {
                setLoading(true);
                const data = await getStreetsHistory(params);

                if (!isMounted) return;

                setRecords(data.records ?? []);
                setStats(data.stats ?? null);

                const totalCount = (data.count ?? (data.records?.length ?? 0));
                setTotalPages(Math.max(1, Math.ceil(totalCount / 10)));

            } catch (error) {
                console.error("History Fetch Error:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };

    }, [searchId, filterDate, filterCategory]);

    const rowsPerPage = 10;
    const startIndex = (page - 1) * rowsPerPage;
    const visibleRecords = records.slice(startIndex, startIndex + rowsPerPage);

    return (
        <>
            <StreetsHistoryFilters
                onSearchChange={(val) => { setSearchId(val); setPage(1); }}
                onDateChange={(val) => { setFilterDate(val); setPage(1); }}
                onCategoryChange={(val) => { setFilterCategory(val); setPage(1); }}
            />

            <StreetsHistoryStats stats={stats} />

            <div className="mt-4">
                <StreetsHistoryTable />

                {loading ? (
                    <p className="py-8 text-center text-gray-500">{t("loading") || "Loading..."}</p>
                ) : (
                    <StreetsHistoryTableRows
                        records={visibleRecords}
                        onView={(report) => {
                            setSelectedReport(report);
                            setOpenDetails(true);
                            setShowMap(false);
                        }}
                    />
                )}

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

            {openDetails && selectedReport && (
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
