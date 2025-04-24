// import React, { useRef } from "react";

// const FileUpload = ({
//   label,
//   name,
//   value, // Can be a File object or a URL string
//   onChange,
//   accept = "image/*",
//   preview = true,
//   error,
//   className = "",
// }) => {
//   const fileInputRef = useRef(null);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       onChange(file); // Pass the File object to the parent
//     }
//   };

//   // Determine display name for the input field
//   const displayName = value
//     ? value instanceof File
//       ? value.name
//       : typeof value === "string" && value
//       ? value.split("/").pop()
//       : "No file chosen"
//     : "No file chosen";

//   // Generate preview URL
//   const previewUrl =
//     value instanceof File
//       ? URL.createObjectURL(value)
//       : typeof value === "string" && value
//       ? value
//       : null;

//   return (
//     <div className={`space-y-2 ${className}`}>
//       {label && (
//         <label
//           htmlFor={name}
//           className="text-sm font-medium text-gray-700 dark:text-gray-300"
//         >
//           {label}
//         </label>
//       )}
//       <div className="flex items-center space-x-2">
//         {/* Hidden file input */}
//         <input
//           type="file"
//           id={name}
//           name={name}
//           ref={fileInputRef}
//           accept={accept}
//           onChange={handleFileChange}
//           className="hidden"
//         />

//         {/* Fake text input showing file name */}
//         <div
//           className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm text-gray-700 dark:text-gray-100 cursor-pointer"
//           onClick={() => fileInputRef.current.click()}
//         >
//           {displayName}
//         </div>

//         {/* Browse button */}
//         <button
//           type="button"
//           onClick={() => fileInputRef.current.click()}
//           className="px-4 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-500"
//         >
//           Browse
//         </button>
//       </div>

//       {/* Error message */}
//       {error && <p className="text-sm text-red-600">{error}</p>}

//       {/* Optional preview */}
//       {preview && previewUrl && (
//         <div className="mt-2">
//           {accept.includes("image") ? (
//             <img
//               src={previewUrl}
//               alt="Preview"
//               className="w-32 h-32 object-contain rounded border dark:border-gray-600"
//             />
//           ) : accept.includes("video") ? (
//             <video
//               src={previewUrl}
//               controls
//               className="w-32 h-32 object-cover rounded border dark:border-gray-600"
//             />
//           ) : null}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;


import React, { useRef } from "react";

const FileUpload = ({
  label,
  name,
  value, // Can be a File object or a URL string
  onChange,
  accept = "image/*",
  preview = true,
  error,
  className = "",
}) => {
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file); // Pass the File object to the parent
    }
  };

  // Determine display name for the input field
  const displayName = value
    ? value instanceof File
      ? value.name
      : typeof value === "string" && value
      ? value.split("/").pop()
      : "No file chosen"
    : "No file chosen";

  // Generate preview URL
  const previewUrl =
    value instanceof File
      ? URL.createObjectURL(value)
      : typeof value === "string" && value
      ? value
      : null;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-600 dark:text-gray-400"
        >
          {label}
        </label>
      )}
      <div className="flex items-center space-x-2">
        {/* Hidden file input */}
        <input
          type="file"
          id={name}
          name={name}
          ref={fileInputRef}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Fake text input showing file name */}
        <div
          className={`flex-1 bg-white dark:bg-gray-700 border rounded px-3 py-2 text-sm cursor-pointer transition-colors duration-200 ${
            error
              ? "border-red-500 dark:border-red-400 text-red-500 dark:text-red-400"
              : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => fileInputRef.current.click()}
        >
          {displayName}
        </div>

        {/* Browse button */}
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
        >
          Browse
        </button>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}

      {/* Optional preview */}
      {preview && previewUrl && (
        <div className="mt-2">
          {accept.includes("image") ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 object-contain rounded border border-gray-200 dark:border-gray-600"
            />
          ) : accept.includes("video") ? (
            <video
              src={previewUrl}
              controls
              className="w-32 h-32 object-cover rounded border border-gray-200 dark:border-gray-600"
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default FileUpload;