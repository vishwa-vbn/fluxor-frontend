import React, { useRef } from "react";

const FileUpload = ({
  label,
  name,
  value,
  onChange,
  accept = "image/*",
  preview = true,
}) => {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onChange({ target: { name, value: file } });
  };

  const displayName = value
    ? value instanceof File
      ? value.name
      : typeof value === "string"
      ? value.split("/").pop()
      : ""
    : "";

  return (
    <div className="space-y-1">
      {label && <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>}
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
          className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
          onClick={() => fileInputRef.current.click()}
        >
          {displayName || "No file chosen"}
        </div>

        {/* Browse button */}
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="btn btn-outline btn-sm"
        >
          Browse
        </button>
      </div>

      {/* Optional image preview */}
      {preview && value && typeof value === "string" && (
        <img
          src={value}
          alt="Preview"
          className="mt-2 w-24 h-24 object-cover rounded border"
        />
      )}
    </div>
  );
};

export default FileUpload;
