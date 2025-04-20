// // import React, { useEffect, useState } from "react";
// // import { createPortal } from "react-dom";
// // import Button from "../../controls/button/buttonView";

// // const Modal = ({
// //   isOpen,
// //   onClose,
// //   title,
// //   onSubmit,
// //   children,
// //   mode = "form",
// //   initialData = {},
// // }) => {
// //   const [formData, setFormData] = useState({});

// //   // Sync formData with initialData when modal opens
// //   useEffect(() => {
// //     if (isOpen) {
// //       setFormData(initialData || {});
// //     }
// //   }, [isOpen, initialData]);

// //   // Handle changes from child inputs
// //   const handleChange = (name, value) => {
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   // Handle form submission
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     onSubmit?.(formData);
// //   };

// //   if (!isOpen) return null;

// //   // Enhance children with value and onChange props
// //   const enhancedChildren =
// //     mode === "form"
// //       ? React.Children.map(children, (child) => {
// //           if (React.isValidElement(child) && child.props.name) {
// //             return React.cloneElement(child, {
// //               value: formData[child.props.name] ?? "",
// //               onChange: (e) => {
// //                 const value =
// //                   e.target?.value !== undefined ? e.target.value : e;
// //                 handleChange(child.props.name, value);
// //               },
// //             });
// //           }
// //           return child;
// //         })
// //       : children;

// //   // Render view content without separators
// //   const renderViewContent = () =>
// //     React.Children.map(enhancedChildren, (child, index) => {
// //       if (React.isValidElement(child)) {
// //         const isLink = child.props.href; // Detect if it's a link (e.g., Post title)
// //         return (
// //           <div key={index} className="mb-2 last:mb-0">
// //             {React.cloneElement(child, {
// //               className: `${child.props.className || ""} ${
// //                 isLink ? "text-blue-600 hover:underline" : ""
// //               }`,
// //             })}
// //           </div>
// //         );
// //       }
// //       return child;
// //     });

// //   return createPortal(
// //     <dialog open className="modal modal-open">
// //       <div
// //         className="modal-box bg-white text-black max-w-lg w-full px-4 py-3"
// //         style={{ borderRadius: "4px" }}
// //       >
// //         <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-3">
// //           <h3 className="text-lg font-medium">{title}</h3>
// //           <button
// //             onClick={onClose}
// //             className="btn btn-sm btn-circle btn-ghost hover:bg-gray-100"
// //           >
// //             ✕
// //           </button>
// //         </div>

// //         {mode === "form" ? (
// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
// //               <div className="grid grid-cols-1 gap-4">{enhancedChildren}</div>
// //             </div>
// //             <div className="mt-4 pt-2 border-t border-gray-300 flex justify-end gap-2">
// //               <Button
// //                 type="button"
// //                 variant="outline"
// //                 size="md"
// //                 onClick={onClose}
// //                 className="hover:bg-gray-100"
// //               >
// //                 Cancel
// //               </Button>
// //               <Button type="submit" variant="primary" size="md">
// //                 Submit
// //               </Button>
// //             </div>
// //           </form>
// //         ) : (
// //           <div className="space-y-2">
// //             <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
// //               {renderViewContent()}
// //             </div>
// //             <div className="mt-4 pt-2 border-t border-gray-300 flex justify-end">
// //               <Button
// //                 type="button"
// //                 variant="outline"
// //                 size="md"
// //                 onClick={onClose}
// //                 className="hover:bg-gray-100"
// //               >
// //                 Close
// //               </Button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //       <form method="dialog" className="modal-backdrop bg-black/30">
// //         <button onClick={onClose}>close</button>
// //       </form>
// //     </dialog>,
// //     document.body
// //   );
// // };

// // export default Modal;


// import React, { useEffect, useState, useMemo } from "react";
// import { createPortal } from "react-dom";
// import Button from "../../controls/button/buttonView";

// const Modal = ({
//   isOpen,
//   onClose,
//   title,
//   onSubmit,
//   children,
//   mode = "form",
//   initialData = {},
// }) => {
//   const [formData, setFormData] = useState({});

//   // Memoize initialData to ensure stable reference
//   const stableInitialData = useMemo(() => initialData || {}, [initialData]);

//   // Sync formData with stableInitialData when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       setFormData(stableInitialData);
//     }
//   }, [isOpen, stableInitialData]);

//   // Handle changes from child inputs
//   const handleChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit?.(formData);
//   };

//   if (!isOpen) return null;

//   // Enhance children with value and onChange props
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

//   // Render view content without separators
//   const renderViewContent = () =>
//     React.Children.map(enhancedChildren, (child, index) => {
//       if (React.isValidElement(child)) {
//         const isLink = child.props.href; // Detect if it's a link (e.g., Post title)
//         return (
//           <div key={index} className="mb-2 last:mb-0">
//             {React.cloneElement(child, {
//               className: `${child.props.className || ""} ${
//                 isLink ? "text-blue-600 hover:underline" : ""
//               }`,
//             })}
//           </div>
//         );
//       }
//       return child;
//     });

//   return createPortal(
//     <dialog open className="modal modal-open">
//       <div
//         className="modal-box bg-white text-black max-w-lg w-full px-4 py-3"
//         style={{ borderRadius: "4px" }}
//       >
//         <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-3">
//           <h3 className="text-lg font-medium">{title}</h3>
//           <button
//             onClick={onClose}
//             className="btn btn-sm btn-circle btn-ghost hover:bg-grey-100"
//           >
//             ✕
//           </button>
//         </div>

//         {mode === "form" ? (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
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
//               <Button type="submit" variant="primary" size="md">
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
//         <button onClick={onClose}>close</button>
//       </form>
//     </dialog>,
//     document.body
//   );
// };

// export default Modal;

import React, { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Button from '../../controls/button/buttonView';
import './modalStyles.css';

const Modal = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  mode = 'form',
  initialData = {},
  size = 'medium',
}) => {
  const [formData, setFormData] = useState({});
  const stableInitialData = useMemo(() => initialData || {}, [initialData]);

  useEffect(() => {
    if (isOpen) {
      setFormData(stableInitialData);
    }
  }, [isOpen, stableInitialData]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  if (!isOpen) return null;

  const enhancedChildren =
    mode === 'form'
      ? React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.props.name) {
            return React.cloneElement(child, {
              value: formData[child.props.name] ?? '',
              onChange: (e) => {
                const value = e.target?.value !== undefined ? e.target.value : e;
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
              className: `${child.props.className || ''} ${
                isLink ? 'text-blue-600 hover:underline' : ''
              }`,
            })}
          </div>
        );
      }
      return child;
    });

  const sizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-lg',
    lg: 'max-w-2xl',
  }[size] || 'max-w-lg';

  return createPortal(
    <dialog open className="modal modal-open">
      <div className={`modal-box bg-white text-black ${sizeClasses} w-full px-4 py-3`} style={{ borderRadius: '4px' }}>
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-3">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost hover:bg-gray-100">
            ✕
          </button>
        </div>
        {mode === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-1 gap-4">{enhancedChildren}</div>
            </div>
            <div className="mt-4 pt-2 border-t border-gray-300 flex justify-end gap-2">
              <Button type="button" variant="outline" size="md" onClick={onClose} className="hover:bg-gray-100">
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md">
                Submit
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-2">
            <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
              {renderViewContent()}
            </div>
            <div className="mt-4 pt-2 border-t border-gray-300 flex justify-end">
              <Button type="button" variant="outline" size="md" onClick={onClose} className="hover:bg-gray-100">
                Close
              </Button>
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