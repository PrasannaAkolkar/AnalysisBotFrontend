import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/LineChart.module.css';

const LineChart = ({ data, width, height }) => {
  const canvasRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const prices = data.map((item) => item.price);
    const high = Math.max(...prices);
    const low = Math.min(...prices);

    const xInterval = width / (data.length - 1);

    context.clearRect(0, 0, width, height);

    // Draw chart line
    context.strokeStyle = styles.line;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(0, height - ((data[0].price - low) / (high - low)) * height);

    data.forEach((item, index) => {
      const x = index * xInterval;
      const y = height - ((item.price - low) / (high - low)) * height;
      context.lineTo(x, y);
    });

    context.stroke();

    // Draw data points
    context.fillStyle = styles.point;
    data.forEach((item, index) => {
      const x = index * xInterval;
      const y = height - ((item.price - low) / (high - low)) * height;
      context.beginPath();
      context.arc(x, y, 4, 0, Math.PI * 2);
      context.fill();
    });
  }, [data, width, height]);

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
  
    const index = Math.floor((x / width) * (data.length - 1));
    const { price, date } = data[index];
    const y = height - ((price - Math.min(...data.map((item) => item.price))) / (Math.max(...data.map((item) => item.price)) - Math.min(...data.map((item) => item.price)))) * height;
  
    setTooltip({ x, y, price, date });
  };
  

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className={styles.chartContainer}>
      <canvas
        ref={canvasRef}
        className={styles.chart}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      {tooltip && (
  <div className={styles.tooltip} style={{ top: tooltip.y, left: tooltip.x }}>
    <span className={styles.tooltipText}>
      Date: {tooltip.date}<br />
      Price: {tooltip.price}
    </span>
  </div>
)}

    </div>
  );
};

export default LineChart;
