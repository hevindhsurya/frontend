import { Link } from "react-router-dom";
import ContactForm from "../Contact/ContactForm";

function Home() {
  return (
    <div className="home">
      <h1>Home Page</h1>
      <div className="contact-homepage">  
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.8060026294556!2d77.22693477583735!3d28.612911975675516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2daa9eb4d0b%3A0x717971125923e5d!2sIndia%20Gate!5e1!3m2!1sen!2sin!4v1749880002257!5m2!1sen!2sin"
          width="450" 
          height="300"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{
            width: '100%',
            height: '400px',
            border: '2px solid #00ffff',
            outline: 'none',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0, 255, 255, 0.3)'
          }}
        ></iframe>
      </div>

      <div className="form-container">
      <div>
        <h2>GET IN TOUCH</h2>
        <p className="subtitle">Have some questions?</p>
        <p className="subtitle">Feel free to ask them anytime</p>
      </div>
      <ContactForm />
      </div>
    </div>
    </div>
  );
}

export default Home;
