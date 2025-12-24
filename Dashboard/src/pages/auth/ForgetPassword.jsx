import AuthLayout from "../../layout/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

function ForgetPassword() {
    const navigate = useNavigate();

    return (
        <AuthLayout>
            <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="text-center">
                <h2 className="text-base md:text-lg font-extrabold mb-2">
                    استعادة كلمة المرور
                </h2>

                <p className="text-xs md:text-sm text-gray-500 mb-6">
                    قم بإدخال البريد الإلكتروني لاستعادة كلمة المرور الخاصة بك
                </p>

                <input type="email" placeholder="البريد الإلكتروني"
                    className="w-full px-4 py-2.5 border rounded-xl text-sm mb-4 transition-colors duration-200
                hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"/>

                <motion.button
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.12 }}
                    onClick={() => navigate("/verification")}
                    className="w-full py-2.5 rounded-xl text-white font-semibold
                    bg-gradient-to-r from-[#00816F] to-[#2DDBC9]">
                    إرسال رمز التحقق
                </motion.button>

                <div className="mt-6 flex justify-between text-xs">
                    <Link to="/login" className="text-[#00816F] font-semibold hover:text-[#2DDBC9]">
                        تسجيل الدخول
                    </Link>
                    <span className="text-gray-500">
                        تذكرت كلمة المرور؟
                    </span>
                </div>
            </motion.div>
        </AuthLayout>
    );
}

export default ForgetPassword;
