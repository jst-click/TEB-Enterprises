import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import GalleryPage from './pages/GalleryPage'
import { BlogDetailPage, BlogsPage } from './pages/BlogsPage'
import { ServiceDetailPage, ServicesIndexPage } from './pages/ServicesPages'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesIndexPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />
          <Route path="/:slug" element={<ServiceDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
