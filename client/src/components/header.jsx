import { Link } from 'react-router-dom';

function header()
{
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