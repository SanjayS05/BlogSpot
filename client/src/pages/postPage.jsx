import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
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
        <div className="image">
            <img src={`http://localhost:3000/${postInfo.cover}`} alt="" />
        </div>
        <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content }}></div>
    </div>
  );
}
