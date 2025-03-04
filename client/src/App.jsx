import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import PostPage from "./pages/postPage";
import CreatePost from "./pages/createPost";
import EditPost from "./pages/editPost";
import "./App.css";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
