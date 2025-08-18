import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./pages/login"
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register'
import Profile from './pages/profile'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import ModifierInfo from './pages/ModifierInfo'
import ChatTest from './pages/ChatTest'
import Chats from './pages/Chats'
import Playground from '../test/Playgrounds'
import ProfileViewer from './pages/ProfileViewer'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/test' element={<Playground/>} />
      <Route element={<PrivateRoute />}>
        <Route path='/profile/:username' element={<ProfileViewer/>}/>
        <Route path='/profile/me' element={<Profile />} />
        <Route path='/Modifier' element={<ModifierInfo/>}/>
        <Route path='/chats' element={<Chats/>}/>
        <Route path='/chat' element={<ChatTest/>} />
      </Route>
    </Routes>
  );
}

export default App
