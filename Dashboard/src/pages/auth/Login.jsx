import AuthLayout from "../../components/layout/AuthLayout";

function Login() {
    return (
        <AuthLayout>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                تسجيل الدخول
            </h2>

            <p className="text-sm text-gray-500 mb-8">
                سجل الدخول إلى حسابك الآن للتحكم بنظام الموقع الخاص بك
            </p>

            <form className="space-y-4">

                <div>
                    <label className="block text-sm mb-1">البريد الإلكتروني</label>
                    <input
                        type="email"
                        placeholder="أدخل البريد الإلكتروني هنا"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">كلمة المرور</label>
                    <input
                        type="password"
                        placeholder="أدخل كلمة المرور هنا"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                <div className="text-sm text-emerald-600 cursor-pointer">
                    هل نسيت كلمة المرور؟
                </div>

                <button
                    type="submit"
                    className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-emerald-700 to-teal-400"
                >
                    تسجيل الدخول
                </button>

            </form>

            <div className="mt-8 text-center text-sm">
                ليس لديك حساب؟
                <span className="text-emerald-600 font-semibold cursor-pointer mr-1">
                    التسجيل
                </span>
            </div>

        </AuthLayout>
    );
}

export default Login;
