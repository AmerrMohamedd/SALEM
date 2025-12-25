import eyeIcon from "../../assets/icons/eyes.png";

function StreetsHistoryTableRows({ records = [], onView }) {
    return (
        <div className="bg-white rounded-xl shadow mt-2 divide-y">
            {records.map((item, index) => (
                <div  key={`${item.id}-${index}`}
                    className="grid grid-cols-6 text-center text-sm py-4 px-4 items-center">

                    {/* رقم البلاغ */}
                    <div className="font-bold text-[#00816F]">
                        {item.id}
                    </div>

                    {/* التاريخ */}
                    <div>{item.date}</div>


                    {/* نوع المشكلة */}
                    <div>{item.category}</div>

                    {/* الحالة */}
                    <div className={`font-semibold ${item.status === "تم الحل"
                        ? "text-green-600" : item.status === "قيد التنفيذ"
                        ? "text-orange-500" : "text-red-500" }`}>
                        {item.status}
                    </div>

                    {/* زمن الإصلاح */}
                    <div>{item.repairTime}</div>

                    {/* 👁️ الإجراءات */}
                    <div className="flex justify-center">
                        <button onClick={() => onView(item)}
                            className="hover:scale-110 transition">
                            <img src={eyeIcon} alt="view"
                            className="w-5 h-5"/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StreetsHistoryTableRows;
