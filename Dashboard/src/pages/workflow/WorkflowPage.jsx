import { useState } from "react";
import { useTranslation } from "react-i18next";
import WorkflowHeader from "./WorkflowHeader";
import WorkflowCard from "./WorkflowCard";
import { getWorkflowReports } from "../../services/workflowService";

function WorkflowPage() {
    const { t, i18n } = useTranslation();
    const [page, setPage] = useState(1);
    const totalPages = 50;

    const allReports = getWorkflowReports();

    const visibleReports = page === 1 ? allReports : [];

    const columns = [
        { key: "new", title: t("newReports") },
        { key: "assigned", title: t("assigned") },
        { key: "inProgress", title: t("inProgress") },
        { key: "review", title: t("underReview") },
        { key: "done", title: t("solved") },
    ];

    const orderedColumns =
        i18n.language === "ar" ? columns : [...columns].reverse();

    return (
        <div className="flex flex-col gap-6">

            {/* ===== Header ===== */}
            <WorkflowHeader reports={visibleReports} />

            {/* ===== Columns ===== */}
            <div className=" grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
                {orderedColumns.map((col) => {
                    const columnReports = visibleReports.filter(
                        (report) => report.status === col.key
                    );

                    return (
                        <div key={col.key}
                            className="bg-gray-100 rounded-xl p-3 flex flex-col gap-3"> 
                            {columnReports.length > 0 ? (
                                columnReports.map((report) => (
                                    <WorkflowCard key={report.id} report={report} />
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

            {/* ===== Pagination ===== */}
            <div
                dir={i18n.language === "ar" ? "rtl" : "ltr"}
                className="flex justify-between items-center mt-6 text-sm">
                <span className="text-gray-500">
                    {t("page")} {page} {t("of")} {totalPages}
                </span>

                <div className="flex gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        className="px-3 py-1 rounded-lg border disabled:opacity-40">
                        {t("previous")}
                    </button>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        className="px-3 py-1 rounded-lg border disabled:opacity-40">
                        {t("next")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WorkflowPage;
