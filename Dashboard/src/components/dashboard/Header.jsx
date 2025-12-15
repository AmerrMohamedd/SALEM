function Header({ onLogout }) {
    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">

            <h2 className="font-extrabold text-gray-800">
                الصفحة الرئيسية
            </h2>

            <div className="flex items-center gap-4 text-sm">
                <button className="px-3 py-2 rounded-lg hover:bg-gray-100">
                    EN
                </button>

                <button
                    onClick={onLogout}
                    className="flex items-center gap-1 text-red-500 font-semibold hover:text-red-600"
                >
                    تسجيل الخروج
                </button>
            </div>
        </header>
    );
}

export default Header;
