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


import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css"; // Import custom CSS for Quill theming

const RichTextEditor = ({ value, onChange }) => {
  return (
    <div className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
      <ReactQuill value={value} onChange={onChange} theme="snow" />
    </div>
  );
};

export default RichTextEditor;