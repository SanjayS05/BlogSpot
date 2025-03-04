import { useContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function Layout() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_API_URL}`;

  useEffect(() => {
    axios
      .get(`${url}/profile`, {
        withCredentials: true,
      })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  async function logout() {
    try {
      await axios.post(
        `${url}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setUserInfo(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <div className="layout">
      <header className="header">
        <Link to="/" className="logo">
          BlogSpot
        </Link>
        <nav>
          {userInfo?.username ? (
            <>
              <Link to="/create">Create Post</Link>
              <button onClick={logout} className="auth-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
