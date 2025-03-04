import ReactQuill from "react-quill";
import PropTypes from "prop-types";

export default function Editor({ value, onChange }) {
  const modules = {
    toolbar: false,
    keyboard: {
      bindings: {
        tab: false,
      },
    },
  };

  return (
    <div className="editor-content">
      <div className="content-section">
        <label className="form-label">Content</label>
        <ReactQuill
          value={value}
          theme={"snow"}
          onChange={onChange}
          modules={modules}
          placeholder="Write your post content here..."
        />
      </div>
    </div>
  );
}

Editor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
