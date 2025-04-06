import React, { useEffect, useRef } from "react";
import { XCircle } from "lucide-react";
import Button from "../../controls/button/buttonView";

const AlertDialog = ({ open, onClose, onConfirm, title, description }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCancel}
          >
            <XCircle className="w-4 h-4" />
          </button>
        </form>
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="py-4">{description}</p>
        <div className="modal-action">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="btn-error" onClick={handleConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </dialog>
  );
};

export default AlertDialog;
