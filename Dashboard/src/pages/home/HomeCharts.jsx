import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";


function ChartsHome({ lineData = [], donutData = [] }) {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    const months = [
        t("jan"),
        t("feb"),
        t("mar"),
        t("apr"),
        t("may"),
        t("jun"),
        t("jul"),
        t("aug"),
        t("sep"),
        t("oct"),
        t("nov"),
        t("dec"),
    ];



    const [selectedMonth, setSelectedMonth] = useState(months[0]);
    const [open, setOpen] = useState(false);
    const total = donutData.reduce((sum, item) => sum + item.value, 0);

    const renderCustomLabel = ({
        cx,
        cy,
        midAngle,
        outerRadius,
        name,
        value,
        fill,
    }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius + 15;

        const x1 = cx + outerRadius * Math.cos(-midAngle * RADIAN);
        const y1 = cy + outerRadius * Math.sin(-midAngle * RADIAN);

        const x2 = cx + radius * Math.cos(-midAngle * RADIAN);
        const y2 = cy + radius * Math.sin(-midAngle * RADIAN);

        const x3 = x2 + (x2 > cx ? 15 : -15);
        const y3 = y2;

        return (
            <g>
                <path
                    d={`M${x1},${y1} L${x2},${y2} L${x3},${y3}`}
                    stroke={fill} fill="none" />

                <text x={x3} y={y3 - 4}
                    textAnchor={x3 > cx ? "start" : "end"}
                    className="text-xs fill-gray-700">
                    {name}
                </text>

                <text
                    x={x3}
                    y={y3 + 10}
                    textAnchor={x3 > cx ? "start" : "end"}
                    className="text-xs font-bold"
                    fill={fill}>
                    {value}
                </text>
            </g>
        );
    };



    return (
        <div dir={isArabic ? "ltr" : "rtl"} className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            {/* ================= Line Chart ================= */}
            <div className="bg-white rounded-2xl p-3 shadow-sm">

                {/* Header */}
                <div
                    className="flex items-center justify-between mb-3">
                    <div className="relative">
                        <button
                            onClick={() => setOpen(!open)}
                            className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-600
                            hover:bg-gray-100 transition">
                            {selectedMonth}
                        </button>

                        {open && (
                           <div className="absolute left-0 mt-2 w-32 bg-white
                                border rounded-xl shadow-lg z-20 max-h-40 overflow-y-auto scrollbar-thin">
                                {months.map((month) => (
                                    <button key={month}
                                        onClick={() => {
                                            setSelectedMonth(month);
                                            setOpen(false);
                                        }}
                                        className="block w-full text-right px-3 py-2
                                        text-xs hover:bg-gray-100">
                                        {month}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <h3 className="font-bold text-sm text-gray-800">
                        {t("homeTitle")}
                    </h3>
                </div>


                {/* Chart */}
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={lineData}>
                        <XAxis
                            dataKey="day"
                            tickFormatter={(value) => t(value)}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#9CA3AF" }}
                        />

                        <YAxis
                            tickFormatter={(v) => `${v}%`}
                            domain={[0, 100]}
                            ticks={[0, 25, 50, 75, 100]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#9CA3AF" }}
                        />

                        <Tooltip
                            contentStyle={{
                            borderRadius: "10px",
                            border: "none",
                            fontSize: "12px",
                            }}
                        />

                        <Line
                            type="monotone"    
                            dataKey="value"
                            stroke="#00816F"
                            strokeWidth={2}
                            dot={{ r: 2 }}
                            activeDot={{ r: 4 }}
                            isAnimationActive={true}
                            animationDuration={1200}
                            animationEasing="ease-out"
                            focusable={false} 
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* ================= Donut Chart ================= */}
            <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center">
                <ResponsiveContainer width={300} height={230}>
                    <PieChart>
                        <Pie
                            data={donutData}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={90}
                            labelLine={false}
                            label={renderCustomLabel}
                            isAnimationActive={true}
                            animationDuration={1200} 
                            animationEasing="ease-out" 
                            focusable={false}>
                            {donutData.map((item, i) => (
                                <Cell key={i} fill={item.color} />
                            ))}
                        </Pie>

                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-2xl font-extrabold fill-gray-800">
                            {total}
                        </text>
                    </PieChart>
                </ResponsiveContainer>

                {/* ===== Legend ===== */}
                <div className="flex items-center justify-center gap-4 mt-2 text-xs">
                    {donutData.map((item, i) => (
                        <div key={i} className="flex items-center gap-1 text-gray-600">
                            <span className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: item.color }}/>
                            <span>{t(item.name)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default ChartsHome;
