import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { login } from "../../services/authService";

function Login() {
    const [nationalId, setNationalId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    return (
        <>
            {/* Page animation */}
            <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }} >
                {/* Title */}
                <h2 className="text-base md:text-lg font-extrabold text-gray-800 mb-2">
                    تسجيل الدخول
                </h2>

                {/* Description */}
                <p className="text-xs md:text-sm text-gray-500 mb-6">
                    قم بتسجيل الدخول للوصول إلى لوحة التحكم الخاصة بك
                </p>

                {/* Form */}
                <form className="space-y-4"
                    onSubmit={async (e) => {
                        e.preventDefault();

                        //  validation 
                        if (!/^\d{14}$/.test(nationalId)) {
                            alert("الرقم القومي يجب أن يكون 14 رقم صحيح");
                            return;
                        }


                        try {
                            const data = await login(nationalId, password);

                            localStorage.setItem("token", data.token);
                            localStorage.setItem("user", JSON.stringify({ nationalId }));

                            navigate("/dashboard", { replace: true });
                        } catch {
                            alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
                        }
                    }}
                >
                    {/* Email */}
                    <div>
                        <label className="block text-xs md:text-sm mb-1">
                            الرقم القومي
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={14}
                            placeholder="أدخل الرقم القومي"
                            className="w-full px-3 py-2 border rounded-md text-sm hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"
                            onChange={(e) => setNationalId(e.target.value)}
                        />

                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-xs md:text-sm mb-1">
                            كلمة المرور
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="أدخل كلمة المرور"
                                className="w-full px-3 py-2 border rounded-md text-sm pr-10 transition-colors duration-200 hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <motion.button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.1 }}
                                className="absolute inset-y-0 left-3 flex items-center text-gray-400 hover:text-[#00816F]"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </motion.button>
                        </div>
                    </div>

                    {/* Forget password */}
                    <div className="text-left">
                        <Link to="/forget-password"
                        className="text-xs text-[#00816F] transition-colors hover:text-[#2DDBC9]">
                            هل نسيت كلمة المرور؟
                        </Link>
                    </div>

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.12 }}
                        className="w-full py-2.5 rounded-xl text-white font-semibold bg-gradient-to-r from-[#00816F] to-[#2DDBC9]">
                        تسجيل الدخول
                    </motion.button>
                </form>

                {/* Signup */}
                <div className="mt-6 text-center text-xs md:text-sm">
                    ليس لديك حساب؟
                    <Link to="/signup"
                        className="text-[#00816F] font-semibold mr-1 transition-colors hover:text-[#2DDBC9]">
                        التسجيل
                    </Link>
                </div>
            </motion.div>
        </>
    );
}

export default Login;
