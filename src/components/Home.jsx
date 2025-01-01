import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [forms, setForms] = useState([]);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = localStorage.getItem("username");
      if (!user) {
        alert("Please log in.");
        navigate("/login");
      } else {
        setUsername(user);
      }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const fetchForms = async () => {
      if (username) {
        try {
          const response = await axios.get(
            `https://react-forms-ltej.onrender.com/forms?username=${username}`
          );
          setForms(response.data);
        } catch (error) {
          console.error("Error fetching forms:", error);
        }
      }
    };
    fetchForms();
  }, [username]);

  const deleteForm = async (formId) => {
    const confirmed = window.confirm("Are you sure you want to delete this form?");
    if (confirmed) {
      try {
        await axios.delete(`https://react-forms-ltej.onrender.com/forms/${formId}`);
        alert("Form deleted successfully.");
        setForms(forms.filter((form) => form._id !== formId));
      } catch (error) {
        console.error("Error deleting form:", error);
        alert("Failed to delete form.");
      }
    }
  };

  const handleSignOut = () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");
    if (confirmed) {
      localStorage.removeItem("username");
      alert("You have been signed out.");
      navigate("/");
    }
  };

  const styles = {
    container: {
      textAlign: "center",
      margin: "50px auto",
      padding: "20px",
      maxWidth: "800px",
      fontFamily: "'Arial', sans-serif",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      fontSize: "2rem",
      color: "#333",
      marginBottom: "20px",
    },
    button: {
      margin: "10px",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    buttonDelete: {
      backgroundColor: "#dc3545",
    },
    buttonDeleteHover: {
      backgroundColor: "#c82333",
    },
    formList: {
      marginTop: "30px",
      textAlign: "left",
    },
    formItem: {
      marginBottom: "15px",
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
    link: {
      textDecoration: "none",
      color: "#3498db",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Google Forms Clone</h1>
      <Link to="/create-form">
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Create a Form
        </button>
      </Link>
      <Link to="/responses">
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Responses
        </button>
      </Link>
      <button
        style={styles.button}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = styles.buttonDelete.backgroundColor;
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#007bff";
        }}
        onClick={handleSignOut}
      >
        Sign Out
      </button>

      <div style={styles.formList}>
        <h3>All Forms</h3>
        {forms.length === 0 ? (
          <p>No forms created yet.</p>
        ) : (
          <ol>
            {forms.map((form) => (
              <li key={form._id} style={styles.formItem}>
                <h3>{form.title}</h3>
                <a
                  href={`http://localhost:5173/form/${form._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  {`http://localhost:5173/form/${form._id}`}
                </a>
                <button
                  style={{
                    ...styles.button,
                    marginLeft: "10px",
                    backgroundColor: "#dc3545",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonDeleteHover.backgroundColor)}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
                  onClick={() => deleteForm(form._id)}
                >
                  Delete Form
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default Home;
