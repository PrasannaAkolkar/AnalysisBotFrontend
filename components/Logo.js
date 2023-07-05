import React from 'react';
import Image from 'next/image';
import styles from '../styles/Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Image src="/laptop2.webp" alt="Your Logo" width={150} height={130} />
    </div>
  );
};

export default Logo;
