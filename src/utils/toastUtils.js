// toastUtils.js
import toast from "react-hot-toast";
// import "./ReactToastify.css";

// toast.configure();

export const showError = (message) => {
  toast.error(message, {
    position: "top-right",
    duration: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showWarning = (message) => {
  toast.warning(message, {
    position: "top-right",
    duration: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showSuccess = (message) => {
  toast.success(message);
};
