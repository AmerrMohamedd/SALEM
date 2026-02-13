import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function SetNewPassword() {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";
    const navigate = useNavigate();

    return (
        <motion.div
            dir={isArabic ? "rtl" : "ltr"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}>

            <h2 className="text-base md:text-lg font-extrabold mb-4 text-center">
                {t("setNewPassword")}
            </h2>

            <div className="space-y-4">

                <input type="password" placeholder={t("setNewPassword")}
                    className="w-full px-4 py-2.5 border rounded-xl text-sm
                    transition-colors duration-200
                    hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"
                />

                <input type="password" placeholder={t("confirmPassword")}
                    className="w-full px-4 py-2.5 border rounded-xl text-sm
                    transition-colors duration-200
                    hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"
                />

            </div>

            <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.12 }}
                onClick={() => navigate("/login")}
                className="w-full mt-6 py-2.5 rounded-xl text-white font-semibold
                bg-gradient-to-r from-[#00816F] to-[#2DDBC9]">
                {t("createNewPassword")}
            </motion.button>

        </motion.div>
    );
}

export default SetNewPassword;
