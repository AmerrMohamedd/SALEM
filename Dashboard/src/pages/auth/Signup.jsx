import AuthLayout from "../../layout/AuthLayout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Signup() {
    return (
        <AuthLayout>
            <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}>
                {/* Title */}
                <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
                    سجل باستخدام عنوان بريدك الإلكتروني
                </h2>

                {/* Form */}
                <form className="space-y-5 text-sm">

                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-medium">
                            اسم الملف الشخصي
                        </label>
                        <input type="text" placeholder="أدخل اسم ملفك الشخصي"
                            className="w-full px-3 py-2 border rounded-md transition-colors duration-200
                        hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"/>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">
                            البريد الإلكتروني
                        </label>
                        <input type="email" placeholder="أدخل عنوان بريدك الإلكتروني"
                            className="w-full px-3 py-2 border rounded-md transition-colors duration-200
                        hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"/>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium">
                            كلمة المرور
                        </label>
                        <input type="password" placeholder="أدخل كلمة المرور الخاصة بك"
                            className="w-full px-3 py-2 border rounded-md transition-colors duration-200
                        hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"/>
                        <p className="text-[11px] text-gray-500 mt-1">
                            استخدم 12 حرفًا أو أكثر من مزيج من الأحرف والأرقام والرموز
                        </p>
                    </div>

                    {/* Small Selects */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block mb-1 font-medium">
                                الإدارة / الجهة
                            </label>
                            <select className="w-full px-2 py-1.5 border rounded-md bg-white text-xs
                              transition-colors duration-200 hover:border-[#2DDBC9]
                              focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]">
                                <option>اختر</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                الوظيفة / الدور
                            </label>
                            <select className="w-full px-2 py-1.5 border rounded-md bg-white text-xs
                              transition-colors duration-200 hover:border-[#2DDBC9]
                              focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]">
                                <option>اختر</option>
                            </select>
                        </div>
                    </div>

                    {/* City */}
                    <div>
                        <label className="block mb-1 font-medium">
                            المنطقة / المدينة
                        </label>
                        <input type="text" placeholder="أدخل المنطقة أو المدينة"
                            className="w-full px-3 py-2 border rounded-md transition-colors duration-200
                        hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"/>
                    </div>

                    {/* Terms */}
                    <label className="flex gap-2 text-[11px] leading-4">
                        <input type="checkbox" className="mt-1 accent-[#00816F]" />
                        <span>
                            مشاركة بيانات تسجيلي مع موفري المحتوى لدينا لأغراض التسويق.
                            بإنشاء الحساب أنت توافق على الشروط وسياسة الخصوصية.
                        </span>
                    </label>

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.12 }}
                        className="w-full py-2.5 rounded-xl text-white font-semibold
                        bg-gradient-to-r from-[#00816F] to-[#2DDBC9]">
                        التسجيل
                    </motion.button>

                </form>

                {/* Login Link */}
                <div className="mt-4 text-center text-xs">
                    هل لديك حساب بالفعل؟
                    <Link to="/login"
                        className="text-[#00816F] font-semibold mr-1 hover:text-[#2DDBC9] ">
                        تسجيل الدخول
                    </Link>
                </div>
            </motion.div>
        </AuthLayout>
    );
}

export default Signup;
