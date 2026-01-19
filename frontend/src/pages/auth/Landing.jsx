import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
 const navigate = useNavigate();
 const [activeSection, setActiveSection] = useState("home");

 const scrollToSection = (sectionId) => {
  setActiveSection(sectionId);
  const element = document.getElementById(sectionId);
  if (element) {
   element.scrollIntoView({ behavior: "smooth" });
  }
 };

 return (
  <div className="landing-page">
   {/* Navigation Bar */}
   <nav className="landing-nav">
    <div className="nav-logo">
     <h1>SRIT</h1>
    </div>
    <ul className="nav-links">
     <li>
      <a
       href="#home"
       className={activeSection === "home" ? "active" : ""}
       onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}
      >
       Home
      </a>
     </li>
     <li>
      <a
       href="#about"
       className={activeSection === "about" ? "active" : ""}
       onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}
      >
       About Us
      </a>
     </li>
     <li>
      <a
       href="#academics"
       className={activeSection === "academics" ? "active" : ""}
       onClick={(e) => { e.preventDefault(); scrollToSection("academics"); }}
      >
       Academics
      </a>
     </li>
     <li>
      <a
       href="#placements"
       className={activeSection === "placements" ? "active" : ""}
       onClick={(e) => { e.preventDefault(); scrollToSection("placements"); }}
      >
       Placements
      </a>
     </li>
    </ul>
    <button className="nav-login-btn" onClick={() => navigate("/login")}>
     Login
    </button>
   </nav>

   {/* Home Section */}
   <section id="home" className="landing-hero">
    <div className="hero-content">
     <h2>Welcome to SRIT</h2>
     <p>SRIT</p>
     <p className="hero-tagline">Excellence in Education, Innovation in Research</p>
     <button className="hero-cta" onClick={() => scrollToSection("about")}>
      Learn More
     </button>
    </div>
   </section>

   {/* About Us Section */}
   <section id="about" className="landing-section">
    <div className="section-content">
     <h2>About Us</h2>
     <div className="about-grid">
      <div className="about-card">
       <h3>Our Vision</h3>
       <p>
        To be a center of excellence in technical education and research,
        producing competent professionals who contribute to societal development.
       </p>
      </div>
      <div className="about-card">
       <h3>Our Mission</h3>
       <p>
        To provide quality education through innovative teaching methodologies,
        state-of-the-art infrastructure, and industry collaborations.
       </p>
      </div>
      <div className="about-card">
       <h3>Our Values</h3>
       <p>
        Integrity, Excellence, Innovation, Collaboration, and Social Responsibility
        are the core values that guide our institution.
       </p>
      </div>
     </div>
    </div>
   </section>

   {/* Academics Section */}
   <section id="academics" className="landing-section academics-section">
    <div className="section-content">
     <h2>Academics</h2>
     <div className="academics-grid">
      <div className="academic-card">
       <div className="academic-icon">🎓</div>
       <h3>Undergraduate Programs</h3>
       <p>B.Tech programs in various engineering disciplines with modern curriculum.</p>
      </div>
      <div className="academic-card">
       <div className="academic-icon">📚</div>
       <h3>Postgraduate Programs</h3>
       <p>M.Tech and MBA programs for advanced studies and specializations.</p>
      </div>
      <div className="academic-card">
       <div className="academic-icon">🔬</div>
       <h3>Research</h3>
       <p>Cutting-edge research facilities and opportunities for students and faculty.</p>
      </div>
      <div className="academic-card">
       <div className="academic-icon">💻</div>
       <h3>Laboratories</h3>
       <p>Well-equipped computer labs and research laboratories with latest technology.</p>
      </div>
     </div>
    </div>
   </section>

   {/* Placements Section */}
   <section id="placements" className="landing-section placements-section">
    <div className="section-content">
     <h2>Placements</h2>
     <div className="placements-stats">
      <div className="stat-card">
       <h3 className="stat-number">95%</h3>
       <p>Placement Rate</p>
      </div>
      <div className="stat-card">
       <h3 className="stat-number">500+</h3>
       <p>Companies Visited</p>
      </div>
      <div className="stat-card">
       <h3 className="stat-number">₹12 LPA</h3>
       <p>Highest Package</p>
      </div>
      <div className="stat-card">
       <h3 className="stat-number">₹4.5 LPA</h3>
       <p>Average Package</p>
      </div>
     </div>
     <div className="recruiting-partners">
      <h3>Top Recruiting Companies</h3>
      <div className="company-logos">
       <span className="company-tag">Google</span>
       <span className="company-tag">Microsoft</span>
       <span className="company-tag">Amazon</span>
       <span className="company-tag">TCS</span>
       <span className="company-tag">Infosys</span>
       <span className="company-tag">Wipro</span>
      </div>
     </div>
    </div>
   </section>

   {/* Footer */}
   <footer className="landing-footer">
    <div className="footer-content">
     <div className="footer-section">
      <h4>SRIT</h4>
      <p>SRIT</p>
     </div>
     <div className="footer-section">
      <h4>Quick Links</h4>
      <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}>Home</a>
      <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}>About Us</a>
      <a href="#academics" onClick={(e) => { e.preventDefault(); scrollToSection("academics"); }}>Academics</a>
      <a href="#placements" onClick={(e) => { e.preventDefault(); scrollToSection("placements"); }}>Placements</a>
     </div>
     <div className="footer-section">
      <h4>Contact</h4>
      <p>Email: info@srit.edu</p>
      <p>Phone: +91 1234567890</p>
     </div>
    </div>
    <div className="footer-bottom">
     <p>&copy; 2024 SRIT. All rights reserved.</p>
    </div>
   </footer>
  </div>
 );
}

