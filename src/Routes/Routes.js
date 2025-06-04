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


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/propertyListing" element={<PropertyListing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/help" element={<Help />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
    </Routes>
  );
}
