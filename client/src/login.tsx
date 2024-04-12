import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './form.css'
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = ({}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Email Regex
    const emailRegex = /[A-Za-z0-9_-]+@[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/
    
    // Testing validation
    const validEmailTest = emailRegex.test(email);

    const errors = [];

    if (!validEmailTest) {
        errors.push("Must enter a valid email.")
    }

    if (validEmailTest) {
      const response = await fetch(`http://assignment4-staging.eba-mmp6gemp.us-east-1.elasticbeanstalk.com/authentication/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
        password: password
        })
      });
      if (!response.ok) {
        toast.error("Connection Issue.")
      }
      else {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('jwtToken', token);
        toast.success("Login Complete!");
        setTimeout(() => {
          //window.location.href = '/home';
          navigate('/home');
        }, 2000);
      }
    } else {
        // Error
        toast.error(errors.join(" "));
    }
  };

  return (
    <div className="form-container">
      <div className='form-wrapper'>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" >Login</button>
      </form>
      <p>Don't have an account? <a onClick={() => navigate("/register")}>Register</a></p>
      <ToastContainer />
      </div>
    </div>
  );
};

export default LoginForm;