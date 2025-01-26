import axios from "axios";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../components/userContext";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/post/${id}`)
      .then((response) => {
        setPostInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the post:", error);
      });
  }, []);

  if(!postInfo) return '';

  return (
    <div className="post-page">
        <h1>{postInfo.title}</h1> 
        <time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
        <div className="author">by @{postInfo.author.username}</div>
        {userInfo.id === postInfo.author._id && (
            <div className="edit-row">
                <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                    <a href="" className="edit-btn">Edit this Post</a>
                </Link>
            </div>
        )}
        <div className="image">
            <img src={`http://localhost:3000/${postInfo.cover}`} alt="" />
        </div>
        <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content }}></div>
    </div>
  );
}
