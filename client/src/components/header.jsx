import { Link } from 'react-router-dom';
import { useEffect } from 'react';
function header()
{
    useEffect(() =>{
        axios.get('http://localhost:3000/profile', {withCredentials: true})
    }, [])
    return (
        <header>
            <Link to="" className='logo'>MyBlog</Link>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    );
}

export default header;