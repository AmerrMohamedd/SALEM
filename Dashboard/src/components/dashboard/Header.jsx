function Header() {
    return (
        <header className="h-16 bg-white flex items-center justify-between px-6 border-b">

            <h1 className="font-bold text-lg">
                الصفحة الرئيسية
            </h1>

            <div className="flex items-center gap-4 text-sm">
                <button className="text-red-500">
                    تسجيل الخروج
                </button>
            </div>

        </header>
    );
}

export default Header;
