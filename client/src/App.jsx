import { useState } from 'react';
import './App.css';
import Post from './components/post';
import Header from './components/header';
import Layout from './components/layout';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Post />} />
        </Route>
          <Route path={'/login'} element={
            <div>
              Login page
            </div>
          }/>
    </Routes>
  )
}

export default App
