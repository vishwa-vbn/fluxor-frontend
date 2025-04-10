import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../../controls/button/buttonView";

const Modal = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  mode = "form",
  initialData = {},
}) => {
  const [formData, setFormData] = useState({});

  // Sync formData with initialData when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || {});
    }
  }, [isOpen, initialData]);

  // Handle changes from child inputs
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  if (!isOpen) return null;

  // Enhance children with value and onChange props
  const enhancedChildren =
    mode === "form"
      ? React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.props.name) {
            return React.cloneElement(child, {
              value: formData[child.props.name] ?? "", // Use empty string as fallback
              onChange: (e) => {
                // Handle both direct value and event object cases
                const value =
                  e.target?.value !== undefined ? e.target.value : e;
                handleChange(child.props.name, value);
              },
            });
          }
          return child;
        })
      : children;

  return createPortal(
    <dialog open className="modal modal-open ">
      <div className="modal-box bg-white text-black max-w-xl w-full px-3.5" style={{ borderRadius: '5px' }}>
        <div className="flex justify-between items-center border-b pb-2 mb-4 px-1">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>

        {mode === "form" ? (
          <form onSubmit={handleSubmit} className="px-4">
            <div className="max-h-[60vh] overflow-y-auto scrollbar-hide px-1">
              <div className="grid grid-cols-1 gap-4">
                {enhancedChildren}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
              >
                Submit
              </Button>
            </div>
          </form>
        ) : (
          <div className="px-4">
            <div className="max-h-[60vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 gap-4">
                {enhancedChildren}
              </div>
            </div>
          </div>
        )}
      </div>
      <form method="dialog" className="modal-backdrop bg-black/30">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>,
    document.body
  );
};

export default Modal;