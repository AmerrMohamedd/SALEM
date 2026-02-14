import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import NotificationsFilters from "./NotificationsFilters";
import NotificationsTableHeader from "./NotificationsTableHeader";
import NotificationsTableRows from "./NotificationsTableRows";
import { getNotifications } from "../../services/notificationsService";

function NotificationsPage() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    /* ===== Data ===== */
    const [notifications, setNotifications] = useState(() =>
        getNotifications()
    );

    /* ===== State ===== */
    const [page, setPage] = useState(1);
    const [searchName, setSearchName] = useState("");

    const rowsPerPage = 12;
    const totalPages = 50;

    /* ===== Filter ===== */
    const filteredData = notifications.filter((item) => {
        const name = item.name[i18n.language] || "";
        return name.toLowerCase().includes(searchName.toLowerCase());
    });


    /* ===== Pagination ===== */
    const startIndex = (page - 1) * rowsPerPage;
    const visibleData = filteredData.slice(
        startIndex,
        startIndex + rowsPerPage
    );

    const isNextDisabled =
        startIndex + rowsPerPage >= filteredData.length;

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
        <div
            dir={isArabic ? "rtl" : "ltr"}
            className="px-6 py-4 flex flex-col min-h-full">
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

            {/* ===== Pagination ===== */}
            <div className="mt-auto pt-6 flex items-center justify-between text-sm">
                <span className="text-gray-500">
                    {t("page")} {page} {t("of")} {totalPages}
                </span>

                <div className="flex gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() =>
                            setPage((p) => Math.max(p - 1, 1))
                        }
                        className="px-3 py-1 border rounded disabled:opacity-40">
                        {t("previous")}
                    </button>

                    <button
                        disabled={isNextDisabled}
                        onClick={() =>
                            setPage((p) => p + 1)
                        }
                        className="px-3 py-1 border rounded disabled:opacity-40">
                        {t("next")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotificationsPage;
