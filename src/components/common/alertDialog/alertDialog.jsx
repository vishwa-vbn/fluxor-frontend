import React, { useEffect, useRef } from "react";
import { XCircle } from "lucide-react";

const AlertDialog = ({ open, onClose, onConfirm, title, description, theme = "light" }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open) {
      if (dialog && !dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog && dialog.open) {
        dialog.close();
      }
    }

    // Cleanup to ensure dialog is closed on unmount
    return () => {
      if (dialog && dialog.open) {
        dialog.close();
      }
    };
  }, [open]);

  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    try {
      onConfirm();
    } catch (error) {
      console.error("Error in onConfirm:", error);
    }
    onClose(); // Ensure onClose is called even if onConfirm fails
  };

  const isLightTheme = theme === "light";

  return (
    <dialog
      ref={dialogRef}
      className={`rounded-lg shadow-xl backdrop:bg-black/50 ${
        isLightTheme ? "bg-white" : "bg-gray-800"
      } fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
    >
      <div className={`p-6 w-full max-w-md ${isLightTheme ? "bg-white text-gray-900" : "bg-gray-800 text-white"}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            type="button"
            className={`hover:text-gray-700 ${isLightTheme ? "text-gray-500" : "text-gray-300 hover:text-white"}`}
            onClick={handleCancel}
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        <p className={`mb-6 ${isLightTheme ? "text-gray-600" : "text-gray-300"}`}>{description}</p>
        <div className="flex justify-end gap-3">
          <button
            className={`px-4 py-2 border rounded-md ${
              isLightTheme
                ? "border-gray-300 text-gray-700 hover:bg-gray-100"
                : "border-gray-600 text-gray-200 hover:bg-gray-700"
            }`}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={handleConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AlertDialog;