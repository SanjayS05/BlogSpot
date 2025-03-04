import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const url = `${import.meta.env.VITE_API_URL}`;

  useEffect(() => {
    axios
      .get(`${url}/post`, {
        withCredentials: true,
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="content-container">
      <div className="home-container">
        <div className="hero-section">
          <h1 className="hero-title">Welcome to BlogSpot</h1>
          <p className="hero-subtitle">
            Discover insightful articles about web development, programming, and
            technology
          </p>
        </div>

        <div className="posts-grid">
          {posts.length > 0 &&
            posts.map((post) => (
              <article className="post-card" key={post._id}>
                <div className="image">
                  <Link to={`/post/${post._id}`}>
                    <img src={`${url}/${post.cover}`} alt={post.title} />
                  </Link>
                </div>
                <div className="content">
                  <Link to={`/post/${post._id}`}>
                    <h2>{post.title}</h2>
                  </Link>
                  <div className="meta">
                    <span className="author">By {post.author.username}</span>
                    <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                  </div>
                  <p className="summary">{post.summary}</p>
                  <Link to={`/post/${post._id}`} className="read-more">
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
        </div>
      </div>
    </div>
  );
}
