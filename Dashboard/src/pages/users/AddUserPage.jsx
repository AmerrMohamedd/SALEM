import Signup from "./Signup"; 

export default function AddUserModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      <div
      className="relative bg-white  w-[95%] sm:w-[85%] md:w-[700px] lg:w-[850px] 
  rounded-2xl shadow-2xl px-4 py-3"
      >
        {/* ❌ close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-lg font-bold"
        >
          ✕
        </button>

        {/* title */}
        <h2 className="text-base sm:text-lg font-bold text-center mb-3">
          إضافة موظف جديد
        </h2>

        {/* 👇 signup form */}
        <Signup />
      </div>
    </div>
  );
}