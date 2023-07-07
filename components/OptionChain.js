import React, { useState,useRef  } from 'react';
import styles from '../styles/OptionChain.module.css';

const OptionChain = ({ callPayload, putPayload }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const optionChainRef = useRef(null);
    const isDraggingRef = useRef(false);
    const prevPositionRef = useRef({ x: 0, y: 0 });
  
    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };
  
    const handleMouseDown = (event) => {
      event.stopPropagation();
      isDraggingRef.current = true;
      prevPositionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };
  
    const handleMouseMove = (event) => {
      if (isDraggingRef.current) {
        const deltaX = event.clientX - prevPositionRef.current.x;
        const deltaY = event.clientY - prevPositionRef.current.y;
        const newPosition = {
          x: position.x + deltaX,
          y: position.y + deltaY,
        };
        setPosition(newPosition);
        prevPositionRef.current = {
          x: event.clientX,
          y: event.clientY,
        };
      }
    };
  
    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };
     
  return (
    <div
      className={`${styles.optionChainContainer} ${isCollapsed ? styles.collapsed : ''}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)`, marginTop:"8%" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={optionChainRef}
    >
      <div className={styles.optionChainHeader} onClick={handleToggleCollapse}>
        <h3 className={styles.optionChainTitle}>Option Chain</h3>
        <div className={styles.collapseIcon}>{isCollapsed ? '+' : '-'}</div>
      </div>
      <h4>
        {callPayload[0]?.stock_code} - {callPayload[0]?.spot_price}
      </h4>
      <div className={styles.optionChainContent}>
                <div className={styles.column}>
                    <h4 className={styles.columnTitle}>Call - OI</h4>
                    <table className={styles.optionChainTable}>
                        <tbody>
                            {callPayload.map((option) => (
                                <tr key={option.strike_price}>
                                    <td>{option.open_interest}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.column}>
                    <h4 className={styles.columnTitle}>Strike Price</h4>
                    <table className={styles.optionChainTable}>
                        <tbody>
                            {putPayload.map((option) => (
                                <tr key={option.strike_price}>
                                    <td>{option.strike_price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.column}>
                    <h4 className={styles.columnTitle}>Put - OI</h4>
                    <table className={styles.optionChainTable}>
                        <tbody>
                            {putPayload.map((option) => (
                                <tr key={option.strike_price}>
                                    <td>{option.open_interest}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    </div>
  );
};

export default OptionChain;
