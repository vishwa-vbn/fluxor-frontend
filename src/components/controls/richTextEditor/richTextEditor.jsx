// // export default RichTextEditor;
// import React, { useMemo, useRef, useEffect } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "./RichTextEditor.css";
// import { uploadFile } from "../../../store/file/fileActions";
// import ImageResize from "quill-image-resize-module-react";

// Quill.register("modules/imageResize", ImageResize);

// const RichTextEditor = ({
//   value,
//   onChange,
//   placeholder = "Write something...",
//   uploadFile,
//   fileState, // Mapped from Redux state
// }) => {
//   const quillRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const previousAssetsLength = useRef(fileState.assets.length); // Track assets length

//   // Log file state for debugging
//   useEffect(() => {
//     console.log("File State:", fileState);
//   }, [fileState]);

//   // Detect new file upload and insert image URL
//   useEffect(() => {
//     if (
//       fileState.assets.length > previousAssetsLength.current &&
//       !fileState.loading
//     ) {
//       const latestAsset = fileState.assets[fileState.assets.length - 1];
//       const imageUrl = latestAsset?.url; // Use 'url' instead of 'secure_url'

//       if (imageUrl && quillRef.current) {
//         const quill = quillRef.current.getEditor();
//         // Get the current cursor position, fallback to end of content
//         let range = quill.getSelection(true) || { index: quill.getLength() };
//         console.log("Inserting image at position:", range.index);
//         quill.insertEmbed(range.index, "image", imageUrl);
//         quill.setSelection(range.index + 1); // Move cursor after image
//       } else if (!imageUrl) {
//         console.error("No URL found in latest asset:", latestAsset);
//       }

//       previousAssetsLength.current = fileState.assets.length;
//     }
//   }, [fileState.assets, fileState.loading]);

//   const imageHandler = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       alert("Please select an image file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("fileName", file.name);

//     // Log FormData entries
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }

//     try {
//       await uploadFile(formData); // Dispatch upload action
//       // No need to handle result here; useEffect will handle the new URL
//     } catch (error) {
//       console.error("Image upload failed:", error);
//       alert("Failed to upload image. Please try again.");
//     }

//     event.target.value = "";
//   };

//   const toolbarOptions = [
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],
//     ["bold", "italic", "underline", "strike"],
//     [{ color: [] }, { background: [] }],
//     [{ font: [] }],
//     [{ size: ["small", false, "large", "huge"] }],
//     [{ align: [] }],
//     ["blockquote", "code-block"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ script: "sub" }, { script: "super" }],
//     [{ indent: "-1" }, { indent: "+1" }],
//     ["link", { image: imageHandler }, "video"],
//     ["clean"],
//   ];

//   const modules = useMemo(
//     () => ({
//       toolbar: {
//         container: toolbarOptions,
//         handlers: {
//           image: imageHandler,
//         },
//       },
//       imageResize: {
//         parchment: Quill.import("parchment"),
//         modules: ["Resize", "DisplaySize", "Toolbar"],
//       },
//       clipboard: {
//         matchVisual: false,
//       },
//     }),
//     []
//   );

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "color",
//     "background",
//     "font",
//     "size",
//     "align",
//     "blockquote",
//     "code-block",
//     "list",
//     "bullet",
//     "script",
//     "indent",
//     "link",
//     "image",
//     "video",
//   ];

//   return (
//     <div className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         accept="image/*"
//         onChange={handleFileChange}
//       />
//       <ReactQuill
//         ref={quillRef}
//         value={value}
//         onChange={onChange}
//         theme="snow"
//         modules={modules}
//         formats={formats}
//         placeholder={placeholder}
//       />
//     </div>
//   );
// };

// // Map Redux state to props
// const mapStateToProps = (state) => ({
//   fileState: state.file, // Access file reducer state
// });

// // Map dispatch to props with bindActionCreators
// const mapDispatchToProps = (dispatch) => ({
//   ...bindActionCreators(
//     {
//       uploadFile,
//     },
//     dispatch
//   ),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(RichTextEditor);

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import JoditEditor, { Jodit } from "jodit-react";
// import { uploadFile } from "../../../store/file/fileActions";

// class RichTextEditor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       content: props.value || "",
//       pos: 0,
//     };
//     this.jodit = null;
//   }

//   componentDidUpdate(prevProps) {
//     // Detect changes in fileState.assets to insert images or files
//     if (
//       this.props.fileState.assets.length !== prevProps.fileState.assets.length &&
//       !this.props.fileState.loading
//     ) {
//       this.insertFiles();
//     }
//     // Sync content if props.value changes externally
//     if (this.props.value !== prevProps.value && this.props.value !== this.state.content) {
//       this.setState({ content: this.cleanContent(this.props.value) });
//     }
//   }

//   // Clean up content to remove unwanted inline styles, preserving image dimensions
//   cleanContent = (content) => {
//     const div = document.createElement("div");
//     div.innerHTML = content;

//     const elements = div.querySelectorAll("*");
//     elements.forEach((el) => {
//       // Skip images to preserve width and height
//       if (el.tagName.toLowerCase() === "img") return;
//       if (el.style.color) el.style.removeProperty("color");
//       if (el.style.opacity) el.style.removeProperty("opacity");
//       if (el.style.backgroundColor) el.style.removeProperty("background-color");
//     });

//     return div.innerHTML;
//   };

//   // Update content and store cursor position
//   updateContent = (value) => {
//     const cleanedContent = this.cleanContent(value);
//     this.setState({
//       content: cleanedContent,
//       pos: window.getSelection() && window.getSelection().getRangeAt(0) ? window.getSelection().getRangeAt(0).startOffset : this.state.pos,
//     });
//     this.props.onChange(cleanedContent);
//   };

//   // Insert images or files based on fileState.assets
//   insertFiles = () => {
//     const { fileState } = this.props;
//     if (fileState.assets && fileState.assets.length > 0) {
//       const latestAsset = fileState.assets[fileState.assets.length - 1];
//       const fileUrl = latestAsset?.url;
//       const fileName = latestAsset?.name || "Uploaded File";

//       // Robust file type detection
//       let fileType = "";
//       if (latestAsset?.type) {
//         fileType = latestAsset.type.includes("/")
//           ? latestAsset.type.split("/")[1].toLowerCase()
//           : latestAsset.type.toLowerCase();
//       }
//       // Prioritize file name parsing
//       if (!fileType && fileName) {
//         const nameParts = fileName.split(".");
//         fileType = nameParts.length > 1 ? nameParts.pop().toLowerCase() : "";
//       }
//       // Fallback to URL parsing
//       if (!fileType && fileUrl) {
//         const urlParts = fileUrl.split(".");
//         fileType = urlParts.length > 1 ? urlParts.pop().toLowerCase() : "";
//       }
//       if (fileType === "jpeg") fileType = "jpg";

//       console.log("Latest Asset:", JSON.stringify(latestAsset, null, 2));
//       console.log("File URL:", fileUrl);
//       console.log("File Name:", fileName);
//       console.log("Detected File Type:", fileType);
//       console.log("Is Image:", ["jpg", "png", "jpeg", "gif"].includes(fileType));

//       if (fileUrl && this.jodit) {
//         const imageExtensions = ["jpg", "png", "jpeg", "gif"];
//         if (
//           imageExtensions.includes(fileType) ||
//           (fileName && imageExtensions.some((ext) => fileName.toLowerCase().endsWith(`.${ext}`)))
//         ) {
//           console.log("Inserting image at cursor:", fileUrl);
//           this.jodit.selection.insertHTML(
//             `<img src="${fileUrl}" alt="${fileName}" />`
//           );
//         } else {
//           console.log("Inserting link for non-image at cursor:", fileUrl);
//           this.jodit.selection.insertHTML(
//             `<a href="${fileUrl}" target="_blank" style="color: #0000EE; text-decoration: underline;">${fileName}</a>`
//           );
//         }
//       } else {
//         console.error("Invalid fileUrl or jodit instance:", {
//           fileUrl,
//           jodit: !!this.jodit,
//         });
//         this.jodit?.message.error("Failed to insert file");
//       }
//     }
//   };

//   setRef = (jodit) => {
//     this.jodit = jodit;
//   };

//   config = {
//     zIndex: 0,
//     readonly: false,
//     activeButtonsInReadOnly: ["source", "fullsize", "print", "about"],
//     toolbarButtonSize: "middle",
//     theme: "default",
//     spellcheck: true,
//     width: "auto",
//     height: "auto",
//     minHeight: 100,
//     language: "en",
//     tabIndex: -1,
//     toolbar: true,
//     enter: "P",
//     defaultMode: Jodit.MODE_WYSIWYG,
//     style: {
//       color: "#000000",
//       background: "#ffffff",
//     },
//     askBeforePasteHTML: true,
//     askBeforePasteFromWord: true,
//     defaultActionOnPaste: "insert_clear_html",
//     buttons: [
//       "source",
//       "|",
//       "bold",
//       "strikethrough",
//       "underline",
//       "italic",
//       "|",
//       "ul",
//       "ol",
//       "|",
//       "outdent",
//       "indent",
//       "|",
//       "font",
//       "fontsize",
//       "brush",
//       "paragraph",
//       "|",
//       {
//         name: "image",
//         icon: "image",
//         tooltip: "Insert Image",
//         exec: (editor) => {
//           const input = document.createElement("input");
//           input.type = "file";
//           input.accept = "image/*";
//           input.onchange = async (e) => {
//             const file = e.target.files[0];
//             if (file) {
//               const formData = new FormData();
//               formData.append("file", file);
//               formData.append("fileName", file.name);

//               try {
//                 await this.props.uploadFile(formData);
//               } catch (error) {
//                 console.error("Image upload failed:", error);
//                 editor.message.error("Image upload failed");
//               }
//             }
//           };
//           input.click();
//         },
//       },
//       "video",
//       "table",
//       "link",
//       "|",
//       "align",
//       "undo",
//       "redo",
//       "|",
//       "hr",
//       "eraser",
//       "copyformat",
//       "|",
//       "print",
//       "|",
//       {
//         name: "uploadFile",
//         icon: "upload",
//         tooltip: "Upload File",
//         exec: (editor) => {
//           const input = document.createElement("input");
//           input.type = "file";
//           input.accept = ".jpg,.png,.jpeg,.gif,.pdf,.doc,.docx";
//           input.onchange = async (e) => {
//             const file = e.target.files[0];
//             if (file) {
//               const formData = new FormData();
//               formData.append("file", file);
//               formData.append("fileName", file.name);

//               try {
//                 await this.props.uploadFile(formData);
//               } catch (error) {
//                 console.error("File upload failed:", error);
//                 editor.message.error("File upload failed");
//               }
//             }
//           };
//           input.click();
//         },
//       },
//     ],
//     buttonsXS: [
//       "bold",
//       "|",
//       "brush",
//       "paragraph",
//       "|",
//       "align",
//       "|",
//       "undo",
//       "redo",
//       "|",
//       "eraser",
//       "|",
//       "uploadFile",
//     ],
//     uploader: {
//       insertImageAsBase64URI: false,
//       imagesExtensions: ["jpg", "png", "jpeg", "gif"],
//       url: "",
//       format: "json",
//       method: "POST",
//       prepareData: (formData) => {
//         formData.append("fileName", formData.get("files[0]").name);
//         return formData;
//       },
//       files: async (files) => {
//         const file = files[0];
//         if (!file) return [];

//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("fileName", file.name);

//         try {
//           await this.props.uploadFile(formData);
//           return [];
//         } catch (error) {
//           console.error("Image upload failed:", error);
//           return [];
//         }
//       },
//       isSuccess: () => true,
//       getMsg: (resp) => resp.msg || "Upload successful",
//       process: (resp) => ({
//         files: [resp.url],
//         path: resp.url,
//         baseurl: "",
//       }),
//     },
//     events: {
//       afterInit: (instance) => {
//         console.log("Editor initialized:", !!instance);
//         this.jodit = instance;
//       },
//       beforePaste: (e) => {
//         if (e.clipboardData) {
//           const content =
//             e.clipboardData.getData("text/html") ||
//             e.clipboardData.getData("text/plain");
//           return this.cleanContent(content);
//         }
//         return e;
//       },
//     },
//   };

//   render() {
//     const { isLoading } = this.props;
//     const { content } = this.state;

//     if (isLoading) {
//       return <div className="text-center p-4">Loading editor...</div>;
//     }

//     return (
//       <div className="w-full">
//         <JoditEditor
//           ref={this.setRef}
//           value={content}
//           config={this.config}
//           tabIndex={1}
//           onBlur={(newContent) => this.updateContent(newContent)}
//           onChange={(newContent) => this.updateContent(newContent)}
//         />
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   fileState: state.file,
//   isLoading: state.editor?.isLoading || false,
// });

// const mapDispatchToProps = (dispatch) => ({
//   ...bindActionCreators({ uploadFile }, dispatch),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(RichTextEditor);

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import JoditEditor, { Jodit } from "jodit-react";
import { uploadFile } from "../../../store/file/fileActions";

class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.value || "",
      pos: 0,
    };
    this.jodit = null;
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.fileState.assets.length !== prevProps.fileState.assets.length &&
      !this.props.fileState.loading
    ) {
      this.insertFiles();
    }
    if (this.props.value !== prevProps.value && this.props.value !== this.state.content) {
      this.setState({ content: this.cleanContent(this.props.value) });
    }
  }

  cleanContent = (content) => {
    const div = document.createElement("div");
    div.innerHTML = content;

    const elements = div.querySelectorAll("*");
    elements.forEach((el) => {
      if (el.tagName.toLowerCase() === "img") return;
      if (el.style.color) el.style.removeProperty("color");
      if (el.style.opacity) el.style.removeProperty("opacity");
      if (el.style.backgroundColor) el.style.removeProperty("background-color");
    });

    return div.innerHTML;
  };

  updateContent = (value) => {
    const cleanedContent = this.cleanContent(value);
    this.setState({
      content: cleanedContent,
      pos: window.getSelection() && window.getSelection().getRangeAt(0) ? window.getSelection().getRangeAt(0).startOffset : this.state.pos,
    });
    this.props.onChange(cleanedContent);
  };

  insertFiles = () => {
    const { fileState } = this.props;
    if (fileState.assets && fileState.assets.length > 0) {
      const latestAsset = fileState.assets[fileState.assets.length - 1];
      const fileUrl = latestAsset?.url;
      const fileName = latestAsset?.name || "Uploaded File";

      let fileType = "";
      if (latestAsset?.type) {
        fileType = latestAsset.type.includes("/")
          ? latestAsset.type.split("/")[1].toLowerCase()
          : latestAsset.type.toLowerCase();
      }
      if (!fileType && fileName) {
        const nameParts = fileName.split(".");
        fileType = nameParts.length > 1 ? nameParts.pop().toLowerCase() : "";
      }
      if (!fileType && fileUrl) {
        const urlParts = fileUrl.split(".");
        fileType = urlParts.length > 1 ? urlParts.pop().toLowerCase() : "";
      }
      if (fileType === "jpeg") fileType = "jpg";

      if (fileUrl && this.jodit) {
        const imageExtensions = ["jpg", "png", "jpeg", "gif"];
        if (
          imageExtensions.includes(fileType) ||
          (fileName && imageExtensions.some((ext) => fileName.toLowerCase().endsWith(`.${ext}`)))
        ) {
          this.jodit.selection.insertHTML(
            `<img src="${fileUrl}" alt="${fileName}" class="draggable-image" draggable="true" />`
          );
        } else {
          this.jodit.selection.insertHTML(
            `<a href="${fileUrl}" target="_blank" style="color: #0000EE; text-decoration: underline;">${fileName}</a>`
          );
        }
      } else {
        console.error("Invalid fileUrl or jodit instance:", {
          fileUrl,
          jodit: !!this.jodit,
        });
        this.jodit?.message.error("Failed to insert file");
      }
    }
  };

  setRef = (jodit) => {
    this.jodit = jodit;
  };

  config = {
    zIndex: 0,
    readonly: false,
    activeButtonsInReadOnly: ["source", "fullsize", "print", "about"],
    toolbarButtonSize: "middle",
    theme: "default",
    spellcheck: true,
    width: "auto",
    height: "auto",
    minHeight: 100,
    language: "en",
    tabIndex: -1,
    toolbar: true,
    enter: "P",
    defaultMode: Jodit.MODE_WYSIWYG,
    style: {
      color: "#000000",
      background: "#ffffff",
    },
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    defaultActionOnPaste: "insert_clear_html",
    buttons: [
      "source",
      "|",
      "bold",
      "strikethrough",
      "underline",
      "italic",
      "|",
      "ul",
      "ol",
      "|",
      "outdent",
      "indent",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      {
        name: "image",
        icon: "image",
        tooltip: "Insert Image",
        exec: (editor) => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
              const formData = new FormData();
              formData.append("file", file);
              formData.append("fileName", file.name);

              try {
                await this.props.uploadFile(formData);
              } catch (error) {
                console.error("Image upload failed:", error);
                editor.message.error("Image upload failed");
              }
            }
          };
          input.click();
        },
      },
      "video",
      "table",
      "link",
      "|",
      "align",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "copyformat",
      "|",
      "print",
      "|",
      {
        name: "uploadFile",
        icon: "upload",
        tooltip: "Upload File",
        exec: (editor) => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = ".jpg,.png,.jpeg,.gif,.pdf,.doc,.docx";
          input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
              const formData = new FormData();
              formData.append("file", file);
              formData.append("fileName", file.name);

              try {
                await this.props.uploadFile(formData);
              } catch (error) {
                console.error("File upload failed:", error);
                editor.message.error("File upload failed");
              }
            }
          };
          input.click();
        },
      },
    ],
    buttonsXS: [
      "bold",
      "|",
      "brush",
      "paragraph",
      "|",
      "align",
      "|",
      "undo",
      "redo",
      "|",
      "eraser",
      "|",
      "uploadFile",
    ],
    uploader: {
      insertImageAsBase64URI: false,
      imagesExtensions: ["jpg", "png", "jpeg", "gif"],
      url: "",
      format: "json",
      method: "POST",
      prepareData: (formData) => {
        formData.append("fileName", formData.get("files[0]").name);
        return formData;
      },
      files: async (files) => {
        const file = files[0];
        if (!file) return [];

        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", file.name);

        try {
          await this.props.uploadFile(formData);
          return [];
        } catch (error) {
          console.error("Image upload failed:", error);
          return [];
        }
      },
      isSuccess: () => true,
      getMsg: (resp) => resp.msg || "Upload successful",
      process: (resp) => ({
        files: [resp.url],
        path: resp.url,
        baseurl: "",
      }),
    },
    events: {
      afterInit: (instance) => {
        console.log("Editor initialized:", !!instance);
        this.jodit = instance;

        // Add drag-and-drop functionality for images
        const editorElement = instance.container.querySelector(".jodit-wysiwyg");
        if (editorElement) {
          // Add CSS to make images draggable
          const style = document.createElement("style");
          style.innerHTML = `
            .draggable-image {
              cursor: move;
              user-select: none;
              max-width: 100%;
            }
            .draggable-image.dragging {
              opacity: 0.5;
            }
          `;
          document.head.appendChild(style);

          // Handle drag start
          editorElement.addEventListener("dragstart", (e) => {
            if (e.target.classList.contains("draggable-image")) {
              e.target.classList.add("dragging");
              e.dataTransfer.setData("text/html", e.target.outerHTML);
              e.dataTransfer.effectAllowed = "move";
            }
          });

          // Handle drag end
          editorElement.addEventListener("dragend", (e) => {
            if (e.target.classList.contains("draggable-image")) {
              e.target.classList.remove("dragging");
            }
          });

          // Handle drag over
          editorElement.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
          });

          // Handle drop
          editorElement.addEventListener("drop", (e) => {
            e.preventDefault();
            const draggedHTML = e.dataTransfer.getData("text/html");
            const draggedImage = new DOMParser().parseFromString(draggedHTML, "text/html").querySelector("img");

            if (draggedImage) {
              const range = instance.selection.createRange();
              const dropPosition = instance.selection.getNodeAtPoint(e.clientX, e.clientY);

              // Remove the original image
              const originalImage = editorElement.querySelector(".dragging");
              if (originalImage) {
                originalImage.remove();
              }

              // Insert the image at the drop position
              if (dropPosition) {
                range.setStartAfter(dropPosition);
                range.insertNode(draggedImage);
              } else {
                editorElement.appendChild(draggedImage);
              }

              // Update editor content
              this.updateContent(editorElement.innerHTML);
            }
          });
        }
      },
      beforePaste: (e) => {
        if (e.clipboardData) {
          const content =
            e.clipboardData.getData("text/html") ||
            e.clipboardData.getData("text/plain");
          return this.cleanContent(content);
        }
        return e;
      },
    },
  };

  render() {
    const { isLoading } = this.props;
    const { content } = this.state;

    if (isLoading) {
      return <div className="text-center p-4">Loading editor...</div>;
    }

    return (
      <div className="w-full">
        <JoditEditor
          ref={this.setRef}
          value={content}
          config={this.config}
          tabIndex={1}
          onBlur={(newContent) => this.updateContent(newContent)}
          onChange={(newContent) => this.updateContent(newContent)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fileState: state.file,
  isLoading: state.editor?.isLoading || false,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ uploadFile }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RichTextEditor);