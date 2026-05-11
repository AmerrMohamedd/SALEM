import { useState, useEffect } from "react";
import avatar from "../../assets/avatar.png";
import { useTranslation } from "react-i18next";

export default function EditUserModal({ user, onClose, onSave }) {
    const { t } = useTranslation();
    const [form, setForm] = useState({
        id: "",
        name: "",
        email: "",
        role: "",
        image: "",
    });

    /* لما المودال يفتح يملى الداتا */
    useEffect(() => {
        if (user) {
            setForm({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.image,
            });
        }
    }, [user]);

    const handleSubmit = () => {
        if (!form.name || !form.email || !form.role) return;

        onSave(form);
    };

    if (!user) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="absolute inset-0 backdrop-blur-sm"></div>

            <div className="relative bg-white w-[90%] max-w-6xl rounded-2xl shadow-2xl p-6">

                {/* ❌ CLOSE */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-xl font-bold"
                >
                    ✕
                </button>

                {/* TITLE */}
                <h2 className="text-lg font-bold text-center mb-6">
                    {t("editEmployeeTitle")}
                </h2>

                <div className="grid grid-cols-12 gap-8">

                    {/* IMAGE — LEFT */}
                    <div className="col-span-4">
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <img
                                src={form.image || avatar}
                                className="w-full h-60 object-cover rounded-xl mb-3"
                            />

                            <label className="text-sm underline cursor-pointer">
                                {t("changeImage")}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            image: URL.createObjectURL(e.target.files[0]),
                                        })
                                    }
                                />
                            </label>
                        </div>
                    </div>

                    {/* FORM — RIGHT */}
                    <div className="col-span-8 grid grid-cols-2 gap-4">

                        <Input
                            label={t("fullName")}
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />

                        <Input
                            label={t("email")}
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />

                        {/* ROLE */}
                        <div className="col-span-2">
                            <label className="text-xs font-medium mb-1 block">
                                {t("roleDepartment")}
                            </label>
                            <select
                                value={form.role}
                                onChange={(e) =>
                                    setForm({ ...form, role: e.target.value })
                                }
                                className="w-full border rounded-lg px-3 py-1.5 text-xs"
                            >
                                <option value="">{t("selectRole")}</option>
                                <option>{t("admin")}</option>
                                <option>{t("employee")}</option>
                                <option>{t("fieldWorker")}</option>
                                <option>{t("distributionOfficer")}</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ACTION */}
                <div className="mt-8 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border rounded-lg text-sm"
                    >
                        {t("cancel")}
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-8 py-2 bg-gradient-to-r from-[#00816F] to-[#2DDBC9]
            text-white rounded-lg text-sm"
                    >
                        {t("saveChanges")}
                    </button>
                </div>
            </div>
        </div>
    );
}

/* INPUT */
function Input({ label, value, onChange, type = "text" }) {
    return (
        <div>
            <label className="text-xs font-medium mb-1 block">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
            />
        </div>
    );
}
