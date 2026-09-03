import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminShell, RequireAuth } from './components/Shell'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import GalleryAdmin from './pages/GalleryAdmin'
import BlogsAdmin from './pages/BlogsAdmin'
import ContactsPage from './pages/ContactsPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route element={<AdminShell />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/gallery" element={<GalleryAdmin />} />
            <Route path="/blogs" element={<BlogsAdmin />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
