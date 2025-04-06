import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../../controls/button/buttonView';

const Modal = ({ isOpen, onClose, title, onSubmit, children, mode = "form", initialData = {} }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };


  
  if (!isOpen) return null;

  const enhancedChildren = mode === "form"
    ? React.Children.map(children, child => {
        if (React.isValidElement(child) && child.props.name) {
          return React.cloneElement(child, {
            value: formData[child.props.name] || '',
            onChange: (val) => handleChange(child.props.name, val),
          });
        }
        return child;
      })
    : children;

    return createPortal(
        <dialog open className="modal modal-open">
          <div className="modal-box bg-white text-black max-w-xl w-full">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-lg font-bold">{title}</h3>
              <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">✕</button>
            </div>
    
            {mode === "form" ? (
              <form onSubmit={handleSubmit} className="space-y-4 overflow-visible">
                {enhancedChildren}
                <div className="modal-action">
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <button type="button" className="btn" onClick={onClose}>Cancel</button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">{enhancedChildren}</div>
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
