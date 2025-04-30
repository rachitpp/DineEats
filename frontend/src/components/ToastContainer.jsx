import React from "react";
import Toast from "./Toast";

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-0 right-0 p-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
