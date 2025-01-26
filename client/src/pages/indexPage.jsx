import { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/post';

export default function IndexPage(){

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://blogspot-client.onrender.com/post')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the posts!", error);
            });
    }, []);
    
    return(
        <>
           {posts.length > 0 && posts.map(post => { 
                return <Post {...post} key={post.id} />;
           })}
        </>
    );
}
