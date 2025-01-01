import React from "react";
import { Link } from "react-router-dom";

function WelcomePage() {
  const styles = {
    container: {
      fontFamily: "'Roboto', sans-serif",
      padding: "2rem",
      backgroundColor: "#f9f9f9",
      color: "#333",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      maxWidth: "800px",
      margin: "2rem auto",
    },
    header: {
      color: "#2c3e50",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    leadText: {
      color: "#7f8c8d",
      marginBottom: "2rem",
      fontSize: "1.1rem",
    },
    buttonContainer: {
      marginBottom: "2rem",
    },
    button: {
      backgroundColor: "#3498db",
      color: "#fff",
      padding: "0.8rem 2rem",
      fontSize: "1.1rem",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      textDecoration: "none",
      margin: "0 1rem",
    },
    sectionTitle: {
      color: "#2980b9",
      fontWeight: "bold",
      marginTop: "2rem",
      marginBottom: "1rem",
    },
    list: {
      textAlign: "left",
      margin: "0 auto",
      maxWidth: "600px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to React Forms</h1>
      <p style={styles.leadText}>
        Create, share, and manage forms effortlessly with our powerful tool. Whether it's for surveys,
        feedback, or data collection, we've got you covered!
      </p>

      <div style={styles.buttonContainer}>
        <Link to="/login-signup" style={styles.button}>
          Login/Signup
        </Link>
        
      </div>

      <h3 style={styles.sectionTitle}>Why Use React Forms?</h3>
      <ul style={styles.list}>
        <li>📝 Easy-to-use form builder with customizable options.</li>
        <li>📊 Real-time response tracking and analysis.</li>
        <li>🔗 Shareable links to collect data from anywhere.</li>
        <li>🛡️ Secure and reliable platform for all your needs.</li>
      </ul>

      <h3 style={styles.sectionTitle}>How It Works</h3>
      <ol style={styles.list}>
        <li>1️⃣ Sign in with your account.</li>
        <li>2️⃣ Create and design your form using our builder.</li>
        <li>3️⃣ Share the link with your audience.</li>
        <li>4️⃣ View and analyze the responses in real-time.</li>
      </ol>

      <p style={styles.leadText}>
        Ready to get started? Click the buttons above and experience the ease of form creation like never
        before!
      </p>
    </div>
  );
}

export default WelcomePage;
