import React from "react";
import { Link } from "react-router-dom";

function WelcomePage() {
  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      padding: "3rem",
      backgroundColor: "#eef2f3",
      color: "#1a202c",
      borderRadius: "10px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      maxWidth: "900px",
      margin: "2rem auto",
    },
    header: {
      color: "#2d3748",
      fontWeight: "800",
      fontSize: "2.5rem",
      marginBottom: "1.5rem",
    },
    leadText: {
      color: "#4a5568",
      marginBottom: "2rem",
      fontSize: "1.2rem",
      lineHeight: "1.8",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "2rem",
    },
    button: {
      backgroundColor: "#3182ce",
      color: "#fff",
      padding: "0.8rem 2rem",
      fontSize: "1rem",
      fontWeight: "600",
      border: "none",
      borderRadius: "6px",
      textDecoration: "none",
      margin: "0 1rem",
      transition: "background-color 0.3s ease, transform 0.2s ease",
    },
    buttonHover: {
      backgroundColor: "#2b6cb0",
      transform: "scale(1.05)",
    },
    sectionTitle: {
      color: "#2c5282",
      fontWeight: "700",
      fontSize: "1.8rem",
      marginTop: "2rem",
      marginBottom: "1rem",
    },
    list: {
      textAlign: "left",
      margin: "0 auto",
      maxWidth: "600px",
      color: "#2d3748",
      fontSize: "1rem",
      lineHeight: "1.8",
      padding: "0",
      listStyleType: "none",
    },
    listItem: {
      marginBottom: "0.8rem",
      display: "flex",
      alignItems: "center",
    },
    icon: {
      marginRight: "0.8rem",
      color: "#3182ce",
      fontSize: "1.2rem",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to React Forms</h1>
      <p style={styles.leadText}>
        Simplify your form-building process with our intuitive tool. From surveys to data collection, create stunning forms effortlessly and securely!
      </p>

      <div style={styles.buttonContainer}>
        <Link
          to="/login-signup"
          style={styles.button}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
            e.target.style.transform = styles.buttonHover.transform;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = styles.button.backgroundColor;
            e.target.style.transform = "scale(1)";
          }}
        >
          Login/Signup
        </Link>
      </div>

      <h3 style={styles.sectionTitle}>Why Choose React Forms?</h3>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <span style={styles.icon}>📝</span> Build professional forms with ease.
        </li>
        <li style={styles.listItem}>
          <span style={styles.icon}>📊</span> Track responses in real-time.
        </li>
        <li style={styles.listItem}>
          <span style={styles.icon}>🔗</span> Share forms anywhere effortlessly.
        </li>
        <li style={styles.listItem}>
          <span style={styles.icon}>🛡️</span> Secure and reliable platform.
        </li>
      </ul>

      <h3 style={styles.sectionTitle}>How It Works</h3>
      <ol style={{ ...styles.list, listStyleType: "decimal", paddingLeft: "20px" }}>
        <li style={{ marginBottom: "1rem" }}>Sign in with your account.</li>
        <li style={{ marginBottom: "1rem" }}>Design your form using our builder.</li>
        <li style={{ marginBottom: "1rem" }}>Share the link with your audience.</li>
        <li style={{ marginBottom: "1rem" }}>Analyze responses in real-time.</li>
      </ol>

      <p style={styles.leadText}>
        Ready to start? Click the button above and revolutionize your form-building experience today!
      </p>
    </div>
  );
}

export default WelcomePage;
