// components/RichTextEditor.jsx
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-md text-black">
      <ReactQuill value={value} onChange={onChange} theme="snow" />
    </div>
  );
};

export default RichTextEditor;
