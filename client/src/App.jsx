import { Route, Routes } from 'react-router-dom';
import { UserContextProvider } from './components/userContext';
import './App.css';
import IndexPage from './pages/indexPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import Layout from './components/layout';
import CreatePost from './pages/createPost';
import PostPage from './pages/postPage';
import EditPost from './pages/editPost';

export default function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route index element={ <IndexPage /> } />
          <Route path='/login' element={ <LoginPage /> }/>
          <Route path='/register' element={ <RegisterPage /> }/>
          <Route path='/create' element={<CreatePost />}/>
          <Route path='/post/:id' element={<PostPage />}/>
          <Route path='/edit/:id' element={<EditPost />}/>
        </Route>
      </Routes>
    </UserContextProvider>

  )
}
