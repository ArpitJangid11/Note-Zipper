
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './component/Footer/Footer'
import Header from './component/header/header'
import LandingPage from './Screens/LandingPage/LandingPage'
import MyNote from './Screens/My Note/MyNote'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import CreateNote from './Screens/SingleNote/CreateNote'
import SingleNote from './Screens/SingleNote/SingleNote'
import { useState } from 'react'

const App =() => {
  const [search, setSearch] = useState("")
  return (
    <>
    <BrowserRouter>
      <Header setSearch={setSearch}/>
        <main>
          <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/createnote" element={<CreateNote/>} />
          <Route path="/note/:id" element={<SingleNote/>} />
          <Route path="/mynotes" element={<MyNote search={search} />} />
        </Routes>
        </main>
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
