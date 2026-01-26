import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

// Import images from assets
import frontendCert from '../../assets/Frontend Cert.webp';
import fullCourseCert from '../../assets/Full Course Cert.webp';
import fullStackCert from '../../assets/Full-Stack Cert.webp';
import pythonCert from '../../assets/Python Certr.webp';
import gccImage from '../../assets/gcc-1.webp';
import rcgcImage from '../../assets/rcgc-1.webp';

function About() {
  const [lightboxImage, setLightboxImage] = useState(null);

  const openLightbox = (image, title) => {
    setLightboxImage({ src: image, alt: title });
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const certifications = [
    {
      title: 'Frontend Development',
      image: frontendCert,
    },
    {
      title: 'Full Course',
      image: fullCourseCert,
    },
    {
      title: 'Full-Stack Development',
      image: fullStackCert,
    },
    {
      title: 'Python',
      image: pythonCert,
    },
  ];

  const education = [
    {
      school: 'Gloucester County College',
      image: gccImage,
    },
    {
      school: 'Rowan College of Gloucester County',
      image: rcgcImage,
    },
  ];

  return (
    <div className="page about-page">
      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              ✕
            </button>
            <img src={lightboxImage.src} alt={lightboxImage.alt} />
            <p className="lightbox-caption">{lightboxImage.alt}</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Me</h1>
        <p className="about-intro">
          I'm a passionate full-stack developer with a love for building modern
          web applications. I enjoy turning complex problems into simple,
          beautiful solutions.
        </p>
      </section>

      {/* Bio Section */}
      <section className="about-section">
        <h2>My Story</h2>
        <div className="about-content">
          <p>
            I'm Anthony Pirolli Jr, a developer based in New Jersey. My journey
            into programming started with curiosity and has grown into a career
            focused on creating impactful digital experiences.
          </p>
          <p>
            When I'm not coding, you can find me exploring new technologies,
            contributing to open source, or working on personal projects that
            challenge me to grow as a developer.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="about-section">
        <h2>Skills & Technologies</h2>
        <div className="skills-container">
          <div className="skill-category">
            <h3>Frontend</h3>
            <ul className="skill-list">
              <li>React</li>
              <li>JavaScript / ES6+</li>
              <li>HTML5 / CSS3</li>
              <li>Responsive Design</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Backend</h3>
            <ul className="skill-list">
              <li>Node.js</li>
              <li>Express</li>
              <li>Python</li>
              <li>REST APIs</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Database & Tools</h3>
            <ul className="skill-list">
              <li>MongoDB</li>
              <li>Git / GitHub</li>
              <li>Docker</li>
              <li>VS Code</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="about-section">
        <h2>Certifications</h2>
        <div className="cert-grid">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="cert-card clickable"
              onClick={() => openLightbox(cert.image, cert.title)}
            >
              <img src={cert.image} alt={cert.title} />
              <h3>{cert.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="about-section">
        <h2>Education</h2>
        <div className="education-grid">
          {education.map((edu, index) => (
            <div
              key={index}
              className="education-card clickable"
              onClick={() => openLightbox(edu.image, edu.school)}
            >
              <img src={edu.image} alt={edu.school} />
              <h3>{edu.school}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
