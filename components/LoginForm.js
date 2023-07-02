// components/LoginForm.js

import React, { useEffect, useState } from 'react';
import styles from '../styles/Login.module.css';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    
    const data = await response.json();
    console.log("response" , data)
    if(data['Login'] === "True"){
      console.log('Login Successful');
      localStorage.setItem('userLoggedIn' , true)
      router.push('/hammer');
    }else{
      console.log('Invalid credentials');
      localStorage.setItem('userLoggedIn' , false)
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
