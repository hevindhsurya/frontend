import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import PropertyListing from '../components/PropertyListing/PropertyListing.js';
import Services from '../components/Services/Services.js';
import About from '../components/About/About.js';
import Contact from '../components/Contact/Contact.js';
import Blog from '../components/Blog/Blog.js';
import ForgetPassword from '../components/ForgotPassword/ForgotPassword.js';
import Help from '../components/Help/Help.js';
import AddBlog from '../components/Blog/AddBlog.js';
import BlogContent from '../components/Blog/BlogContent';
import Logout from '../components/Login/Logout.js';
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ✅ Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/help" element={<Help />} />

      {/* ✅ Protected Routes */}
      <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
      <Route path="/addblog" element={<ProtectedRoute><AddBlog /></ProtectedRoute>} />
      <Route path="/blog/:id" element={<ProtectedRoute><BlogContent /></ProtectedRoute>} />
      <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
      <Route path="/propertyListing" element={<ProtectedRoute><PropertyListing /></ProtectedRoute>} />
    </Routes>
  );
}
