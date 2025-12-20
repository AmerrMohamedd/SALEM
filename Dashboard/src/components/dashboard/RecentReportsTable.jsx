function RecentReportsTable() {
    const reports = [
        { id: 1025, date: "2025-10-30", status: "قيد التنفيذ", entity: "هيئة الكهرباء" },
        { id: 1027, date: "2025-10-30", status: "تحت المراجعة", entity: "شركة المياه" },
        { id: 1028, date: "2025-10-30", status: "تم الحل", entity: "هيئة الطرق" },
    ];

    const statusStyles = {
        "قيد التنفيذ": "bg-purple-100 text-purple-700",
        "تحت المراجعة": "bg-orange-100 text-orange-700",
        "تم الحل": "bg-green-100 text-green-700",
    };

    return (
        <div className="h-full bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">

            <div className="flex-1 overflow-hidden">
                <table className="w-full text-sm text-right">
                    <thead className="bg-gradient-to-r from-[#00816F] to-[#2DDBC9] text-white">
                        <tr>
                            <th className="px-4 py-2">رقم البلاغ (ID)</th>
                            <th className="px-4 py-2">التاريخ</th>
                            <th className="px-4 py-2">الحالة</th>
                            <th className="px-4 py-2">الجهة</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reports.map((r) => (
                            <tr key={r.id} className="border-b last:border-0">
                                <td className="px-4 py-2">{r.id}</td>
                                <td className="px-4 py-2">{r.date}</td>
                                <td className="px-4 py-2">
                                    <span className={`px-2 rounded-full text-xs ${statusStyles[r.status]}`}>
                                        {r.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">{r.entity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default RecentReportsTable;
