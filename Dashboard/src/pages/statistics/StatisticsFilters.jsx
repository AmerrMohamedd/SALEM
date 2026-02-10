export default function StatisticsFilters() {
    return (
        <div className="flex items-center gap-4">
            <select className="px-4 py-2 border rounded-lg text-sm">
                <option>هذا الشهر</option>
                <option>آخر 7 أيام</option>
            </select>

            <select className="px-4 py-2 border rounded-lg text-sm">
                <option>اختر التاريخ</option>
            </select>
        </div>
    );
}
