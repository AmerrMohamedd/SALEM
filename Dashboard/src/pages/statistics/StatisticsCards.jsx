const mockStats = {
    month: {
        total: 40689,
        open: 20879,
        inReview: 10293,
        transferred: 5029,
        solvedToday: 2040,
    },
    last7days: {
        total: 8200,
        open: 3200,
        inReview: 1800,
        transferred: 900,
        solvedToday: 450,
    },
};

function StatisticsCards({ filters }) {
    const data = mockStats[filters.period];

    const cards = [
        { title: "البلاغات التي تم حلها اليوم", value: data.solvedToday },
        { title: "البلاغات المحولة", value: data.transferred },
        { title: "البلاغات قيد المراجعة", value: data.inReview },
        { title: "البلاغات المفتوحة", value: data.open },
        { title: "إجمالي البلاغات", value: data.total },
    ];

    return (
        <div dir="rtl" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
            {cards.map((card, i) => (
                <div
                    key={i}
                    className="bg-white rounded-lg px-3 py-2 flex justify-between items-center shadow" >
                    <div>
                        <p className="text-[11px] text-gray-500">{card.title}</p>
                        <p className="text-lg font-extrabold text-[#00816F]">
                            {card.value}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StatisticsCards;
