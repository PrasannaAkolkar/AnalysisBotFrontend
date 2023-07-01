// components/LoginForm.js

import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValid , setPasswordValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'Prasanna' && password === 'Prasanna') {
      console.log('Login');
      setPasswordValid(true)
      router.push('/dashboard'); 
    } else {
      console.log('Invalid credentials');
      setPasswordValid(false)
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className={styles.loginForm}>
     

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      <button
          type="submit"
        >Login</button> 
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
