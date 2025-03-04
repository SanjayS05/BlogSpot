import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "./Editor";
import axios from "axios";
import "../styles/CreatePost.css";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const url = `${import.meta.env.VITE_API_URL}`;

  useEffect(() => {
    axios
      .get(`${url}/post/` + id)
      .then((response) => {
        const postInfo = response.data;
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      })
      .catch((error) => {
        setError("Failed to fetch post details");
        console.error("Error fetching post:", error);
      });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    if (!title || !summary || !content) {
      setError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    try {
      const response = await axios.put(`${url}/post`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      setError(error.response?.data?.error || "Failed to update post");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <div className="content-container">
      <div className="create-post-container">
        <div className="create-post-content">
          <div className="create-post-header">
            <h1 className="create-post-title">Edit Post</h1>
            <p className="create-post-subtitle">Update your post content</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form className="create-post-form" onSubmit={updatePost}>
            <div className="form-group">
              <label className="form-label" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="form-input"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
                placeholder="Enter a descriptive title"
                maxLength={100}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="summary">
                Summary
              </label>
              <textarea
                id="summary"
                className="form-input"
                value={summary}
                onChange={(ev) => setSummary(ev.target.value)}
                placeholder="Write a brief summary of your post"
                maxLength={300}
              />
            </div>

            <div className="file-input-wrapper">
              <label className="file-input-label" htmlFor="file">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                {files ? files[0].name : "Update Cover Image (Optional)"}
              </label>
              <input
                type="file"
                id="file"
                className="file-input"
                onChange={(ev) => setFiles(ev.target.files)}
                accept="image/*"
              />
            </div>

            <div className="editor-wrapper">
              <Editor value={content} onChange={setContent} />
            </div>

            <div style={{ textAlign: "right" }}>
              <button className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
