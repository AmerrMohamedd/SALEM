import React from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Home = ({ changeLanguage }) => {
    const { t } = useTranslation();

    return (
        <div
            id="Home"
            className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center"
            style={{ backgroundImage: "url('/background.png')" }}
        >
            <Navbar changeLanguage={changeLanguage} />

            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative w-full text-center text-white px-6 md:px-20 lg:px-32">
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                >
                    <h2 className="text-4xl md:text-[60px] font-semibold leading-tight max-w-3xl mx-auto">
                        {t("home_title")}
                    </h2>

                    <div className="mt-16 flex gap-6 justify-center">
                        <a
                            href="#Services"
                            className="px-20 py-3 rounded-xl text-white bg-gradient-to-b 
                            from-[#00BE9B] to-[#1B4374] text-lg font-medium"
                        >
                            {t("our_services")}
                        </a>

                        <a
                            href="#DownloadApp"
                            className="border border-white px-20 py-3 rounded-xl 
                            text-white text-lg font-medium"
                        >
                            {t("download_app")}
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
