import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './userContext';

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);    
    useEffect(() => {
        axios.get('https://blogspot-g6zd.onrender.com/profile', { withCredentials: true })
          .then(res => {
            setUserInfo(res.data); 
          })
          .catch(error => {
            console.error('Error fetching profile:', error);
          });
    }, [setUserInfo]);

    function logout() {
        axios.post('https://blogspot-g6zd.onrender.com/logout', {}, { withCredentials: true })
          .then(() => {
            setUserInfo(null);
          })
          .catch(error => {
            console.error('Error logging out:', error);
          });
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className='logo'>MyBlog</Link>
            <nav>
                {username ? (
                    <>
                        <Link to='/create'>Create new post</Link>
                        <a onClick={logout}>Logout</a>
                    </>
                ) : (
                    <>
                        <Navigate to={"/"} />
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>)
};
