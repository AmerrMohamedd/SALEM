function WorkflowCard({ report }) {
    const priorityColors = {
        "عالية": "bg-red-500",
        "متوسطة": "bg-yellow-400",
        "منخفضة": "bg-green-500",
    };

    return (
        <div
            className="
            relative bg-white rounded-xl shadow-sm
            p-3 sm:p-4
        "
        >
            {/* Priority Bar */}
            <div
                className={`
                absolute right-0 top-0 h-full
                w-2 sm:w-3
                rounded-tr-xl rounded-br-xl
                ${priorityColors[report.priority]}
            `}
            />

            {/* Content */}
            <div
                className="
                flex flex-col gap-1
                text-[11px] sm:text-xs md:text-sm
            "
            >
                <span className="font-bold text-gray-800 truncate">
                    {report.title}
                </span>

                <span className="text-gray-500 truncate">
                    {report.location}
                </span>

                <span className="text-gray-400 text-[10px] sm:text-xs">
                    {report.time}
                </span>
            </div>
        </div>
    );
}

export default WorkflowCard;
