import logo from "../../assets/logow.png";

function AuthLayout({ children }) {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

            {/* Left Side - Branding */}
            <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-b from-emerald-700 to-teal-400">
                <img
                    src={logo}
                    alt="Salem Logo"
                    className="w-40 mb-6"
                />
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center px-6">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>

        </div>
    );
}

export default AuthLayout;
