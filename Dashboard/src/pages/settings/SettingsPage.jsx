import { useState } from "react";
import { DndContext, closestCenter,} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy,} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* ================= HELPERS ================= */
const getSliderBg = (value) => {
    let color = value < 25
        ? "#9F3A2C": value < 50
        ? "#F59E0B": value < 75
        ? "#2563EB": "#16A34A";

    return {
        background: `linear-gradient(to left,${color} ${value}%,#E5E7EB ${value}%)`,
    };
};

/* ================= MAIN ================= */

export default function SettingsPage() {
    const ALL = ["⚡ كهرباء", "💧 مياه", "💡 إنارة", "🛣 طرق"];

    const [categories, setCategories] = useState([
        { id: 1, name: "⚡ كهرباء", hidden: false },
        { id: 2, name: "💧 مياه", hidden: false },
    ]);

    const [priorities, setPriorities] = useState([
        "⚡ كهرباء",
        "💧 مياه",
    ]);

    const [showAdd, setShowAdd] = useState(false);

    const [sla, setSla] = useState({
        "⚡ كهرباء": { hours: 1, days: 1 },
        "💧 مياه": { hours: 1, days: 1 },
    });

    const [overtime, setOvertime] = useState({
        alert: true,
        reassign: false,
    });

    const [notifications, setNotifications] = useState({
        sms: true,
        email: true,
        update: false,
        assign: true,
    });

    const [ai, setAi] = useState(20);

    /* ================= LOGIC ================= */

    const addCategory = (c) => {
        if (categories.find((x) => x.name === c)) return;

        setCategories((p) => [
            ...p,
            { id: Date.now(), name: c, hidden: false },
        ]);

        setPriorities((p) => [...p, c]);

        setSla((p) => ({
            ...p,
            [c]: { hours: 1, days: 1 },
        }));
    };

    /* ================= UI ================= */

    return (
        <div dir="rtl" className="h-screen flex flex-col px-8 py-3 text-sm">

            {/* TITLE */}
            <h2 className=" font-bold mb-4 -mt-3">
                إدارة قواعد البلاغات
                <span className="text-xs"> (Incident Rules Management)</span>
            </h2>

            {/* ================= SCROLLABLE CONTENT ================= */}
            <div className="flex-1 overflow-y-auto min-h-0 pb-20">

                {/* ================= Categories ================= */}
                <Section>
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">تحديد الفئات</h3>
                        <button onClick={() => setShowAdd(!showAdd)}
                            className="border border-[#2DDBC9] text-[#00816F] px-2 py-0.5 rounded text-xs">
                            + Add New
                        </button>
                    </div>

                    {showAdd && (
                        <div className="max-h-12 overflow-y-auto flex gap-2 mb-2">
                            {ALL.map((c) => (
                                <button  key={c}  onClick={() => addCategory(c)}
                                    className="border px-2 py-0.5 rounded text-xs whitespace-nowrap">
                                    {c}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
                        {categories.map((cat) => (
                            <div key={cat.id}
                                className={`bg-white rounded px-3 py-1.5 flex justify-between 
                                items-center shadow-sm transition ${cat.hidden ? "blur-sm opacity-50" : ""}`} >

                                <span>{cat.name}</span>

                                <div className="flex gap-3 text-xs text-[#00816F]">
                                    <button onClick={() => setCategories((p) =>  p.filter((c) => c.id !== cat.id))}>
                                        مسح
                                    </button>

                                    <button onClick={() => setCategories((p) =>  p.map((c) =>  c.id === cat.id ? { ...c, hidden: !c.hidden } : c))}>
                                        {cat.hidden ? "إظهار" : "إخفاء"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ================= Priorities ================= */}
                <Section title="تعديل الأولويات">
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={(e) => {
                            const { active, over } = e;
                            if (over && active.id !== over.id) {
                                setPriorities((items) =>
                                    arrayMove(
                                        items,
                                        items.indexOf(active.id),
                                        items.indexOf(over.id)
                                    )
                                );
                            }
                        }}>
                        <SortableContext
                            items={priorities}
                            strategy={verticalListSortingStrategy}>
                            <div className="space-y-1.5">
                                {priorities.map((p) => (
                                <SortableItem key={p} id={p} /> ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </Section>

                {/* ================= SLA ================= */}
                <Section title="تحديد زمن الخدمة">
                    {Object.keys(sla).map((key) => (
                        <div key={key}
                           className="bg-white px-3 py-1.5 rounded shadow-sm flex justify-between items-center">
                            <span>{key}</span>
                            <div className="flex gap-3">
                                <TimeInput
                                    value={sla[key].hours}
                                    unit="ساعة"
                                    onChange={(v) =>
                                        setSla({
                                            ...sla,
                                            [key]: { ...sla[key], hours: v },
                                        })
                                    }
                                />
                                <TimeInput
                                    value={sla[key].days}
                                    unit="يوم"
                                    onChange={(v) =>
                                        setSla({
                                            ...sla,
                                            [key]: { ...sla[key], days: v },
                                        })
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </Section>

                {/* ================= Overtime ================= */}
                <Section title="إجراء تجاوز الزمن">
                    <Toggle
                        label="إرسال تنبيه أحمر"
                        active={overtime.alert}
                        onClick={() =>
                            setOvertime((p) => ({ ...p, alert: !p.alert }))
                        }
                    />
                    <Toggle
                        label="إعادة تعيين المهمة"
                        active={overtime.reassign}
                        onClick={() =>
                            setOvertime((p) => ({ ...p, reassign: !p.reassign }))
                        }
                    />
                </Section>

                {/* ================= AI ================= */}
                <Section title="إعدادات التحقق الذكي">
                    <div className="flex items-center gap-6 ">
                        <input type="range" min={0} max={100} value={ai}
                            onChange={(e) => setAi(+e.target.value)}
                            style={getSliderBg(ai)}
                            className="w-[420px] h-1.5 appearance-none rounded-full outline-none cursor-pointer accent-transparent"
                        />

                        <div className="px-3 py-1 border border-[#2DDBC9] rounded-xl text-sm font-semibold text-[#00816F] bg-white">
                            {ai}%
                        </div>
                    </div>
                </Section>

                {/* ================= Notifications ================= */}
                <Section title="إعدادات الإشعارات">
                    <div className="grid grid-cols-2 gap-y-3 gap-x-10">
                        <Toggle label="SMS" active={notifications.sms}
                            onClick={() =>
                                setNotifications((p) => ({ ...p, sms: !p.sms }))
                            }
                        />
                        <Toggle label="البريد الإلكتروني" active={notifications.email}
                            onClick={() =>
                                setNotifications((p) => ({ ...p, email: !p.email }))
                            }
                        />
                        <Toggle label="تنبيه عند تحديث بسيط" active={notifications.update}
                            onClick={() =>
                                setNotifications((p) => ({ ...p, update: !p.update }))
                            }
                        />
                        <Toggle label="تنبيه عند التعيين" active={notifications.assign}
                            onClick={() =>
                                setNotifications((p) => ({ ...p, assign: !p.assign }))
                            }
                        />
                    </div>
                </Section>

                {/* ================= Buttons ================= */}
                <div className="flex justify-center gap-4 mt-6 mb-2">
                    <button className="border px-10 py-1 rounded">تعديل</button>
                    <button className="bg-gradient-to-r from-[#00816F] to-[#2DDBC9] text-white px-10 py-1 rounded">
                        إضافة
                    </button>
                </div>

            </div>
        </div>
    );
}

/* ================= COMPONENTS ================= */

function Section({ title, children }) {
    return (
        <div className="mb-3">
            {title && <h3 className="font-semibold mb-1">{title}</h3>}
            <div className="space-y-1.5">{children}</div>
        </div>
    );
}

function TimeInput({ value, onChange, unit }) {
    return (
        <div className="flex items-center border rounded px-2 py-0.5 gap-1">
            <input type="number" value={value}
                onChange={(e) => onChange(+e.target.value)}
                className="w-8 text-center outline-none text-xs"
            />
            <span className="text-[10px]">{unit}</span>
        </div>
    );
}

function Toggle({ label, active, onClick }) {
    return (
        <div className="flex items-center gap-4">
            <span className="text-sm">{label}</span>
            <div onClick={onClick}
                className={`w-9 h-4 rounded-full cursor-pointer relative
                ${active ? "bg-gradient-to-r from-[#00816F] to-[#2DDBC9]" : "bg-gray-300"}`}>
                <div
                    className={`absolute top-0.5 w-3 h-3 bg-white rounded-full
                    ${active ? "right-0.5" : "left-0.5"}`}
                />
            </div>
        </div>
    );
}

function SortableItem({ id }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style}
            {...attributes} {...listeners}
            className="bg-white px-3 py-1.5 rounded shadow-sm cursor-grab" >
            ≡ {id}
        </div>
    );
}
