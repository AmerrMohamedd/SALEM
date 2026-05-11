import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import WorkflowHeader from "./WorkflowHeader";
import WorkflowCard from "./WorkflowCard";

// ✅ الجديد
import { getWorkflowReports } from "../../api/workflow_api";

import { error as swalError } from "../../utils/swal";

const PAGE_SIZE = 12;

function WorkflowPage() {
    const { t, i18n } = useTranslation();

    const [page, setPage] = useState(1);
    const [allReports, setAllReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const totalPages = Math.max(
        1,
        Math.ceil(allReports.length / PAGE_SIZE)
    );

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                setLoading(true);

                const list = await getWorkflowReports();

                if (!cancelled) {
                    setAllReports(Array.isArray(list) ? list : []);
                }

            } catch (err) {
                if (!cancelled) {
                    setAllReports([]);

                    const msg =
                        err.response?.data?.detail ||
                        err.response?.data?.message ||
                        "Error loading workflow";

                    swalError(t("workflow") || "Workflow", msg);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        setPage((p) => Math.min(p, totalPages));
    }, [totalPages]);

    const startIdx = (page - 1) * PAGE_SIZE;
    const visibleReports = allReports.slice(
        startIdx,
        startIdx + PAGE_SIZE
    );

    const getColumnReports = (statusKey) =>
        visibleReports.filter((r) => r.status === statusKey);

    const columns = [
        { key: "new", title: t("newReports") },
        { key: "assigned", title: t("assigned") },
        { key: "inProgress", title: t("inProgress") },
        { key: "review", title: t("underReview") },
        { key: "forwarded", title: t("forwarded") },
        { key: "done", title: t("solved") },
    ];

    const orderedColumns =
        i18n.language === "ar" ? columns : [...columns].reverse();

    return (
        <div className="flex flex-col gap-6">

            {/* HEADER */}
            <WorkflowHeader reports={allReports} />

            {/* CONTENT */}
            {loading ? (
                <p className="py-8 text-center text-gray-500">
                    {t("loading") || "Loading..."}
                </p>
            ) : (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-6">
                    {orderedColumns.map((col) => {
                        const columnReports = getColumnReports(col.key);

                        return (
                            <div
                                key={col.key}
                                className="bg-gray-100 rounded-xl p-3 flex flex-col gap-3"
                            >
                                {columnReports.length > 0 ? (
                                    columnReports.map((report) => (
                                        <WorkflowCard
                                            key={report.id}
                                            report={report}
                                        />
                                    ))
                                ) : (
                                    <p className="text-xs text-gray-400 text-center">
                                        {t("noReports")}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* PAGINATION */}
            <div
                dir={i18n.language === "ar" ? "rtl" : "ltr"}
                className="flex justify-between items-center mt-6 text-sm"
            >
                <span className="text-gray-500">
                    {t("page")} {page} {t("of")} {totalPages}
                </span>

                <div className="flex gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        className="px-3 py-1 rounded-lg border disabled:opacity-40"
                    >
                        {t("previous")}
                    </button>

                    <button
                        disabled={page === totalPages}
                        onClick={() =>
                            setPage((p) => Math.min(p + 1, totalPages))
                        }
                        className="px-3 py-1 rounded-lg border disabled:opacity-40"
                    >
                        {t("next")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WorkflowPage;