import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";
import "../styles/Post.css";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const url = `${import.meta.env.VITE_API_URL}`;

  useEffect(() => {
    axios
      .get(`${url}/post/${id}`)
      .then((response) => {
        setPostInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [id]);

  if (!postInfo) return "";

  return (
    <div className="content-container">
      <div className="post-container">
        <article className="post-content">
          <header className="post-header">
            <h1 className="post-title">{postInfo.title}</h1>
            <div className="post-meta">
              <time>{new Date(postInfo.createdAt).toLocaleDateString()}</time>
              <span className="author">By {postInfo.author.username}</span>
            </div>
          </header>

          <div className="post-image">
            <img src={`${url}/${postInfo.cover}`} alt={postInfo.title} />
          </div>

          <div className="post-body">
            <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
          </div>

          <div className="post-actions">
            {userInfo?.id === postInfo.author._id && (
              <Link to={`/edit/${postInfo._id}`} className="edit-button">
                Edit Post
              </Link>
            )}
            <div className="share-buttons">
              <button
                className="share-button"
                onClick={() => {
                  navigator.share({
                    title: postInfo.title,
                    text: postInfo.summary,
                    url: window.location.href,
                  });
                }}
              >
                Share
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
