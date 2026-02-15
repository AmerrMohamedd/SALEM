import Swal from "sweetalert2";

const defaultOptions = {
    confirmButtonColor: "#00816F",
    cancelButtonColor: "#6b7280",
};

export const toast = (options = {}) => {
    return Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
        ...defaultOptions,
        ...options,
    });
};

export const success = (title, text) => {
    return Swal.fire({
        icon: "success",
        title: title ?? "Success",
        text: text ?? "",
        ...defaultOptions,
    });
};

export const error = (title, text) => {
    return Swal.fire({
        icon: "error",
        title: title ?? "Error",
        text: text ?? "",
        ...defaultOptions,
    });
};

export const confirm = (options = {}) => {
    return Swal.fire({
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: options.confirmText ?? "Confirm",
        cancelButtonText: options.cancelText ?? "Cancel",
        ...defaultOptions,
        ...options,
    });
};

export default Swal;
