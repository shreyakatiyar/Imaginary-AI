/* eslint-disable react/no-unescaped-entities */
// import React from 'react';
import { Link } from "react-router-dom";
import Card from "./Card";
import Card1 from "./Card1";

function Home() {
  const appStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    margin: 0,
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f0f0",
    padding: "20px",
    boxSizing: "border-box",
  };

  const headerStyle = {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "20px",
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const logoStyle = {
    fontSize: "1.5em",
    fontWeight: "bold",
    textDecoration: "none",
    color: "white",
  };

  const navStyle = {
    display: "flex",
    gap: "15px",
  };

  const navLinkStyle = {
    textDecoration: "none",
    color: "white",
    fontSize: "1em",
    transition: "color 0.3s ease",
  };

  // const navLinkHoverStyle = {
  //   color: '#DDA0DD',
  // };

  const mainContentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  };

  const headingStyle = {
    fontSize: "2.5em",
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  };

  const paragraphStyle = {
    fontSize: "1.2em",
    marginBottom: "30px",
    color: "#666",
    textAlign: "center",
    lineHeight: "1.5",
    // maxWidth: '800px',
  };

  const buttonStyle = {
    padding: "15px 30px",
    margin: "10px",
    fontSize: "18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.3s ease, background-color 0.3s ease",
  };

  const blueButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#1E88E5",
    color: "white",
  };

  const purpleButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#DE1889",
    color: "white",
  };

  const imageStyle = {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={appStyle}>
      <header style={headerStyle}>
        <Link to="/" style={logoStyle}>
          Imagine AI
        </Link>
        <nav style={navStyle}>
          <Link
            to="/text"
            style={navLinkStyle}
            onMouseEnter={(e) => (e.target.style.color = "#DDA0DD")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            Text
          </Link>
          <Link
            to="/image"
            style={navLinkStyle}
            onMouseEnter={(e) => (e.target.style.color = "#DDA0DD")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            Image
          </Link>
        </nav>
      </header>
      <main style={mainContentStyle}>
        <h1 style={headingStyle}>Welcome to Imagine AI</h1>
        <p style={paragraphStyle}>
          Generate unique text and captivating images instantly with our
          innovative tool. Whether you're brainstorming ideas, designing a
          website, or creating social media content, our generator is your
          creative companion.
        </p>
        <img
          src="https://blog.checkpoint.com/wp-content/uploads/2024/03/DALL%C2%B7E-2024-03-04-04.32.57-Create-a-version-of-the-previously-generated-image-that-visualizes-the-future-of-cybersecurity-in-the-age-of-generative-AI-excluding-any-textual-elem-800x400.webp"
          alt="Generated Image"
          style={imageStyle}
        />
        <p style={paragraphStyle}>
          Explore the power of randomness and creativity! Use our tool to
          generate text for blog posts, social media captions, or even ideas for
          your next novel. Our image generation feature offers stunning visuals
          suitable for any project.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <Link to="/text">
            <button
              style={blueButtonStyle}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Generate Text
            </button>
          </Link>
          <Link to="/image">
            <button
              style={purpleButtonStyle}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Generate Image
            </button>
          </Link>
        </div>
        <Card
          text="Our tool is designed for creators of all kinds. Whether you're a marketer needing fresh content, a developer prototyping designs, or a student exploring AI-driven creativity, our generator adapts to your needs."
          imageUrl="https://www.ibm.com/blog/wp-content/uploads/2023/03/What-is-Generative-AI-what-are-Foundation-Models-and-why-do-they-matter-scaled.jpg"
        />
        <Card1
          text=" Get started today and unleash your imagination with limitless
          possibilities. Join thousands of users who rely on our tool for their
          daily creative projects."
          imageUrl="https://media.licdn.com/dms/image/D4D12AQHlYO30JBr2vw/article-cover_image-shrink_600_2000/0/1709817807558?e=2147483647&v=beta&t=F6zXoOow6Dq7u2QaDjY6JFwinAB_rnr-s33sRKGt4cQ"
        />
        <Card
          text="With continuous updates and enhancements, we strive to provide you
          with the best tools to fuel your creativity. Explore our features and
          see why our users love the simplicity and effectiveness of our
          generator."
          imageUrl="https://cdn.sanity.io/images/tlr8oxjg/production/bfd288fd12e9e359425e1f5de3a817f029dd3d8e-1456x816.png?w=3840&q=100&fit=clip&auto=format"
        />

        <Card1
          text="Join our community of creators and start generating content that
          stands out. Click below to begin your creative journey with our text
          and image generator."
          imageUrl="https://cdn.analyticsvidhya.com/wp-content/uploads/2024/01/Generative-AI-on-the-Animation-Industry.jpg"
        />

        <Card
          text="Whether you need inspiration, rapid content creation, or visual
          mockups, our tool is your ultimate companion. Start creating today and
          unlock the potential of AI-driven creativity."
          imageUrl="https://img-c.udemycdn.com/course/750x422/6035720_368e_5.jpg"
        />
      </main>
      <footer
        style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#007BFF",
          color: "white",
        }}
      >
        <p>&copy; 2024 Imagine AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
