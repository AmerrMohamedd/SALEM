import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { signup, getSignupMeta } from "../../services/authService";
import { error as swalError, success as swalSuccess } from "../../utils/swal";

function Signup() {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [nationalId, setNationalId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [department, setDepartment] = useState("");
    const [region, setRegion] = useState("");
    const [role, setRole] = useState("");

    const [departments, setDepartments] = useState([]);
    const [regions, setRegions] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await getSignupMeta(); 
            // endpoint بيرجع departments, regions, roles

            setDepartments(data.departments || []);
            setRegions(data.regions || []);
            setRoles(data.roles || []);
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };

    fetchData();
}, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            username: name,
            email: email,
            password: password,
            user_type: "employee",
            national_id: nationalId,
            department: Number(department),
            region: Number(region),           // ID
            role: role                // string like "admin"
        };

        try {
            await signup(payload);
            await swalSuccess("Success", "Account created. You can now login.");
            navigate("/login");
        } catch (err) {
            const msg = err.response?.data?.detail ?? err.response?.data?.message ?? Object.values(err.response?.data || {})?.[0]?.[0] ?? "Signup failed";
            swalError("Signup failed", typeof msg === "string" ? msg : JSON.stringify(msg));
        }
    };

    return (
        <motion.div
            dir={isArabic ? "rtl" : "ltr"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}>

            <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
                {t("signupTitle")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 text-sm">

                {/* Name */}
                <div>
                    <label className="block mb-1 font-medium">
                        {t("profileName")}
                    </label>
                    <input
                        type="text"
                        placeholder={t("enterProfileName")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md transition-colors duration-200
                        hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"
                    />
                </div>

                {/* National ID */}
                <div>
                    <label className="block mb-1 font-medium">
                        {t("nationalId")}
                    </label>
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={14}
                        placeholder={t("enterNationalId")}
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md transition-colors duration-200
                        hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 font-medium">
                        {t("email")}
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("enterEmail")}
                        className="w-full px-3 py-2 border rounded-md transition-colors duration-200
                        hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block mb-1 font-medium">
                        {t("password")}
                    </label>
                    <input
                        type="password"
                        placeholder={t("enterPassword")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md transition-colors duration-200
                        hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]"
                    />

                    <p className="text-[11px] text-gray-500 mt-1">
                        {t("passwordHint")}
                    </p>
                </div>

                {/* Small Selects */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block mb-1 font-medium">
                            {t("department")}
                        </label>

                        <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full px-3 py-1 border rounded-md bg-white text-sm
                            transition-colors duration-200 hover:border-[#2DDBC9]  focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]">

                            <option value=""></option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.department_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            {t("role")}
                        </label>

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-3 py-1 border rounded-md bg-white text-sm
                            transition-colors duration-200 hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]">

                            <option value=""></option>
                            {roles.map((rol) => (
                                <option key={rol.id} value={rol.id}>
                                    {rol.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Region Select بدل input */}
                <div>
                    <label className="block mb-1 font-medium">
                        {t("city")}
                    </label>

                    <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md transition-colors duration-200
                        hover:border-[#2DDBC9] focus:outline-none focus:ring-2 focus:ring-[#2DDBC9]">

                        <option value=""></option>
                        {regions.map((reg) => (
                            <option key={reg.id} value={reg.id}>
                                {reg.region_name}
                            </option>
                        ))}
                    </select>
                </div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.12 }}
                    className="w-full py-2.5 rounded-xl text-white font-semibold
                    bg-gradient-to-r from-[#00816F] to-[#2DDBC9]">
                    {t("signup")}
                </motion.button>

            </form>

            <div className="mt-4 text-center text-xs">
                {t("alreadyHaveAccount")}
                <Link to="/login"
                    className="text-[#00816F] font-semibold mr-1 hover:text-[#2DDBC9]">
                    {t("loginButton")}
                </Link>
            </div>

        </motion.div>
    );
}

export default Signup;
