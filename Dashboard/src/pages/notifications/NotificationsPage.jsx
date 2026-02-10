import { useState } from "react";
import { useNavigate } from "react-router-dom";

import NotificationsFilters from "./NotificationsFilters";
import NotificationsTableHeader from "./NotificationsTableHeader";
import NotificationsTableRows from "./NotificationsTableRows";

const initialNotifications = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    reportId: 1000 + i,
    name: `أحمد محمد ${i + 1}`,
    email: `ahmed${i + 1}@salem.com`,
    subject: "بلاغ جديد",
    message: "تم استلام بلاغ جديد برجاء المراجعة",
    priority: i % 3 === 0 ? "عالية" : i % 3 === 1 ? "متوسطة" : "منخفضة",
    selected: false,
}));

function NotificationsPage() {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState(initialNotifications);
    const [page, setPage] = useState(1);
    const [searchName, setSearchName] = useState("");

    const rowsPerPage = 12;
    const totalPages = 50;


    /* ===== Filter ===== */
    const filteredData = notifications.filter((item) =>
        item.name.toLowerCase().includes(searchName.toLowerCase())
    );

    /* ===== Pagination ===== */
    const startIndex = (page - 1) * rowsPerPage;
    const visibleData = filteredData.slice(
        startIndex,
        startIndex + rowsPerPage
    );

    /* ===== Actions ===== */
    const handleSelect = (id) => {
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, selected: !item.selected }
                    : item
            )
        );
    };

    const handleDelete = (id) => {
        setNotifications((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    return (
        <div className="px-6 py-4 flex flex-col min-h-full">
            <NotificationsFilters
                onSearchChange={(value) => {
                    setSearchName(value);
                    setPage(1);
                }}
            />

            <NotificationsTableHeader />

            <NotificationsTableRows
                notifications={visibleData}
                onSelect={handleSelect}
                onDelete={handleDelete}
                onGo={(id) => navigate(`/dashboard/reports/${id}`)}
            />

            {/* Pagination */}
            <div
                dir="rtl"
                className="mt-auto pt-6 flex items-center justify-between text-sm"
            > 
            <span className="text-gray-500">
                    صفحة {page} من {totalPages}
                </span>

                <div className="flex gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        className="px-3 py-1 border rounded disabled:opacity-40"
                    >
                        السابق
                    </button>

                    <button
                        disabled={startIndex + rowsPerPage >= filteredData.length}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-3 py-1 border rounded"
                    >
                        التالي
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotificationsPage;
