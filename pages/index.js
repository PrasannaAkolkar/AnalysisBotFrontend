import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.loginButton} onClick={handleGetStarted} style={{textAlign:'center'}}>Login</button>
      </header>

      <img src="/main.png" alt="Place Order" className={styles.topimg}/>

      <h1 className={styles.title}>Welcome to TradingBot!</h1>
      <p className={styles.description}>
        Take your trading to the next level with our advanced trading bot. Let our AI-powered algorithms analyze the market and execute trades on your behalf, helping you maximize your profits in the stock market.
      </p>
      <div className={styles.features}>
        <div className={styles.feature}>
          <img src="/buy_sell2.png" alt="Place Order" className={styles.icon} />
          <h2>Place Orders</h2>
          <p>Create and place buy or sell orders with ease. Our intuitive interface makes it simple to execute trades in real-time.</p>
        </div>
        <div className={styles.feature}>
          <img src="analytics4.svg" alt="Market Analysis" className={styles.icon} />
          <h2>Advanced Analytics</h2>
          <p>Gain insights into market trends and make informed decisions with our comprehensive analytics tools.</p>
        </div>
        <div className={styles.feature}>
          <img src="watchlist.webp" alt="Watchlist" className={styles.icon} />
          <h2>Create Watchlists</h2>
          <p>Stay updated with your favorite stocks by creating watchlists and receiving real-time updates on their performance.</p>
        </div>
        <div className={styles.feature}>
          <img src="bot2.png" alt="Watchlist" className={styles.icon} />
          <h2>Access the Bot</h2>
          <p>Get access to the trade bot and download the backtest report for the specific strategy</p>
        </div>
        <div className={styles.feature}>
          <img src="learn2.webp" alt="Watchlist" className={styles.icon} />
          <h2>Learn Trading Strategies</h2>
          <p>Learn strategies that are tried and tested in the stock markets and become a hero in trading</p>
        </div>
      </div>
      <button className={styles.ctaButton} onClick={handleGetStarted}>Get Started</button>
    </div>
  );
};

export default Home;
