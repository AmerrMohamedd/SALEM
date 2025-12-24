import { useState, useEffect } from "react";
import WorkflowHeader from "./WorkflowHeader";
import WorkflowColumn from "./WorkflowColumn";
import EmptyWork from "./EmptyWork";

/* ========= Mock Data ========= */
const allReports = [
    {
        id: 1,
        status: "new",
        title: "كابل مقطوع",
        location: "مدينة نصر",
        time: "8 دقائق",
        priority: "عالية",
    },
    {
        id: 2,
        status: "assigned",
        title: "حفرة طريق",
        location: "المعادي",
        time: "15 دقيقة",
        priority: "متوسطة",
    },
    {
        id: 3,
        status: "inProgress",
        title: "كسر ماسورة",
        location: "الدقي",
        time: "20 دقيقة",
        priority: "منخفضة",
    },
    {
        id: 4,
        status: "review",
        title: "عمود إنارة",
        location: "شبرا",
        time: "5 دقائق",
        priority: "عالية",
    },
    {
        id: 5,
        status: "done",
        title: "كابل كهرباء",
        location: "مدينة نصر",
        time: "1 ساعة",
        priority: "متوسطة",
    },

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
    const rowsPerPage = 10;
    const totalPages = 50;

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const visibleReports = allReports.slice(startIndex, endIndex);
    const hasAnyReports = allReports.length > 0;

    /* ===== هنا حساب أرقام الهيدر ===== */
    const workflowStats = {
        new: allReports.filter(r => r.status === "new").length,
        assigned: allReports.filter(r => r.status === "assigned").length,
        inProgress: allReports.filter(r => r.status === "inProgress").length,
        review: allReports.filter(r => r.status === "review").length,
        done: allReports.filter(r => r.status === "done").length,
    };


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    return (
        <div className="flex flex-col min-h-full">

            {/* ===== Header ===== */}
            <WorkflowHeader />

            {/* ===== Content ===== */}
            {hasAnyReports ? (
                <div className="mt-6 flex flex-col gap-6">

                    <div className="-mt-3 flex flex-col">

                        {/* الصف الأول: 5 أعمدة */}
                        <div className="grid grid-cols-5">
                            {columns.map((col) => (
                                <WorkflowColumn
                                    key={col.key}
                                    title={col.title}
                                    data={visibleReports.filter(
                                        (report) => report.status === col.key
                                    )}
                                />
                            ))}
                        </div>

                        {/* الصف الثاني */}
                        <div className="grid grid-cols-5">
                            {columns.slice(0, 2).map((col) => (
                                <WorkflowColumn
                                    key={`row2-${col.key}`}
                                    title={col.title}
                                    data={visibleReports.filter(
                                        (report) => report.status === col.key
                                    )}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <EmptyWork />
                </div>
            )}


            {/* ===== Pagination ===== */}
            <div className="mt-auto pt-8 flex justify-between items-center text-sm">
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

                {/* اليمين: عدد الصفحات */}
                <span className="text-gray-500">
                    صفحة {page} من {totalPages}
                </span>
            </div>
        </div>
    );
}

export default WorkflowPage;
