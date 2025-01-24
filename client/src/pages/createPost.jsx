import ReactQuill from "react-quill";
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { Navigate } from "react-router-dom";

const modules = {
    toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
    ],
}

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

export default function CreatePost(){
    const [title, setTitle] = useState(""); 
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(e){
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        
        e.preventDefault();

        const postResponse = await axios.post('http://localhost:3000/post', data, {withCredentials: true })
        if(postResponse.status === 200)
        {
            console.log(postResponse.data);
            setRedirect(true)
        }
        
    }

    if(redirect){
        return <Navigate to={"/"}/>;
    }
    
    return (
        <form action="" className="create-post" onSubmit={createNewPost}>
            <input type="title" 
                placeholder={"Title"} 
                value={title} 
                onChange={e => setTitle(e.target.value)}
            />
            <input type={"summary"} 
                placeholder="Summary" 
                value={summary}
                onChange={e => setSummary(e.target.value)}
            />
            <input type="file" 
                onChange={e => setFiles(e.target.files)}
            />
            <ReactQuill 
                value={content}
                onChange={newValue => setContent(newValue)}
                modules={modules} 
                formats={formats}  />
            <button>Create post</button>
        </form>
    )
}
