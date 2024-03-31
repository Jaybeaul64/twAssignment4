import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './form.css'
const RegisterForm: React.FC = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [favoriteGenre, setFavoriteGenre] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(event.target.value);
  };

  const handlefavoriteGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFavoriteGenre(event.target.value);
  }

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsChecked(event.target.checked);
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Email Regex
    const emailRegex = /[A-Za-z0-9_-]+@[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/
    // Password Regexes
    const passwordSizeRegex = /^.{8,}$/
    const passwordLowercaseRegex = /[a-z]/;
    const passwordUppercaseRegex = /[A-Z]/;
    const passwordSpecialCharacterRegex = /[^A-Za-z0-9]+/
    
    // Testing validation
    const validEmailTest = emailRegex.test(email)
    const passwordSizeTest = passwordSizeRegex.test(password);
    const passwordLowercaseTest = passwordLowercaseRegex.test(password);
    const passwordUppercaseTest = passwordUppercaseRegex.test(password);
    const passwordSpecialCharacterTest = passwordSpecialCharacterRegex.test(password);
    const passwordConfirmTest = password === passwordConfirm;

    const errors = [];

    if (!validEmailTest) {
        errors.push("Must enter a valid email.")
    }

    if (!passwordSizeTest) {
        errors.push("Password must be at least 8 characters long.");
    }

    if (!passwordLowercaseTest) {
        errors.push("Password must contain at least one lowercase letter.");
    }

    if (!passwordUppercaseTest) {
        errors.push("Password must contain at least one uppercase letter.");
    }

    if (!passwordSpecialCharacterTest) {
        errors.push("Password must contain at least one special character.");
    }

    if (!passwordConfirmTest) {
      errors.push("Passwords must match.")
    }

    if (!favoriteGenre) {
      errors.push("Favorite genre must be selected.")
    }

    if (validEmailTest && passwordSizeTest && passwordLowercaseTest && passwordUppercaseTest && passwordSpecialCharacterTest && passwordConfirmTest && favoriteGenre) {
        // Success
        setEmail('');
        setPassword('');
        setPasswordConfirm(' ');
        setFavoriteGenre(' ');
        toast.success("Registration Complete!");
        // HTTP REQUEST GOES HERE
    } else {
        // Error
        toast.error(errors.join(" "));
    }
  };

  return (
    <div className="form-container">
      <div className='form-wrapper'>
      <h2>Register</h2>
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
        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm Password:</label>
          <input
            type="password"
            id="passwordConfirm"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            required  
          />
        </div>
        <div className="form-group">
          <label htmlFor="favoriteGenre">Select an option:</label>
          <select id="favoriteGenre" value={favoriteGenre} onChange={handlefavoriteGenreChange} required>
            <option value="">Favorite movie genre</option>
            <option value="drama">Drama</option>
            <option value="comedy">Comedy</option>
            <option value="action">Action</option>
            <option value="sciFi">Sci-fi</option>
            <option value="animation">Animation</option>
            <option value="history">History</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
          </select>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={termsChecked}
              onChange={handleTermsChange}
              required
            />
            I agree to the terms and conditions
          </label>
        </div>
        <button type="submit" disabled={!termsChecked}>Register</button>
      </form>
      <ToastContainer />
      </div>
    </div>
  );
};

export default RegisterForm;