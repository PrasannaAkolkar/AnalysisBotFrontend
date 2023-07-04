import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/TradingStrategiesPage.module.css';
import { useRouter } from 'next/router';
import { strategies } from '@/utils/strategy';

const TradingStrategiesPage = () => {
  const [activePage, setActivePage] = useState(1);
  const strategiesPerPage = 2;
  const totalPages = Math.ceil(strategies.length / strategiesPerPage);
  const startIndex = (activePage - 1) * strategiesPerPage;
  const endIndex = startIndex + strategiesPerPage;
  const displayedStrategies = strategies.slice(startIndex, endIndex);

  const router = useRouter();

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleClickRedirection = (link) => {
    router.push(link);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trading Strategies</h1>
      <div className={styles.strategyList}>
        {displayedStrategies.map((strategy, index) => (
          <div key={index} className={styles.strategy}>
            <div className={styles.strategyImage} onClick={() => handleClickRedirection(strategy.redirectionLink)}>
              <Image src={strategy.imageUrl} alt={strategy.name} width={400} height={300} style={{ width: "-webkit-fill-available" }} />
            </div>
            <div className={styles.strategyDetails}>
              <h2 className={styles.strategyName}>{strategy.name}</h2>
              <p className={styles.strategyDescription}>{strategy.description}</p>
              <div className={styles.ruleSection}>
                <h3 className={styles.sectionTitle}>Rules:</h3>
                <ul className={styles.ruleList}>
                  {strategy.rules.map((rule, index) => (
                    <li key={index} className={styles.ruleItem}>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
              <p className={styles.target}><strong>Target:</strong> {strategy.target}</p>
              <p className={styles.stopLoss}><strong>Stop Loss:</strong> {strategy.stopLoss}</p>
              <p className={styles.accuracy}><strong>Accuracy: </strong>{strategy.accuracy}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pageNavigation}>
        <ul className={styles.pageTabs}>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <li
              key={page}
              className={`${styles.pageTab} ${activePage === page ? styles.active : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TradingStrategiesPage;
  