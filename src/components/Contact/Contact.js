import react from "react";
import "../../formstyle/formstyle.css";
import ContactForm from "./ContactForm";

function Contact() {
    return(
      <div>
        <div className="contact">
          <div className="contact-left">
            <h1>Contact Us, We're Ready to Help!</h1>
            <p>We strive to provide you with the best experience and the best platform to find your choice.</p>
            <p>Post us any queries and we'll get back to you.</p>

          <div className="contact-info">
            <div className="info-block">
              <i className="far fa-comments icon"></i>
            <div>
              <h3>Chat with us !!</h3>
              <p>Our friendly team is here to help</p>
              <a href="mailto:mySite@gmail.com">mySite@gmail.com</a>
            </div>
          </div>

          <div className="info-block">
            <i className="fas fa-phone icon"></i>
            <div>
              <h3>Call us...</h3>
              <p>Mon - Fri 8 am to 10 pm</p>
              <a href="tel:+919876543210">+91 9876543210</a>
            </div>
          </div>
        </div>
        </div>
        <ContactForm />
        </div>
    </div>
  );
}

export default Contact;