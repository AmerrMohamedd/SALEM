

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendarIcon from "../../assets/icons/calendar.png";

function DashboardFilters() {
    const [date, setDate] = useState(null);

    return (
        <div dir="ltr" className=" -mt-3 flex justify-start relative">
            <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                placeholderText="Calender"
                className="h-7 px-3 w-40 text-sm text-right text-gray-900
                border border-gray-200 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                focus:outline-none focus:ring-2 focus:ring-[#2DDBC9] cursor-pointer"
            />

            {/* icon */}
            <img
                src={calendarIcon}
                alt="calendar"
                className="absolute ml-3 top-1/2 -translate-y-1/2 w-4 h-4"
            />
        </div>
    );
}

export default DashboardFilters;


