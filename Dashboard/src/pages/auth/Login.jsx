import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { error as swalError } from "../../utils/swal";

function Login() {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    const [nationalId, setNationalId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // تحقق بسيط
        if (!nationalId || !password) {
            return swalError("Please fill all fields");
        }

        // ✅ MOCK LOGIN (بدل API)
        if (nationalId === "12345678901234" && password === "123456") {

            // 👇 أهم حاجة عشان السيستم يرضى
            localStorage.setItem("access", "mock-access-token");
            localStorage.setItem("refresh", "mock-refresh-token");

            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: "Admin",
                    user_type: "employee",
                })
            );

            navigate("/dashboard", { replace: true });

        } else {
            swalError("Invalid data");
        }
    };

    return (
        <motion.div
            dir={isArabic ? "rtl" : "ltr"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
        >
            <h2 className="text-base md:text-lg font-extrabold mb-2">
                {t("loginTitle")}
            </h2>

            <p className="text-xs md:text-sm text-gray-500 mb-6">
                {t("loginDesc")}
            </p>

            <form className="space-y-4" onSubmit={handleLogin}>

                {/* National ID */}
                <div>
                    <label className="block text-sm mb-1">
                        {t("nationalId")}
                    </label>
                    <input
                        type="text"
                        maxLength="14"
                        inputMode="numeric"
                        placeholder={t("enterNationalId")}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                        onChange={(e) => setNationalId(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm mb-1">
                        {t("password")}
                    </label>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder={t("enterPassword")}
                            className="w-full px-3 py-2 border rounded-md text-sm"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute top-2 ${isArabic ? "left-3" : "right-3"
                                }`}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Forgot Password */}
                <div className={isArabic ? "text-right" : "text-left"}>
                    <Link
                        to="/forget-password"
                        className="text-xs text-[#00816F]"
                    >
                        {t("forgotPassword")}
                    </Link>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl text-white font-semibold bg-gradient-to-r from-[#00816F] to-[#2DDBC9]"
                >
                    {t("loginButton")}
                </button>
            </form>

           
        </motion.div>
    );
}

export default Login;