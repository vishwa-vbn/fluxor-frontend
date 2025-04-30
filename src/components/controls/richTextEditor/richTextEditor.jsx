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
      this.props.fileState.assets.length !==
        prevProps.fileState.assets.length &&
      !this.props.fileState.loading
    ) {
      this.insertFiles();
    }
    if (
      this.props.value !== prevProps.value &&
      this.props.value !== this.state.content
    ) {
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
      pos:
        window.getSelection() && window.getSelection().getRangeAt(0)
          ? window.getSelection().getRangeAt(0).startOffset
          : this.state.pos,
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
          (fileName &&
            imageExtensions.some((ext) =>
              fileName.toLowerCase().endsWith(`.${ext}`)
            ))
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
    statusbar: false, // Hide status bar
    readonly: false,
    activeButtonsInReadOnly: ["source", "fullsize", "print", "about"],
    toolbarButtonSize: "middle",
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
      "bold",
      "strikethrough",
      "underline",
      "italic",
      "ul",
      "ol",
      "outdent",
      "indent",
      "font",
      "fontsize",
      "brush",
      "paragraph",
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
      "align",
      "undo",
      "redo",
      "eraser",
      "copyformat",
      "print",
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
      "brush",
      "paragraph",
      "align",
      "undo",
      "redo",
      "eraser",
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
        const editorElement = instance.container.querySelector(".jodit-wysiwyg");
        if (editorElement) {
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
          editorElement.addEventListener("dragstart", (e) => {
            if (e.target.classList.contains("draggable-image")) {
              e.target.classList.add("dragging");
              e.dataTransfer.setData("text/html", e.target.outerHTML);
              e.dataTransfer.effectAllowed = "move";
            }
          });
          editorElement.addEventListener("dragend", (e) => {
            if (e.target.classList.contains("draggable-image")) {
              e.target.classList.remove("dragging");
            }
          });
          editorElement.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
          });
          editorElement.addEventListener("drop", (e) => {
            e.preventDefault();
            const draggedHTML = e.dataTransfer.getData("text/html");
            const draggedImage = new DOMParser()
              .parseFromString(draggedHTML, "text/html")
              .querySelector("img");
            if (draggedImage) {
              const range = instance.selection.createRange();
              const dropPosition = instance.selection.getNodeAtPoint(
                e.clientX,
                e.clientY
              );
              const originalImage = editorElement.querySelector(".dragging");
              if (originalImage) {
                originalImage.remove();
              }
              if (dropPosition) {
                range.setStartAfter(dropPosition);
                range.insertNode(draggedImage);
              } else {
                editorElement.appendChild(draggedImage);
              }
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
