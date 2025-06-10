
import { Routes, Route , Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { Toaster } from 'react-hot-toast'
import { useCheckAuth } from './hooks/useCheckAuth'
import Navbar from './components/Navbar'
import ProfilePage from './pages/ProfilePage'
import { themeStore } from './store/themeStore'
import SettingsPage from './pages/SettingsPage'

const App = () => {

  const { loading, isAuthenticated } = useCheckAuth()
  const theme = themeStore((state) => state.theme)
  
  if (loading) {
    return <div className='flex justify-center items-center h-screen'>
      <div className='loading loading-dots loading-xl' />
    </div>
  }


  return (
    <div data-theme = {theme}>


      <Navbar/>

      <Routes>
      <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to = "/login" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/sign" element={isAuthenticated ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={<SettingsPage/> } />
      </Routes>

      <Toaster />
    </div>
    


  )
}

export default App