import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import GalleryPage from './pages/GalleryPage'
import { BlogDetailPage, BlogsPage } from './pages/BlogsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
