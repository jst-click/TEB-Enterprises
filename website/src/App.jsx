import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import GalleryPage from './pages/GalleryPage'
import { BlogDetailPage, BlogsPage } from './pages/BlogsPage'
import { ServiceDetailPage, ServicesIndexPage } from './pages/ServicesPages'
import AmcPage from './pages/AmcPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesIndexPage />} />
          <Route path="/pest-control-amc-bangalore" element={<AmcPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/:slug" element={<ServiceDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
