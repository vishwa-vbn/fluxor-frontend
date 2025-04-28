// // components/RichTextEditor.jsx
// import React from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const RichTextEditor = ({ value, onChange }) => {
//   return (
//     <div className="bg-white border border-gray-300 rounded-md text-black">
//       <ReactQuill value={value} onChange={onChange} theme="snow" />
//     </div>
//   );
// };

// export default RichTextEditor;

import React, { useMemo, useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css"; // Custom CSS for Quill theming
import { useDispatch } from "react-redux";
import { uploadFile } from "../../../store/file/fileActions"; // Import uploadFile action

// Optional: Add image resize module
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/imageResize", ImageResize);

const RichTextEditor = ({ value, onChange, placeholder = "Write something..." }) => {
  const dispatch = useDispatch();
  const quillRef = useRef(null); // Reference to Quill editor
  const fileInputRef = useRef(null); // Reference to hidden file input

  // Custom image handler for the toolbar
  const imageHandler = () => {
    // Trigger file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection and upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type (optional)
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // Create FormData for upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name); // Use original filename

    try {
      // Dispatch uploadFile action and wait for response
      const result = await dispatch(uploadFile(formData));

      // Access the secure_url from the fulfilled action payload
      const secureUrl = result.payload?.url;

      if (secureUrl) {
        // Insert the image URL into the editor
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true); // Get current cursor position
        quill.insertEmbed(range.index, "image", secureUrl); // Insert image
        quill.setSelection(range.index + 1); // Move cursor after image
      } else {
        throw new Error("No URL returned from upload.");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try again.");
    }

    // Reset file input
    event.target.value = "";
  };

  // Define toolbar options
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", { image: imageHandler }, "video"], // Custom image handler
    ["clean"],
  ];

  // Quill modules configuration
  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: imageHandler, // Bind custom image handler
        },
      },
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  // Quill formats configuration
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "font",
    "size",
    "align",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "script",
    "indent",
    "link",
    "image",
    "video",
  ];

  // Add ref to Quill editor on mount
  useEffect(() => {
    if (quillRef.current) {
      // Ensure quillRef is set to the Quill instance
      quillRef.current = quillRef.current;
    }
  }, []);

  return (
    <div className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
      {/* Hidden file input for image selection */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={onChange}
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;