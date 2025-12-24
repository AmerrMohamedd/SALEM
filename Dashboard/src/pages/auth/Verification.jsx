import AuthLayout from "../../layout/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Verification() {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="text-center" >
            <h2 className="text-base md:text-lg font-extrabold mb-2">
                ادخل رمز التحقق
            </h2>

            <p className="text-xs md:text-sm text-gray-500 mb-6">
                لقد قمنا بإرسال رمز التأكيد إلى بريدك الإلكتروني
            </p>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-3 mb-4">
                {[1, 2, 3, 4].map((_, i) => (
                    <input key={i} maxLength="1"
                        className="w-12 h-12 border rounded-full text-center text-lg transition-colors duration-200
                    hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"/>
                ))}
            </div>

            <p className="text-xs text-red-500 mb-4">
                00:59
            </p>

            <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.12 }}
                onClick={() => navigate("/set-new-password")}
                className=" w-full py-2.5 rounded-xl text-white font-semibold
                bg-gradient-to-r from-[#00816F] to-[#2DDBC9]">
                تحقق
            </motion.button>

            <div className="mt-6 flex justify-between text-xs">
                <Link to="/login" className="text-[#00816F] font-semibold hover:text-[#2DDBC9]">
                    تسجيل الدخول
                </Link>
                <span className="text-gray-500">
                    لم تستلم رمزًا؟
                </span>
            </div>
        </motion.div>
    );
}

export default Verification;
