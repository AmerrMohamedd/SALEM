import noStreetsHis from "../../assets/noreviews.png";

function StreetsHisoryEmpty() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center gap-7">
            <img src={noStreetsHis} alt="No Reports"className="w-80 opacity-90"/>

            <h3 className="text-lg font-bold text-gray-700">
                لا يوجد سجل الشوارع والصيانات السابقة حتي الأن
            </h3>
        </div>
    );
}

export default StreetsHisoryEmpty;
