import { useState } from "react";
import avatar from "../../assets/avatar.png";

import UsersFilters from "./UsersFilters";
import UsersCards from "./UsersCards";
import UsersTableHeader from "./UsersTableHeader";
import UsersTableRows from "./UsersTableRows";
import AddUserModal from "./AddUserPage";
import EditUserModal from "./EditUserModal";

function UsersPage() {
    /* ===== USERS (الداتا كاملة) ===== */
    const [users, setUsers] = useState([
        { id: 1, name: "عادل السيد صبري", role: "المديرون", email: "adel@company.com", image: "https://i.pravatar.cc/150?img=11", lastLoginDate: "15/11/2025 10:30 ص" },
        { id: 2, name: "أحمد محمد علي", role: "الموظفون", email: "ahmed@company.com", image: "https://i.pravatar.cc/150?img=12", lastLoginDate: "14/11/2025 09:20 ص" },
        { id: 3, name: "منى إبراهيم حسن", role: "الموظفون", email: "mona@company.com", image: "https://i.pravatar.cc/150?img=13", lastLoginDate: "13/11/2025 01:45 م" },
        { id: 4, name: "محمد حسن عبد الله", role: "الميدانيون", email: "mohamed@company.com", image: "https://i.pravatar.cc/150?img=14", lastLoginDate: "12/11/2025 11:10 ص" },
        { id: 5, name: "سارة علي محمود", role: "الموظفون", email: "sara@company.com", image: "https://i.pravatar.cc/150?img=15", lastLoginDate: "11/11/2025 03:00 م" },
        { id: 6, name: "خالد محمود عبد السلام", role: "الميدانيون", email: "khaled@company.com", image: "https://i.pravatar.cc/150?img=16", lastLoginDate: "10/11/2025 08:55 ص" },
        { id: 7, name: "نهى يوسف أحمد", role: "الموظفون", email: "noha@company.com", image: "https://i.pravatar.cc/150?img=17", lastLoginDate: "09/11/2025 02:40 م" },
        { id: 8, name: "عمر فؤاد حسين", role: "الميدانيون", email: "omar@company.com", image: "https://i.pravatar.cc/150?img=18", lastLoginDate: "08/11/2025 10:15 ص" },
        { id: 9, name: "ريم أحمد محمود", role: "الموظفون", email: "reem@company.com", image: "https://i.pravatar.cc/150?img=19", lastLoginDate: "07/11/2025 04:05 م" },
        { id: 10, name: "إيهاب سمير عبد الرحمن", role: "المديرون", email: "ehab@company.com", image: "https://i.pravatar.cc/150?img=20", lastLoginDate: "06/11/2025 09:00 ص" },
        { id: 11, name: "محمد حسن عبد الله", role: "الميدانيون", email: "mohamed@company.com", image: "https://i.pravatar.cc/150?img=20", lastLoginDate: "15/11/2025 10:30 ص", },
        { id: 12, name: "سارة علي محمود", role: "الموظفون", email: "sara@company.com", image: "https://i.pravatar.cc/150?img=1", lastLoginDate: "15/11/2025 10:30 ص", },
        { id: 13, name: "خالد محمود عبد السلام", role: "الميدانيون", email: "khaled@company.com", image: "https://i.pravatar.cc/150?img=2", lastLoginDate: "15/11/2025 10:30 ص", },
    ]);

    /* ===== FILTERS ===== */
    const [role, setRole] = useState("");
    const [search, setSearch] = useState("");

    const [openAdd, setOpenAdd] = useState(false);

    /* ===== EDIT MODAL ===== */
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    /* ===== PAGINATION ===== */
    const [page, setPage] = useState(1);
    const perPage = 12;
    const totalPages = 50;

    /* ===== FILTERED USERS ===== */
    const filteredUsers = users.filter((u) => {
        const matchSearch =
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());

        const matchRole = !role || u.role === role;
        return matchSearch && matchRole;
    });

    const startIndex = (page - 1) * perPage;
    const visibleUsers = filteredUsers.slice(
        startIndex,
        startIndex + perPage
    );

    const isTableView = role !== "";

    /* ===== DELETE ===== */
    const handleDeleteUser = (id) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    /* ===== SAVE EDIT ===== */
    const handleSaveEdit = (updatedUser) => {
        setUsers((prev) =>
            prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
        setOpenEdit(false);
    };

    return (
        <div className="p-4 flex flex-col h-full">

            {/* ===== FILTERS ===== */}
            <UsersFilters
                onAddUser={() => setOpenAdd(true)}
                onSearchChange={setSearch}
                onRoleChange={setRole}
            />



            {/* ===== CONTENT ===== */}
            <div className="flex-1">

                {/* ===== CARDS VIEW ===== */}
                {!isTableView && (
                    <>
                        <UsersCards users={visibleUsers} />

                        {/* PAGINATION */}
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-gray-500">
                                صفحة {page} من {totalPages}
                            </span>

                            <div className="flex gap-2">
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                    className="px-4 py-1 border rounded disabled:opacity-40"
                                >
                                    السابق
                                </button>

                                <button
                                    disabled={startIndex + perPage >= filteredUsers.length}
                                    onClick={() => setPage((p) => p + 1)}
                                    className="px-4 py-1 border rounded disabled:opacity-40"
                                >
                                    التالي
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* ===== TABLE VIEW ===== */}
                {isTableView && (
                    <>
                        <UsersTableHeader />
                        <UsersTableRows
                            users={filteredUsers}
                            onEdit={(user) => {
                                setSelectedUser(user);
                                setOpenEdit(true);
                            }}
                            onDelete={handleDeleteUser}
                        />
                    </>
                )}
            </div>

            {/* ===== EDIT MODAL ===== */}
            {openEdit && (
                <EditUserModal
                    user={selectedUser}
                    onClose={() => setOpenEdit(false)}
                    onSave={handleSaveEdit}
                />
            )}
            {openAdd && (
                <AddUserModal
                    onClose={() => setOpenAdd(false)}
                    onAdd={(newUser) => {
                        setUsers(prev => [...prev, newUser]);
                        setOpenAdd(false);
                    }}
                />
            )}


        </div>
        
    );

}

export default UsersPage;
