function WorkflowCard({ report }) {
    const priorityColors = {
        "عالية": "bg-red-500",
        "متوسطة": "bg-yellow-400",
        "منخفضة": "bg-green-500",
    };

    return (
        <div className="relative bg-white rounded-xl shadow-sm p-4">

            {/* شريط الأولوية – يمين بالطول */}
            <div className={`absolute right-0 top-0 h-full w-3 rounded-tr-xl rounded-br-xl 
            ${priorityColors[report.priority]}`}/>

            {/* المحتوى – نفس ترتيب كارت البلاغات */}
            <div className="flex flex-col gap-1 text-sm">
                <span className="font-bold text-gray-800">
                    {report.title}
                </span>

                <span className="text-gray-500">
                    {report.location}
                </span>

                <span className="text-xs text-gray-400">
                    {report.time}
                </span>
            </div>
        </div>
    );
}

export default WorkflowCard;
