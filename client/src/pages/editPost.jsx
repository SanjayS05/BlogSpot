import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "./Editor";
import axios from "axios";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const url=`${import.meta.env.VITE_API_URL}`;
  useEffect(() => {
    axios
      .get(`${url}/post/`+id)
      .then((response) => {
        const postInfo = response.data;
        console.log("Fetched Post Info:", postInfo); // Debug log
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }

    try {
      const response = await axios.put(`${url}/post`, data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Post updated successfully"); // Debug log
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  if (redirect) {
    console.log("Redirecting to post page..."); // Debug log
    return <Navigate to={'/post/'+id} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder={'Title'}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input
        type="file"
        onChange={(ev) => {
          setFiles(ev.target.files);
          console.log("Selected Files:", ev.target.files); // Debug log
        }}
      />
      <Editor onChange={setContent} value={content} />
      <button style={{marginTop:'5px'}}>Update post</button>
    </form>
  );
}
