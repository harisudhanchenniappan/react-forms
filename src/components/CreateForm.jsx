import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateForm() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", required: false, type: "text", options: [] },
  ]);

  const [username, setUsername] = useState(null);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    console.log(typeof username, username);
  }, []);

  const navigate = useNavigate();

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[index].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", required: false, type: "text", options: [] },
    ]);
  };

  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const submitForm = async () => {
    try {
      const response = await axios.post("https://react-forms-ltej.onrender.com/forms", {
        title,
        questions,
        username,
      });
      alert(`Form created! Share this link: https://reactforms1611.netlify.app/form/${response.data.id}`);
      navigate("/home");
    } catch (error) {
      console.error("Error creating form:", error);
      alert("Failed to create form.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "'Arial', sans-serif",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Create Form
      </h2>
      <input
        type="text"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontSize: "16px",
        }}
      />
      {questions.map((q, index) => (
        <div
          key={index}
          style={{
            marginBottom: "20px",
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "5px",
            backgroundColor: "#fff",
          }}
        >
          <input
            type="text"
            placeholder={`Question ${index + 1}`}
            value={q.text}
            onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          />
          <div style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "14px", marginRight: "10px" }}>
              Required:
              <input
                type="radio"
                name={`required-${index}`}
                checked={q.required}
                onChange={() => handleQuestionChange(index, "required", true)}
                style={{ marginLeft: "5px" }}
              />
              Yes
            </label>
            <label style={{ fontSize: "14px" }}>
              <input
                type="radio"
                name={`required-${index}`}
                checked={!q.required}
                onChange={() => handleQuestionChange(index, "required", false)}
                style={{ marginLeft: "5px" }}
              />
              No
            </label>
          </div>
          <select
            value={q.type}
            onChange={(e) => handleQuestionChange(index, "type", e.target.value)}
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
              marginBottom: "10px",
              display: "block",
            }}
          >
            <option value="text">Text</option>
            <option value="radio">Multiple Choice</option>
            <option value="checkbox">Checkbox</option>
          </select>
          {(q.type === "radio" || q.type === "checkbox") && (
            <div style={{ marginBottom: "10px" }}>
              <label style={{ fontSize: "14px" }}>Options:</label>
              {q.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(index, optionIndex, e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    margin: "5px 0",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              ))}
              <button
                onClick={() => {
                  const newQuestions = [...questions];
                  newQuestions[index].options.push("");
                  setQuestions(newQuestions);
                }}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#3498db",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Add Option
              </button>
            </div>
          )}
          <button
            onClick={() => deleteQuestion(index)}
            style={{
              backgroundColor: "#e74c3c",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              borderRadius: "3px",
              cursor: "pointer",
              fontSize: "14px",
              marginTop: "10px",
            }}
          >
            Delete Question
          </button>
        </div>
      ))}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={addQuestion}
          style={{
            padding: "10px 15px",
            backgroundColor: "#27ae60",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Add Question
        </button>
        <button
          onClick={submitForm}
          style={{
            padding: "10px 15px",
            backgroundColor: "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            marginLeft: "10px",
          }}
        >
          Save Form
        </button>
      </div>
    </div>
  );
}

export default CreateForm;
