// index.js

import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import LoginForm from '../components/LoginForm';

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trade Analysis Bot</title>
      </Head>
      <div className={styles.content}>
        <img src="/tradebot2.avif" alt="Trade Analysis" className={styles.image} />
        <h1 className={styles.title}>Trade Analysis Bot</h1>
        <p className={styles.description}>Login to access the Trade Analysis Dashboard</p>
        <LoginForm />
      </div>
    </div>
  );
};

export default Home;
