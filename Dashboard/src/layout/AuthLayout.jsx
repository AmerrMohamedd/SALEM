import { Outlet } from "react-router-dom";
import logo from "../assets/logow.png";
import pattern from "../assets/pattern.png";

function AuthLayout() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

            {/* Right Side - Branding */}
            <div className="relative hidden lg:flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#00816F] to-[#2DDBC9]">

                {/* Pattern Image */}
                <img
                    src={pattern}
                    alt="Pattern Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />

                {/* Logo */}
                <img
                    src={logo}
                    alt="Salem Logo"
                    className="relative z-10 w-64 object-contain"
                />
            </div>

            {/* Left Side - Form */}
            <div className="flex items-center justify-center px-6 bg-white">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </div>

        </div>
    );
}

export default AuthLayout;
