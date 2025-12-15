function Home() {
    return (
        <>
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4">
                    <p className="text-xs text-gray-500">عدد المستخدمين</p>
                    <p className="text-2xl font-extrabold text-[#00816F]">40,689</p>
                </div>

                <div className="bg-white rounded-xl p-4">
                    <p className="text-xs text-gray-500">البلاغات المفتوحة</p>
                    <p className="text-2xl font-extrabold text-[#00816F]">20,879</p>
                </div>

                <div className="bg-white rounded-xl p-4">
                    <p className="text-xs text-gray-500">البلاغات المحلولة</p>
                    <p className="text-2xl font-extrabold text-[#00816F]">5,029</p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl p-4">
                <h3 className="font-bold mb-4 text-sm">آخر البلاغات</h3>

                <table className="w-full text-sm">
                    <thead className="text-gray-400 border-b">
                        <tr>
                            <th className="text-right py-2">الجهة</th>
                            <th className="text-right py-2">الحالة</th>
                            <th className="text-right py-2">التاريخ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="py-3">هيئة الكهرباء</td>
                            <td className="py-3 text-yellow-500">قيد التنفيذ</td>
                            <td className="py-3">2025-10-30</td>
                        </tr>
                        <tr>
                            <td className="py-3">شركة المياه</td>
                            <td className="py-3 text-green-600">تم الحل</td>
                            <td className="py-3">2025-10-29</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Home;
