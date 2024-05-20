import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ToastPopUp.css";

function ToastPopUp({ onFinishToast, setToast, text }) {
  useEffect(() => {
    toast.dismiss();
    toast.success(text, {
      onClose: () => {
        if (onFinishToast) {
          onFinishToast();
        }
        if (setToast) {
          setToast(false);
        }
      },
    });
  }, [onFinishToast, setToast, text]);

  return (
    <div className="ToastPopUp">
      <ToastContainer />
    </div>
  );
}

export default ToastPopUp;
