import ReactQuill from "react-quill";
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

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

    
    return (
        <form action="" className="create-post">
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
            <input type="file" />
            <ReactQuill 
                value={content}
                onChange={e => setContent(e)}
                modules={modules} 
                formats={formats}  />
            <button>Create post</button>
        </form>
    )
}