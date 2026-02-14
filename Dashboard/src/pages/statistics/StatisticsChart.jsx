import { useEffect } from "react";
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
    BarChart,
    Bar,
    LabelList,
} from "recharts";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

import {
    getLineChartData,
    getDonutData,
    getTeamPerformance,
    getHeatPoints,
} from "../../services/statisticsService";


/* ================= Heat Layer ================= */
function HeatLayer({ points }) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const heat = L.heatLayer(points, {
            radius: 20,
            blur: 15,
            maxZoom: 13,
        });

        heat.addTo(map);
        return () => map.removeLayer(heat);
    }, [map, points]);

    return null;
}


function ChartsSection() {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    const lineData = getLineChartData();
    const donutData = getDonutData();
    const teamPerformanceData = getTeamPerformance();
    const heatPoints = getHeatPoints();

    const total = donutData.reduce((s, i) => s + i.value, 0);

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
                <path d={`M${x1},${y1} L${x2},${y2} L${x3},${y3}`} stroke={fill} fill="none" />

                <text
                    x={x3}
                    y={y3 - 4}
                    textAnchor={x3 > cx ? "start" : "end"}
                    className="text-xs fill-gray-700">
                    {t(name)}
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
        <div
            dir={isArabic ? "rtl" : "ltr"}
            className="space-y-6">

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 -mt-2">

                {/* Line Chart */}
                <div className="bg-white rounded-2xl p-3 shadow-sm ">
                    <ResponsiveContainer width="100%" height={260}>
                        <LineChart data={lineData}>
                            <XAxis
                                dataKey="month"
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
                                width={45}
                                tickMargin={35}
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
                                strokeWidth={3}
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

                {/* Donut */}
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
                                className="text-2xl font-extrabold fill-gray-800" >
                                {total}
                            </text>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-4 mt-2 text-xs">
                        {donutData.map((item, i) => (
                            <div key={i} className="flex items-center gap-1 text-gray-600">
                                <span
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span>{t(item.name)}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Heat Map */}
                <div className="bg-white rounded-2xl p-3 shadow-sm h-[260px]">
                    <h3 className="text-sm font-bold text-gray-800 mb-2">
                        {t("reportsDensity")}
                    </h3>

                    <MapContainer
                        center={[30.0444, 31.2357]}
                        zoom={11}
                        style={{ height: 200 }}>
                        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                        <HeatLayer points={heatPoints} />
                    </MapContainer>
                </div>

                {/* Team Performance */}
                <div className="bg-white rounded-2xl p-4 shadow-sm h-[260px]">
                    <h3 className="text-sm font-bold text-black mb-4">
                        {t("teamPerformance")}
                    </h3>

                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart
                            data={teamPerformanceData}
                            layout="vertical"
                            margin={{ top: 0, left: 0, right: 90 }}>
                            <YAxis
                                type="category"
                                dataKey="id"
                                axisLine={false}
                                tickLine={false}
                                width={20}
                                tick={{
                                    fill: "#000",
                                    fontSize: 14,
                                    fontWeight: 400,
                                }}
                            />

                            <Bar
                                dataKey="value"
                                barSize={30}
                                radius={0}
                                isAnimationActive={false}>
                                {teamPerformanceData.map((item, index) => (
                                    <Cell key={index} fill={item.color} />
                                ))}

                                <LabelList
                                    dataKey="value"
                                    position="right"
                                    offset={35}
                                    fill="#000"
                                    fontSize={12}
                                    fontWeight={500}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>

                    <div
                        dir={isArabic ? "rtl" : "ltr"}
                        className="flex justify-between text-xs text-gray-400 mt-3 px-2">
                        <span>{t("weak")}</span>
                        <span>{t("average")}</span>
                        <span>{t("excellent")}</span>
                        <span>{t("high")}</span>
                        <span>{t("professional")}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ChartsSection;
