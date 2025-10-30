import React from "react";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaEnvelope, 
  FaPhone,
  FaMapMarkerAlt
} from "react-icons/fa";
import { Link } from "react-router-dom"; // Use Link for internal navigation

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    { 
      title: "Products", 
      links: [
        { name: "E-commerce Tools", href: "#" },
        { name: "Analytics Suite", href: "#" },
        { name: "API Services", href: "#" },
        { name: "Support Docs", href: "#" }
      ] 
    },
    { 
      title: "Company", 
      links: [
        { name: "Our Story", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Affiliate Program", href: "#" },
        { name: "Privacy Policy", href: "#" }
      ] 
    },
  ];

  const socialIcons = [
    { icon: FaFacebookF, label: "Facebook", href: "#" },
    { icon: FaTwitter, label: "Twitter", href: "#" },
    { icon: FaInstagram, label: "Instagram", href: "#" },
  ];

  // Helper component for cleaner contact lines
  const ContactItem = ({ icon: Icon, text }) => (
    <li className="mb-2 d-flex align-items-center">
      {/* Use text-primary for the icon color */}
      <Icon className="text-primary me-3" size={18} />
      {/* Use text-secondary for the text color */}
      <span className="text-secondary small">{text}</span> 
    </li>
  );

  return (
    // Use bg-black for a deep, modern dark look. Ample padding (pt-5/pb-4)
    <footer className="bg-black text-white pt-5 pb-4 mt-5">
      <div className="container">
        
        {/* Top Section: Brand/Links/Contact */}
        <div className="row pb-4 border-bottom border-secondary">
          
          {/* 1. Brand/Mission - Larger column */}
          <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
            <h5 className="fw-bolder text-primary mb-3 fs-3">ShopBrand</h5>
            {/* Use text-secondary for muted text */}
            <p className="text-secondary small pe-lg-5">
              Leading the digital transformation space with modern, scalable, and fast solutions for commerce. We help you grow.
            </p>
          </div>
          
          {/* 2 & 3. Navigation Links - Clean, structured columns */}
          {footerSections.map((section) => (
            <div className="col-6 col-md-3 col-lg-2 mb-4 mb-lg-0" key={section.title}>
              <h6 className="text-uppercase fw-bold mb-3 text-white">{section.title}</h6>
              <ul className="list-unstyled mb-0">
                {section.links.map((link) => (
                  <li className="mb-2" key={link.name}>
                    {/* Use Link or a for navigation */}
                    <Link 
                      to={link.href} 
                      // text-secondary for default, text-decoration-none is standard
                      // We rely on Bootstrap's default link hover for the effect
                      className="text-secondary text-decoration-none small"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 4. Contact Information - Clear icons, separated lines */}
          <div className="col-md-6 col-lg-4">
            <h6 className="text-uppercase fw-bold mb-3 text-white">Get In Touch</h6>
            <ul className="list-unstyled mb-0">
              <ContactItem 
                icon={FaMapMarkerAlt} 
                text="123 Tech Drive, Digital City, CA 94027, US" 
              />
              <ContactItem 
                icon={FaEnvelope} 
                text="support@shopbrand.com" 
              />
              <ContactItem 
                icon={FaPhone} 
                text="+1 (555) 123-4567" 
              />
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Social Media */}
        <div className="row pt-4 d-flex align-items-center justify-content-between">
          
          {/* Copyright */}
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            {/* Use text-secondary for muted text */}
            <p className="text-secondary small mb-0">
              &copy; {currentYear} **ShopBrand**. All Rights Reserved.
            </p>
          </div>

          {/* Social Icons - Primary filled, rounded, small size */}
          <div className="col-md-6 text-center text-md-end">
            {socialIcons.map(({ icon: Icon, label, href }) => (
              <a 
                key={label}
                href={href} 
                // Primary background, rounded-circle, padding
                className="btn btn-primary p-2 mx-2 rounded-circle shadow-sm"
                aria-label={label}
                // Inline style for perfect circle alignment (no custom CSS)
                style={{ width: '36px', height: '36px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;