import React, { useState, useEffect } from "react";
import axios from "axios";

function Responses() {
  const [forms, setForms] = useState([]);
  const [responses, setResponses] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (!user) {
      alert("Please log in.");
      return;
    }
    setUsername(user);
  }, []);

  useEffect(() => {
    if (username) {
      axios
        .get(`https://react-forms-ltej.onrender.com/forms?username=${username}`)
        .then((response) => setForms(response.data))
        .catch((error) => console.error("Error fetching forms:", error));
    }
  }, [username]);

  const fetchResponses = (formId) => {
    axios
      .get(`https://react-forms-ltej.onrender.com/forms/${formId}/responses`)
      .then((response) => {
        setSelectedForm(formId);
        setResponses(response.data);
      })
      .catch((error) => console.error("Error fetching responses:", error));
  };

  const getQuestions = (formId) => {
    const form = forms.find((form) => form._id === formId);
    return form ? form.questions : [];
  };

  const deleteResponse = (formId, responseId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this response?");
    if (confirmDelete) {
      axios
        .delete(`https://react-forms-ltej.onrender.com/forms/${formId}/responses/${responseId}`)
        .then((response) => {
          alert("Response deleted successfully.");
          setResponses(response.data);
        })
        .catch((error) => {
          console.error("Error deleting response:", error);
          alert("Failed to delete the response.");
        });
    }
  };

  const deleteForm = (formId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this form?");
    if (confirmDelete) {
      axios
        .delete(`https://react-forms-ltej.onrender.com/forms/${formId}`)
        .then(() => {
          alert("Form deleted successfully.");
          setForms((prevForms) => prevForms.filter((form) => form._id !== formId));
          if (selectedForm === formId) {
            setSelectedForm(null);
            setResponses([]);
          }
        })
        .catch((error) => {
          console.error("Error deleting form:", error);
          alert("Failed to delete the form.");
        });
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", fontWeight: "bold" }}>Form Responses</h2>
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#555" }}>All Forms</h3>
        {forms.length === 0 ? (
          <p style={{ color: "#888" }}>No forms created yet.</p>
        ) : (
          <ol>
            {forms.map((form) => (
              <li key={form._id} style={{ marginBottom: "10px" }}>
                <a
                  href={`http://localhost:5173/form/${form._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "#3498db", fontWeight: "bold" }}
                >
                  {form.title || "Untitled Form"}
                </a>
                <button
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#3498db",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => fetchResponses(form._id)}
                >
                  View Responses
                </button>
                <button
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteForm(form._id)}
                >
                  Delete Form
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>

      {selectedForm && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "#555" }}>
            Responses for:{" "}
            <span style={{ color: "#333", fontWeight: "bold" }}>
              {forms.find((form) => form._id === selectedForm)?.title || "Unknown Form"}
            </span>
          </h3>
          {responses.length > 0 ? (
            <table
              border="1"
              cellPadding="10"
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                marginTop: "15px",
              }}
            >
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#f2f2f2", padding: "10px" }}>#</th>
                  {getQuestions(selectedForm).map((question, idx) => (
                    <th
                      key={idx}
                      style={{
                        backgroundColor: "#f2f2f2",
                        padding: "10px",
                        fontWeight: "bold",
                        color: "#555",
                      }}
                    >
                      {question.text || "Untitled Question"}
                    </th>
                  ))}
                  <th style={{ backgroundColor: "#f2f2f2", padding: "10px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((response, index) => (
                  <tr key={response._id}>
                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{index + 1}</td>
                    {response.answers.map((answer, idx) => (
                      <td
                        key={idx}
                        style={{ padding: "10px", borderBottom: "1px solid #ddd", color: "#555" }}
                      >
                        {answer || "No Answer"}
                      </td>
                    ))}
                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                      <button
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#e74c3c",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => deleteResponse(selectedForm, response._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: "#888", marginTop: "10px" }}>
              No responses recorded yet for this form.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Responses;
