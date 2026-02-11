import trashIcon from "../../assets/trash.png";
import arrowIcon from "../../assets/arrow-right.png";

function NotificationsTableRows({
    notifications,
    onSelect,
    onDelete,
    onGo,
}) {
    const priorityColor = {
        عالية: "bg-red-500",
        متوسطة: "bg-yellow-400",
        منخفضة: "bg-green-500",
    };

    return (
        <div className="bg-white rounded-xl shadow mt-2 divide-y overflow-x-auto">
            {notifications.map((item) => (
                <div key={item.id}
                    className="  relative grid grid-cols-5 items-center px-2 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm gap-1 sm:gap-2">
                    {/* شريط الأولوية */}
                    <div className={`absolute right-0 top-0 h-full w-1 rounded-tr-xl rounded-br-xl ${priorityColor[item.priority]}`}/>

                    {/* الاسم + checkbox */}
                    <div className="flex items-center gap-2 text-right pr-2">
                        <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => onSelect(item.id)}
                        />
                        <span className="font-semibold truncate">
                            {item.name}
                        </span>
                    </div>

                    <div className="truncate text-center">
                        {item.email}
                    </div>

                    <div className="truncate text-center font-semibold">
                        {item.subject}
                    </div>

                    <div className="truncate text-center text-gray-500">
                        {item.message}
                    </div>

                    {/* الإجراءات */}
                    <div className="flex justify-center items-center gap-3">
                        <button onClick={() => onGo(item.reportId)}>
                            <img src={arrowIcon} className="w-4 h-4" />
                        </button>

                        <button onClick={() => onDelete(item.id)}>
                            <img src={trashIcon} className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default NotificationsTableRows;
