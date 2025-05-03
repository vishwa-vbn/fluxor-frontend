// import React, { useEffect, useState, useMemo } from 'react';
// import { createPortal } from 'react-dom';
// import Button from '../../controls/button/buttonView';
// import './modalStyles.css';
// import PropTypes from 'prop-types';
// import isEqual from 'lodash/isEqual'; // For deep comparison

// const Modal = ({
//   isOpen,
//   onClose,
//   title,
//   onSubmit,
//   children,
//   mode = 'form',
//   initialData = {},
//   size = 'medium',
// }) => {
//   const [formData, setFormData] = useState({});

//   // Memoize initialData with deep comparison
//   const stableInitialData = useMemo(() => initialData || {}, [
//     JSON.stringify(initialData), // Deep comparison via stringification
//   ]);

//   // Sync formData with stableInitialData when modal opens
//   useEffect(() => {
//     if (isOpen && !isEqual(formData, stableInitialData)) {
//       setFormData(stableInitialData);
//     }
//   }, [isOpen, stableInitialData, formData]);

//   // Handle changes from child inputs
//   const handleChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit?.(formData);
//   };

//   // Early return if modal is not open
//   if (!isOpen) return null;

//   // Enhance children with value and onChange props for form mode
//   const enhancedChildren =
//     mode === 'form'
//       ? React.Children.map(children, (child) => {
//           if (React.isValidElement(child) && child.props.name) {
//             return React.cloneElement(child, {
//               value: formData[child.props.name] ?? '',
//               onChange: (e) => {
//                 const value = e.target?.value !== undefined ? e.target.value : e;
//                 handleChange(child.props.name, value);
//               },
//             });
//           }
//           return child;
//         })
//       : children;

//   // Render view content for view mode (e.g., AdPreview)
//   const renderViewContent = () =>
//     React.Children.map(enhancedChildren, (child, index) => {
//       if (React.isValidElement(child)) {
//         const isLink = child.props.href;
//         return (
//           <div key={index} className="mb-2 last:mb-0">
//             {React.cloneElement(child, {
//               className: `${child.props.className || ''} ${
//                 isLink ? 'text-blue-600 hover:underline' : ''
//               }`,
//             })}
//           </div>
//         );
//       }
//       return child;
//     });

//   // Define size classes for modal
//   const sizeClasses = {
//     small: 'max-w-sm',
//     medium: 'max-w-lg',
//     large: 'max-w-2xl',
//   }[size] || 'max-w-lg';

//   return createPortal(
//     <dialog
//       open
//       className="modal modal-open"
//       role="dialog"
//       aria-labelledby="modal-title"
//       aria-modal="true"
//     >
//       <div
//         className={`modal-box bg-white text-black ${sizeClasses} w-full px-4 py-3`}
//         style={{ borderRadius: '4px' }}
//       >
//         <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-3">
//           <h3 id="modal-title" className="text-lg font-medium">
//             {title}
//           </h3>
//           <button
//             onClick={onClose}
//             className="btn btn-sm btn-circle btn-ghost hover:bg-gray-100"
//             aria-label="Close modal"
//           >
//             ✕
//           </button>
//         </div>
//         {mode === 'form' ? (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
//               <div className="grid grid-cols-1 gap-4">{enhancedChildren}</div>
//             </div>
//             <div className="mt-4 pt-2 border-t border-gray-300 flex justify-end gap-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="md"
//                 onClick={onClose}
//                 className="hover:bg-gray-100"
//               >
//                 Cancel
//               </Button>
//               <Button type="submit"variant="outline" size="md">
//                 Submit
//               </Button>
//             </div>
//           </form>
//         ) : (
//           <div className="space-y-2">
//             <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
//               {renderViewContent()}
//             </div>
//             <div className="mt-4 pt-2 border-t border-gray-300 flex justify-end">
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="md"
//                 onClick={onClose}
//                 className="hover:bg-gray-100"
//               >
//                 Close
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//       <form method="dialog" className="modal-backdrop bg-black/30">
//         <button onClick={onClose} aria-label="Close modal by clicking backdrop">
//           close
//         </button>
//       </form>
//     </dialog>,
//     document.body
//   );
// };

// Modal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   title: PropTypes.string,
//   onSubmit: PropTypes.func,
//   children: PropTypes.node,
//   mode: PropTypes.oneOf(['form', 'view']),
//   initialData: PropTypes.object,
//   size: PropTypes.oneOf(['small', 'medium', 'large']),
// };

// export default Modal;




// import React, { useEffect, useState, useMemo } from "react";
// import { createPortal } from "react-dom";
// import Button from "../../controls/button/buttonView";
// import "./modalStyles.css";
// import PropTypes from "prop-types";
// import isEqual from "lodash/isEqual";

// const Modal = ({
//   isOpen,
//   onClose,
//   title,
//   onSubmit,
//   children,
//   mode = "form",
//   initialData = {},
//   size = "medium",
//   className = "", // Added to allow custom classes from parent
// }) => {
//   const [formData, setFormData] = useState({});

//   const stableInitialData = useMemo(
//     () => initialData || {},
//     [JSON.stringify(initialData)]
//   );

//   useEffect(() => {
//     if (isOpen && !isEqual(formData, stableInitialData)) {
//       setFormData(stableInitialData);
//     }
//   }, [isOpen, stableInitialData, formData]);

//   const handleChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit?.(formData);
//   };

//   if (!isOpen) return null;

//   const enhancedChildren =
//     mode === "form"
//       ? React.Children.map(children, (child) => {
//           if (React.isValidElement(child) && child.props.name) {
//             return React.cloneElement(child, {
//               value: formData[child.props.name] ?? "",
//               onChange: (e) => {
//                 const value =
//                   e.target?.value !== undefined ? e.target.value : e;
//                 handleChange(child.props.name, value);
//               },
//             });
//           }
//           return child;
//         })
//       : children;

//   const renderViewContent = () =>
//     React.Children.map(enhancedChildren, (child, index) => {
//       if (React.isValidElement(child)) {
//         const isLink = child.props.href;
//         return (
//           <div key={index} className="mb-2 last:mb-0">
//             {React.cloneElement(child, {
//               className: `${child.props.className || ""} ${
//                 isLink ? "text-blue-600 dark:text-blue-400 hover:underline" : ""
//               }`,
//             })}
//           </div>
//         );
//       }
//       return child;
//     });

//   const sizeClasses =
//     {
//       small: "max-w-sm",
//       medium: "max-w-lg",
//       large: "max-w-2xl",
//     }[size] || "max-w-lg";

//   return createPortal(
//     <dialog
//       open
//       className="modal modal-open"
//       role="dialog"
//       aria-labelledby="modal-title"
//       aria-modal="true"
//     >
//       <div
//         className={`modal-box bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${sizeClasses} w-full px-4 py-3 ${className}`}
//         style={{ borderRadius: "4px" }}
//       >
//         <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-600 pb-2 mb-3">
//           <h3 id="modal-title" className="text-lg font-medium">
//             {title}
//           </h3>
//           <button
//             onClick={onClose}
//             className="btn btn-sm btn-circle btn-ghost hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
//             aria-label="Close modal"
//           >
//             ✕
//           </button>
//         </div>
//         {mode === "form" ? (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
//               <div className="grid grid-cols-1 gap-4 p-1">{enhancedChildren}</div>
//             </div>
//             <div className="mt-4 pt-2 border-t border-gray-300 dark:border-gray-600 flex justify-end gap-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="md"
//                 onClick={onClose}
//                 className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 variant="outline"
//                 size="md"
//                 className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
//               >
//                 Submit
//               </Button>
//             </div>
//           </form>
//         ) : (
//           <div className="space-y-2">
//             <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800 pr-2">
//               {renderViewContent()}
//             </div>
//             <div className="mt-4 pt-2 border-t border-gray-300 dark:border-gray-600 flex justify-end">
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="md"
//                 onClick={onClose}
//                 className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 Close
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//       <form
//         method="dialog"
//         className="modal-backdrop bg-black/30 dark:bg-black/50"
//       >
//         <button onClick={onClose} aria-label="Close modal by clicking backdrop">
//           close
//         </button>
//       </form>
//     </dialog>,
//     document.body
//   );
// };

// Modal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   title: PropTypes.string,
//   onSubmit: PropTypes.func,
//   children: PropTypes.node,
//   mode: PropTypes.oneOf(["form", "view"]),
//   initialData: PropTypes.object,
//   size: PropTypes.oneOf(["small", "medium", "large"]),
//   className: PropTypes.string,
// };

// export default Modal;


import React, { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import Button from "../../controls/button/buttonView";
import "./modalStyles.css";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";

const Modal = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  mode = "form",
  initialData = {},
  size = "medium",
  className = "",
}) => {
  const [formData, setFormData] = useState({});

  const stableInitialData = useMemo(
    () => initialData || {},
    [JSON.stringify(initialData)]
  );

  useEffect(() => {
    if (isOpen && !isEqual(formData, stableInitialData)) {
      setFormData(stableInitialData);
    }
  }, [isOpen, stableInitialData]);

  const handleChange = (name, value) => {
    // Handle both event objects and direct values
    const extractedValue = value && value.target ? value.target.value : value;
    setFormData((prev) => ({ ...prev, [name]: extractedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  if (!isOpen) return null;

  const enhancedChildren =
    mode === "form"
      ? React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.props.name) {
            return React.cloneElement(child, {
              value: formData[child.props.name] ?? "",
              onChange: (value) => {
                handleChange(child.props.name, value);
              },
            });
          }
          return child;
        })
      : children;

  const renderViewContent = () =>
    React.Children.map(enhancedChildren, (child, index) => {
      if (React.isValidElement(child)) {
        const isLink = child.props.href;
        return (
          <div key={index} className="mb-2 last:mb-0">
            {React.cloneElement(child, {
              className: `${child.props.className || ""} ${
                isLink ? "text-blue-600 dark:text-blue-400 hover:underline" : ""
              }`,
            })}
          </div>
        );
      }
      return child;
    });

  const sizeClasses =
    {
      small: "max-w-sm",
      medium: "max-w-lg",
      large: "max-w-2xl",
    }[size] || "max-w-lg";

  return createPortal(
    <dialog
      open
      className="modal modal-open"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div
        className={`modal-box bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${sizeClasses} w-full px-4 py-3 ${className}`}
        style={{ borderRadius: "4px" }}
      >
        <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-600 pb-2 mb-3">
          <h3 id="modal-title" className="text-lg font-medium">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        {mode === "form" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
              <div className="grid grid-cols-1 gap-4 p-1">{enhancedChildren}</div>
            </div>
            <div className="mt-4 pt-2 border-t border-gray-300 dark:border-gray-600 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={onClose}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outline"
                size="md"
                className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
              >
                Submit
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-2">
            <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800 pr-2">
              {renderViewContent()}
            </div>
            <div className="mt-4 pt-2 border-t border-gray-300 dark:border-gray-600 flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={onClose}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
      <form
        method="dialog"
        className="modal-backdrop bg-black/30 dark:bg-black/50"
      >
        <button onClick={onClose} aria-label="Close modal by clicking backdrop">
          close
        </button>
      </form>
    </dialog>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
  mode: PropTypes.oneOf(["form", "view"]),
  initialData: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  className: PropTypes.string,
};

export default Modal;