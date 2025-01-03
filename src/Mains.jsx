import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Mains() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track submission

  useEffect(() => {
    axios.get(`https://react-forms-ltej.onrender.com/forms/${id}`).then((response) => {
      setForm(response.data);
      const initialAnswers = response.data.questions.map((q) => {
        if (q.type === "checkbox") return [];
        return "";
      });
      setAnswers(initialAnswers);
    });
  }, [id]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    if (Array.isArray(newAnswers[index])) {
      if (newAnswers[index].includes(value)) {
        newAnswers[index] = newAnswers[index].filter((item) => item !== value);
      } else {
        newAnswers[index].push(value);
      }
    } else {
      newAnswers[index] = value;
    }
    setAnswers(newAnswers);
  };

  const submitAnswers = async () => {
    if (form.questions.some((q, i) => q.required && !answers[i])) {
      alert("Please answer all required questions.");
      return;
    }
    await axios.post(`https://react-forms-ltej.onrender.com/forms/${id}/responses`, { answers });
    setIsSubmitted(true); // Set the form as submitted
  };

  const styles = {
    container: {
      margin: "20px auto",
      maxWidth: "600px",
      fontFamily: "'Arial', sans-serif",
      padding: "20px",
      borderRadius: "10px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "10px",
    },
    message: {
      textAlign: "center",
      fontSize: "1.5rem",
      color: "#28a745",
    },
    requiredNote: {
      fontStyle: "italic",
      color: "#d9534f",
      marginBottom: "20px",
    },
    questionContainer: {
      marginBottom: "20px",
    },
    questionText: {
      fontSize: "1rem",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    input: {
      display: "block",
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "1rem",
    },
    checkboxRadio: {
      marginRight: "10px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1rem",
      color: "#fff",
      backgroundColor: "#007bff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  if (isSubmitted) {
    return (
      <div style={styles.container}>
        <p style={styles.message}>
          Your response has been recorded. Thank you for your response.
        </p>
      </div>
    );
  }

  if (!form) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{form.title}</h2>
      <p style={styles.requiredNote}>* indicates a required question.</p>
      {form.questions.map((q, index) => (
        <div key={index} style={styles.questionContainer}>
          <p style={styles.questionText}>
            {q.text}
            {q.required && <span style={{ color: "red" }}> *</span>}
          </p>
          {q.type === "text" && (
            <input
              type="text"
              value={answers[index] || ""}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              style={styles.input}
              required={q.required}
            />
          )}

          {q.type === "radio" &&
            q.options.map((option, i) => (
              <label key={i} style={styles.checkboxRadio}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  required={q.required}
                />{" "}
                {option}
              </label>
            ))}

          {q.type === "checkbox" &&
            q.options.map((option, i) => (
              <label key={i} style={styles.checkboxRadio}>
                <input
                  type="checkbox"
                  value={option}
                  checked={answers[index]?.includes(option)}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  required={q.required}
                />{" "}
                {option}
              </label>
            ))}
        </div>
      ))}
      <button
        onClick={submitAnswers}
        style={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Submit
      </button>
    </div>
  );
}

export default Mains;
