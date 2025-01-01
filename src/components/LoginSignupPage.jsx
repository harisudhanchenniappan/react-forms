import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LoginSignupPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const response = await axios.post('https://react-forms-ltej.onrender.com/login', {
          username: formData.username,
          password: formData.password,
        });
        localStorage.setItem('username', formData.username);
        alert('Login successful!');
        setIsLoggedIn(true);
        console.log('Login response:', response.data);
      } else {
        const response = await axios.post('https://react-forms-ltej.onrender.com/signup', {
          username: formData.username,
          password: formData.password,
          email: formData.email,
        });
        alert('Signup successful! You can now log in.');
        console.log('Signup response:', response.data);
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      if (error.response?.data.error === 'Username already exists.') {
        alert('Username already exists. Try a different username.');
      } else if (error.response?.data.error === 'Invalid username or password.') {
        alert('Invalid username or password.');
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Roboto', sans-serif",
    },
    title: {
      color: '#2c3e50',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '1.5rem',
    },
    buttonPrimary: {
      width: '100%',
      padding: '0.8rem',
      backgroundColor: '#3498db',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontWeight: 'bold',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    toggleButton: {
      color: '#3498db',
      backgroundColor: 'transparent',
      border: 'none',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    link: {
      textDecoration: 'none',
      color: '#fff',
    },
    loggedInContainer: {
      textAlign: 'center',
      marginTop: '2rem',
    },
    loggedInButton: {
      backgroundColor: '#2ecc71',
      color: '#fff',
      padding: '0.8rem 1.5rem',
      textDecoration: 'none',
      borderRadius: '5px',
      fontWeight: 'bold',
      fontSize: '1rem',
      cursor: 'pointer',
    },
  };

  if (isLoggedIn) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Successfully Logged In</h2>
        <p>
          Welcome, <strong>{formData.username}</strong>!
        </p>
        <Link to={`/home`} style={styles.loggedInButton}>
          Click Here!!
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3" style={{margin:'20px'}}>
          <label htmlFor="username" className="form-label" >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            style={{marginLeft:'20px'}}
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        {!isLogin && (
          <div className="mb-3" style={{margin:'20px'}}>
            <label htmlFor="email" className="form-label">
              Email &emsp; &nbsp;      
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              style={{marginLeft:'20px'}}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="mb-3" style={{margin:'20px'}}>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            style={{marginLeft:'20px'}}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={styles.buttonPrimary}>
          {isLogin ? 'Login' : 'Signup'}
        </button>
      </form>
      <p className="mt-3 text-center">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          type="button"
          style={styles.toggleButton}
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin ? 'Signup here' : 'Login here'}
        </button>
      </p>
    </div>
  );
}

export default LoginSignupPage;
