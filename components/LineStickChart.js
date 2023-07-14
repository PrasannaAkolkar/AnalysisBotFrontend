import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/LineChart.module.css';

const LineChart = ({ data, width, height }) => {
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
      context.strokeStyle = 'black';
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

      // Find the top 4 high points (spaced every 90 days)
      const highPoints = [];
      for (let i = 0; i < 2; i++) {
        const startIndex = i * 150;
        const endIndex = startIndex + 150;
        const segmentData = data.slice(startIndex, endIndex + 1);
        const segmentHigh = Math.max(...segmentData.map((item) => item.price));
        highPoints.push(segmentHigh);
      }

      // Find the top 4 low points (spaced every 90 days)
      const lowPoints = [];
      for (let i = 0; i < 2; i++) {
        const startIndex = i * 150;
        const endIndex = startIndex + 150;
        const segmentData = data.slice(startIndex, endIndex + 1);
        const segmentLow = Math.min(...segmentData.map((item) => item.price));
        lowPoints.push(segmentLow);
      }

      // Draw horizontal lines for high points
      context.strokeStyle = 'black';
      context.lineWidth = 1;

      highPoints.forEach((point) => {
        const y = height - ((point - low) / (high - low)) * height;

        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      });

      // Draw horizontal lines for low points
      context.strokeStyle = 'black';

      lowPoints.forEach((point) => {
        const y = height - ((point - low) / (high - low)) * height;

        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      });

      // Calculate the exponential moving average (EMA) for each point
      const ema_val = 50
      const emaData = calculateEMA(data, ema_val);
      const emaData200 = calculateEMA(data, 50);
      // Draw the EMA curve
      context.strokeStyle = 'black';
      context.lineWidth = 1;
      context.beginPath();

      emaData.forEach((ema, index) => {
        const x = index * xInterval;
        const y = height - ((ema - low) / (high - low)) * height;

        if (index === 0) {
          
          context.moveTo(x, y);
        } else {
          const prevX = (index - 1) * xInterval;
          const prevY = height - ((emaData[index - 1] - low) / (high - low)) * height;

          const cpx1 = prevX + (x - prevX) * controlPointFactor;
          const cpy1 = prevY;
          const cpx2 = prevX + (x - prevX) * (1 - controlPointFactor);
          const cpy2 = y;

          context.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y);
        }
      });
      // emaData200.forEach((ema, index) => {
      //   const x = index * xInterval;
      //   const y = height - ((ema - low) / (high - low)) * height;

      //   if (index === 0) {
      //     context.moveTo(x, y);
      //   } else {
      //     const prevX = (index - 1) * xInterval;
      //     const prevY = height - ((emaData200[index - 1] - low) / (high - low)) * height;

      //     const cpx1 = prevX + (x - prevX) * controlPointFactor;
      //     const cpy1 = prevY;
      //     const cpx2 = prevX + (x - prevX) * (1 - controlPointFactor);
      //     const cpy2 = y;

      //     context.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y);
      //   }
      // });
      context.stroke();
    }
  }, [data, width, height]);

  const handleMouseMove = (event) => {
    if (data && data.length > 0) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;

      const index = Math.floor((x / width) * (data.length - 1));

      if (data[index]) {
        const { price, date } = data[index];
        const y =
          height -
          ((price - Math.min(...data.map((item) => item.price))) /
            (Math.max(...data.map((item) => item.price)) -
              Math.min(...data.map((item) => item.price)))) *
            height;

        setTooltip({ x, y, price, date });
      }
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  // Function to calculate the Exponential Moving Average (EMA) for a given number of periods
  const calculateEMA = (data, periods) => {
    const emaData = [];
    const multiplier = 2 / (periods + 1);

    for (let i = 0; i < data.length; i++) {
      if (i < periods) {
        emaData.push(null);
      } else if (i === periods) {
        let sum = 0;
        for (let j = i - periods; j <= i; j++) {
          sum += data[j].price;
        }
        const ema = sum / periods;
        emaData.push(ema);
      } else {
        const ema = (data[i].price - emaData[i - 1]) * multiplier + emaData[i - 1];
        emaData.push(ema);
      }
    }

    return emaData;
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
