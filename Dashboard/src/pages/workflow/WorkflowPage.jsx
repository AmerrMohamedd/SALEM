import { useState } from "react";
import WorkflowHeader from "./WorkflowHeader";
import WorkflowColumn from "./WorkflowColumn";
import EmptyWork from "./EmptyWork";

/* ========= Mock Data ========= */
const allReports = [
    { id: 1, status: "new", title: "كابل مقطوع", location: "مدينة نصر", time: "8 دقائق", priority: "عالية" },
    { id: 2, status: "assigned", title: "حفرة طريق", location: "المعادي", time: "15 دقيقة", priority: "متوسطة" },
    { id: 3, status: "inProgress", title: "كسر ماسورة", location: "الدقي", time: "20 دقيقة", priority: "منخفضة" },
    { id: 4, status: "review", title: "عمود إنارة", location: "شبرا", time: "5 دقائق", priority: "عالية" },
    { id: 5, status: "done", title: "كابل كهرباء", location: "مدينة نصر", time: "1 ساعة", priority: "متوسطة" },
    { id: 6, status: "new", title: "كابل مقطوع", location: "مدينة نصر", time: "8 دقائق", priority: "عالية" },
    { id: 7, status: "assigned", title: "حفرة طريق", location: "المعادي", time: "15 دقيقة", priority: "متوسطة" },
    { id: 8, status: "inProgress", title: "كسر ماسورة", location: "الدقي", time: "20 دقيقة", priority: "منخفضة" },
];

/* ========= Columns ========= */
const columns = [
    { key: "new", title: "بلاغات جديدة" },
    { key: "assigned", title: "تم التعيين" },
    { key: "inProgress", title: "جاري التنفيذ" },
    { key: "review", title: "مراجعة" },
    { key: "done", title: "تم الانتهاء" },
];

function WorkflowPage() {
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    // 👇 البلاغات بتزيد بالطول
    const visibleReports = allReports.slice(0, page * itemsPerPage);

    const hasAnyReports = visibleReports.length > 0;

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <WorkflowHeader />

            {hasAnyReports ? (
                <div
                    className="
                    grid gap-4
                    grid-cols-1
                    sm:grid-cols-3
                    lg:grid-cols-5
                "
                >
                    {columns.map((col) => (
                        <WorkflowColumn
                            key={col.key}
                            data={visibleReports.filter(
                                (report) => report.status === col.key
                            )}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <EmptyWork />
                </div>
            )}

            {/* ===== Pagination ===== */}
            <div
                dir="rtl"
                className="
                mt-6
                flex flex-col-reverse sm:flex-row
                items-center justify-between
                gap-3
                text-xs sm:text-sm
            "
            >
                {/* 👇 ثابتة 50 */}
                <span className="text-gray-500">
                    صفحة {page} من 50
                </span>

                <div className="flex gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        className="px-3 py-1.5 rounded-lg border hover:bg-gray-100 disabled:opacity-40"
                    >
                        السابق
                    </button>

                    <button
                        disabled={page === 50}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-3 py-1.5 rounded-lg border hover:bg-gray-100"
                    >
                        التالي
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WorkflowPage;
