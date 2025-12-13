import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Animation Variants
const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

const fadeRight = {
    hidden: { opacity: 0, x: 80 },
    show: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }
};

const stagger = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.25 }
    }
};

const Services = () => {
    const { t } = useTranslation();

    const steps = [
        { num: "01", title: t("step_1_title"), desc: t("step_1_desc") },
        { num: "02", title: t("step_2_title"), desc: t("step_2_desc") },
        { num: "03", title: t("step_3_title"), desc: t("step_3_desc") },
        { num: "04", title: t("step_4_title"), desc: t("step_4_desc") },
    ];

    return (
        <div
            id="Services"
            className="w-full py-20 px-10 lg:px-20 flex flex-col lg:flex-row gap-10"
        >
            <motion.div
                variants={fadeRight}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-200px 0px" }}
                className="w-full sm:w-1/2 max-w-lg"
            >
                <img
                    src={assets.road}
                    alt="Service"
                    className="w-full h-full object-cover rounded-3xl shadow-lg"
                />
            </motion.div>

            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-200px 0px" }}
                className="lg:w-1/2 w-full flex flex-col gap-6"
            >
                {/* Small title */}
                <motion.p
                    variants={fadeUp}
                    className="text-[#1B4374] tracking-wide font-semibold uppercase"
                >
                    {t("services_why")}
                </motion.p>

                {/* Main title */}
                <motion.h2
                    variants={fadeUp}
                    className="text-3xl lg:text-4xl font-bold leading-snug"
                >
                    <span className="text-[#1B4374]">{t("services_main1")} </span>
                    <span className="text-[#9A4D3A]">{t("services_main2")}</span>
                </motion.h2>

                {/* Steps */}
                <motion.div variants={stagger} className="flex flex-col gap-8 mt-4">
                    {steps.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={fadeUp}
                            className="flex flex-col gap-2"
                        >
                            {/* Number + Title */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#1B4374] flex items-center justify-center text-white font-bold">
                                    {item.num}
                                </div>

                                <h3 className="text-lg font-semibold">{item.title}</h3>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed ml-16">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Services;
