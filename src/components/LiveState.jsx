import React from "react";
import { motion } from "framer-motion";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FaRoad, FaBolt, FaLightbulb, FaWater } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

//Animation variants
const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 1 } }
};

const fadeScale = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 1 } }
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } }
};

const LiveState = () => {
    const { t } = useTranslation();

    // small cards
    const smallCards = [
        { label: t("live_small_road"), value: 1240, icon: <FaRoad size={22} /> },
        { label: t("live_small_elec"), value: 620, icon: <FaBolt size={22} /> },
        { label: t("live_small_light"), value: 430, icon: <FaLightbulb size={22} /> },
        { label: t("live_small_water"), value: 390, icon: <FaWater size={22} /> },
    ];

    // chart data
    const data = {
        labels: t("live_days"),
        datasets: [
            {
                data: [40, 48, 60, 62, 55, 22, 20],
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: "#93c5fd",
                borderWidth: 3,
                borderColor: (ctx) => {
                    const chart = ctx.chart;
                    const { ctx: canvas, chartArea } = chart;
                    if (!chartArea) return "#00BE9B";

                    const gradient = canvas.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, "#00BE9B");
                    gradient.addColorStop(1, "#1B4374");
                    return gradient;
                }
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            x: { ticks: { color: "white" }, grid: { display: false } },
            y: { ticks: { color: "white" }, grid: { color: "rgba(255,255,255,0.1)" } }
        }
    };

    return (
        <div
            id="LiveState"
            className="relative w-full min-h-screen py-20 px-10 text-white"
            style={{ backgroundColor: "#0C111D" }}
        >

            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative py-5 z-10 flex justify-center mb-12"
            >
                <h1 className="text-4xl font-bold bg-white/10 px-40 py-4 rounded-3xl backdrop-blur-lg">
                    {t("live_title")}
                </h1>
            </motion.div>

            <div className="relative z-10 grid grid-cols-12 gap-10">

                {/* Graph */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="col-span-12 lg:col-span-6 bg-black/30 rounded-2xl p-10 backdrop-blur-md"
                >
                    <div
                        dir="ltr"
                        className="rounded-2xl bg-gradient-to-b from-[#00BE9B] to-[#1B4374] p-4 h-[320px]"
                    >
                        <Line data={data} options={options} />
                    </div>
                </motion.div>

                {/* Big Cards */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="col-span-12 lg:col-span-3 flex flex-col gap-10"
                >
                    <motion.div
                        variants={fadeScale}
                        className="rounded-2xl bg-gradient-to-b from-[#00BE9B]/40 to-[#1B4374]/20 
                        p-8 text-center backdrop-blur-md"
                    >
                        <p className="text-6xl font-bold">2680</p>
                        <p className="opacity-80 mt-2">{t("live_total_incidents")}</p>
                    </motion.div>

                    <motion.div
                        variants={fadeScale}
                        className="rounded-2xl bg-gradient-to-b from-[#00BE9B]/40 to-[#1B4374]/20 
                        p-8 text-center backdrop-blur-md"
                    >
                        <p className="text-5xl font-bold">3h 25m</p>
                        <p className="opacity-80 mt-2">{t("live_avg_time")}</p>

                        <div className="flex justify-center items-end gap-2 mt-5">
                            {[4, 6, 3, 7, 5, 8, 6].map((h, i) => (
                                <div
                                    key={i}
                                    className="w-2 rounded-full"
                                    style={{
                                        height: h * 7,
                                        background: "linear-gradient(to top, #00BE9B, #1B4374)"
                                    }}
                                ></div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Small Cards */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="col-span-12 lg:col-span-3 grid grid-cols-2 gap-6"
                >
                    {smallCards.map((item, index) => (
                        <motion.div
                            variants={fadeUp}
                            key={index}
                            className="bg-white/10 backdrop-blur-xl border border-white/20 
                            rounded-xl p-4 h-30 flex flex-col justify-between shadow-lg shadow-black/40"
                        >
                            <div className="bg-gradient-to-b from-[#00BE9B] to-[#1B4374] bg-clip-text">
                                {item.icon}
                            </div>

                            <div className="flex flex-col">
                                <p className="text-sm opacity-90">{item.label}</p>
                                <p className="text-2xl font-semibold">{item.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </div>
    );
};

export default LiveState;
