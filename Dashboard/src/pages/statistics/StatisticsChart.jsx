import { useEffect, useState } from "react";

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

import {
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet.heat";

import {
  getLineChartData,
  getDonutData,
  getHeatPoints,
} from "../../api/statistics_api";

function HeatLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !points.length)
      return;

    const heatLayer = L.heatLayer(
      points,
      {
        radius: 25,
        blur: 15,
        maxZoom: 12,
      }
    );

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
}

function StatisticsChart({ filters }) {
  const { i18n } =
    useTranslation();

  const isArabic =
    i18n.language === "ar";

  const [lineData, setLineData] =
    useState([]);

  const [donutData, setDonutData] =
    useState([]);

  const [heatPoints, setHeatPoints] =
    useState([]);

  useEffect(() => {
    const loadCharts =
      async () => {
        try {
          const [
            line,
            donut,
            heat,
          ] = await Promise.all([
            getLineChartData(filters),

            getDonutData(filters),

            getHeatPoints(),
          ]);

          setLineData(line || []);

          setDonutData(donut || []);

          setHeatPoints(heat || []);
        } catch (error) {
          console.error(
            "Statistics Charts Error:",
            error
          );
        }
      };

    loadCharts();
  }, [filters]);

  const total = donutData.reduce(
    (s, i) => s + i.value,
    0
  );

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="space-y-6"
    >
      {/* ===== LINE CHART ===== */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <LineChart data={lineData}>
            <XAxis dataKey="day" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#00816F"
              strokeWidth={3}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ===== DONUT + MAP ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ===== MAP ===== */}
        <div className="bg-white rounded-2xl p-3 shadow-sm h-[350px] overflow-hidden">
          <MapContainer
            center={[30.0444, 31.2357]}
            zoom={11}
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

            <HeatLayer
              points={heatPoints}
            />
          </MapContainer>
        </div>

        {/* ===== DONUT ===== */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center">
          <ResponsiveContainer
            width="100%"
            height={260}
          >
            <PieChart>
              <Pie
                data={donutData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                label
              >
                {donutData.map(
                  (item, i) => (
                    <Cell
                      key={i}
                      fill={
                        item.color
                      }
                    />
                  )
                )}
              </Pie>

              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-2xl font-bold fill-gray-800"
              >
                {total}
              </text>
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs">
            {donutData.map(
              (item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1"
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        item.color,
                    }}
                  />

                  <span>
                    {item.name}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsChart;