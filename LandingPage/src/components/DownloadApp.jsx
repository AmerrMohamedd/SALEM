import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { useTranslation } from "react-i18next";

//Animation variants
const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 1 } }
};

const fadeLeft = {
    hidden: { opacity: 0, x: 60 },
    show: { opacity: 1, x: 0, transition: { duration: 1 } }
};

const fadeRight = {
    hidden: { opacity: 0, x: -60 },
    show: { opacity: 1, x: 0, transition: { duration: 1 } }
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } }
};

const DownloadApp = () => {
    const { t } = useTranslation();

    return (
        <div
            id="DownloadApp"
            className="relative w-full py-20 px-10 lg:px-20 text-white overflow-hidden"
            style={{ backgroundColor: "#0C111D" }}
        >
            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative z-10 flex flex-col lg:flex-row items-center gap-16"
            >

                <div className="lg:w-1/2 w-full flex flex-col gap-6">

                    <motion.p
                        variants={fadeRight}
                        className="text-[#1B4374] tracking-wide font-semibold uppercase"
                    >
                        {t("download_small")}
                    </motion.p>

                    <motion.h2
                        variants={fadeRight}
                        className="text-3xl lg:text-4xl font-bold leading-snug"
                    >
                        {t("download_title")}
                    </motion.h2>

                    <motion.p
                        variants={fadeRight}
                        className="text-gray-300 leading-relaxed"
                    >
                        {t("download_desc1")}
                    </motion.p>

                    <motion.p
                        variants={fadeRight}
                        className="text-gray-400 text-sm"
                    >
                        {t("download_desc2")}
                    </motion.p>

                    <motion.p
                        variants={fadeRight}
                        className="text-2xl font-bold text-[#C45038]"
                    >
                        {t("download_now")}
                    </motion.p>

                    {/* Download buttons */}
                    <motion.div
                        variants={fadeRight}
                        className="flex items-center gap-4 mt-4 flex-wrap"
                    >
                        <a href="#" target="_blank" className="overflow-hidden rounded">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                alt="google-play"
                                className="h-14"
                            />
                        </a>

                        <a href="#" target="_blank" className="overflow-hidden rounded">
                            <img
                                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                alt="app-store"
                                className="h-14"
                            />
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    variants={fadeUp}
                    className="lg:w-1/2 w-full flex justify-center relative"
                >
                    <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        src={assets.mobile}
                        alt="phone preview"
                        className="w-[280px] lg:w-[340px] relative z-20"
                    />
                </motion.div>

            </motion.div>
        </div>
    );
};

export default DownloadApp;
