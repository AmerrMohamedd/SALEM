import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function Signup() {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    const [name, setName] = useState("");
    const [nationalId, setNationalId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <motion.div
            dir={isArabic ? "rtl" : "ltr"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}>

            <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
                {t("signupTitle")}
            </h2>

            <form className="space-y-5 text-sm">

                {/* Name */}
                <div>
                    <label className="block mb-1 font-medium">
                        {t("profileName")}
                    </label>
                    <input
                        type="text"
                        placeholder={t("enterProfileName")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md transition-colors duration-200
                        hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"
                    />
                </div>

                {/* National ID */}
                <div>
                    <label className="block mb-1 font-medium">
                        {t("nationalId")}
                    </label>
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={14}
                        placeholder={t("enterNationalId")}
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md transition-colors duration-200
                        hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 font-medium">
                        {t("email")}
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("enterEmail")}
                        className="w-full px-3 py-2 border rounded-md transition-colors duration-200
                        hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"
                    />
                </div>


                {/* Password */}
                <div>
                    <label className="block mb-1 font-medium">
                        {t("password")}
                    </label>
                    <input
                        type="password"
                        placeholder={t("enterPassword")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md transition-colors duration-200
                        hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"
                    />

                    <p className="text-[11px] text-gray-500 mt-1">
                        {t("passwordHint")}
                    </p>
                </div>

                {/* Small Selects */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block mb-1 font-medium">
                            {t("department")}
                        </label>

                        <select
                            className="w-full px-3 py-1 border rounded-md bg-white text-sm
                            transition-colors duration-200 hover:border-[#2DDBC9]  focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]">
                            <option value=""></option>
                            <option value="roads">{t("roads")}</option>
                            <option value="water">{t("water")}</option>
                            <option value="electricity">{t("electricity")}</option>
                            <option value="lighting">{t("lighting")}</option>

                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            {t("role")}
                        </label>

                        <select
                            className="w-full px-3 py-1 border rounded-md bg-white text-sm
                            transition-colors duration-200 hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]">
                            <option value=""></option>
                            <option value="managers">{t("managers")}</option>
                            <option value="employees">{t("employees")}</option>
                            <option value="fieldStaff">{t("fieldStaff")}</option>
                            <option value="distributionOfficers">{t("distributionOfficers")}</option>

                        </select>
                    </div>

                </div>

                {/* City */}
                <div>
                    <label className="block mb-1 font-medium">
                        {t("city")}
                    </label>
                    <input
                        type="text"
                        placeholder={t("enterCity")}
                        className="w-full px-3 py-2 border rounded-md transition-colors duration-200
                        hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"
                    />
                </div>


                {/* Submit */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.12 }}
                    className="w-full py-2.5 rounded-xl text-white font-semibold
                    bg-gradient-to-r from-[#00816F] to-[#2DDBC9]">
                    {t("signup")}
                </motion.button>

            </form>

            {/* Login Link */}
            <div className="mt-4 text-center text-xs">
                {t("alreadyHaveAccount")}
                <Link  to="/login"
                    className="text-[#00816F] font-semibold mr-1 hover:text-[#2DDBC9]">
                    {t("loginButton")}
                </Link>
            </div>

        </motion.div>
    );
}

export default Signup;
