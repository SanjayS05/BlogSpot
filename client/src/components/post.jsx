import {format} from "date-fns";
import { Link } from "react-router-dom";

export default function post({_id,title,summary,cover,content,createdAt,author}) {
  const url=`${import.meta.env.VITE_API_URL}`;
  return (
    <div className='post'>
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={`${url}/`+cover} alt="" />
          </Link>
        </div>
        <div className="texts">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
        <p className="info">
            <span className="author">{author.username}</span>
            <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
        </p>
        <p className='summary'>{summary}</p>
        </div>
    </div>
  );
}
