import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/LineChart.module.css';

const LineChart = ({ data, width, height}) => {
  const canvasRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      const prices = data.map((item) => item.price);
      const high = Math.max(...prices);
      const low = Math.min(...prices);

      const xInterval = width / (data.length - 1);
      const controlPointFactor = 0.4; // Adjust the curve smoothness (0.1 to 1)

      context.clearRect(0, 0, width, height);

      // Draw chart line
      context.strokeStyle = styles.line;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(0, height - ((data[0].price - low) / (high - low)) * height);

      data.forEach((item, index) => {
        const x = index * xInterval;
        const y = height - ((item.price - low) / (high - low)) * height;

        if (index === 0) {
          // Set the first point as the starting point of the curve
          context.lineTo(x, y);
        } else {
          const prevX = (index - 1) * xInterval;
          const prevY = height - ((data[index - 1].price - low) / (high - low)) * height;

          // Calculate control points for the curve
          const cpx1 = prevX + (x - prevX) * controlPointFactor;
          const cpy1 = prevY;
          const cpx2 = prevX + (x - prevX) * (1 - controlPointFactor);
          const cpy2 = y;

          // Draw the curve
          context.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y);
        }
      });

      context.stroke();
    }
  }, [data, width, height]);

  const handleMouseMove = (event) => {
    if (data && data.length > 0) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;

      const index = Math.floor((x / width) * (data.length - 1));
      const { price, date } = data[index];
      const y = height - ((price - Math.min(...data.map((item) => item.price))) / (Math.max(...data.map((item) => item.price)) - Math.min(...data.map((item) => item.price)))) * height;

      setTooltip({ x, y, price, date });
    }
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
        <div className={styles.tooltip} style={{ top: 0, left: tooltip.x }}>
          <span className={styles.tooltipText}>
            Date: {tooltip.date}<br />
            Price: {tooltip.price}
          </span>
          <div className={styles.tooltipLine} style={{ height }} />
        </div>
      )}
    </div>
  );
};

export default LineChart;
