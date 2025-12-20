import noReportsImg from "../../assets/noreports.png";

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center gap-7">
            <img src={noReportsImg} alt="No Reports"className="w-80 opacity-90"/>

            <h3 className="text-lg font-bold text-gray-700">
                لا توجد بلاغات حاليًا
            </h3>

            <p className="text-sm text-gray-500 max-w-sm">
                عند وصول بلاغات جديدة ستظهر هنا تلقائيًا
            </p>
        </div>
    );
}

export default EmptyState;
