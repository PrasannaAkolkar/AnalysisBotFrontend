export const strategies = [
  {
    name: 'Cup & Handle Strategy',
    description: 'The pattern resembles a cup and handle formation, where the cup represents a rounded bottom and the handle denotes a small consolidation period. The cup and handle pattern in stock market charts can be categorized into two types: the general cup and handle pattern and the inverted cup and handle pattern. These patterns signify specific formations observed during price movements. The general cup and handle pattern exhibits a rounded bottom followed by a consolidation phase, while the inverted cup and handle pattern displays an upside-down version of this structure. Traders analyze these patterns as potential indications of future price trends, guiding their decision-making in the market.',
    rules: [
      'The pattern should be seen as a distinct setup on the chart and not just imagined or forced.', 
      'There should be no significant obstacles such as support or resistance levels blocking the price from reaching its target',
      'It is advantageous for the market to exhibit a trending behavior rather than being in a sideways or range-bound movement',
      '5 minute timeframe is preferred',
      'Never take a trade if risk-reward ratio is less than 1.5',
      'Enter only once you find the closing of the 5 min candle above the handle'
    ],
    target: 'T1: Height of the cup, T2: Trailing till support/resistance levels',
    stopLoss: 'Handle low/high',
    accuracy: '80%',
    imageUrl: '/cup_handle_2.png',
    redirectionLink: '/hammer',
  },
  {
    name: 'Modified Fibonacci Setup',
    description: 'The Fibonacci setup in trading involves the application of Fibonacci ratios and levels derived from the Fibonacci sequence. This setup is generally useful to catch a trending move in either bullish or bearish direction',
    rules: [
      'The Fibonacci setup is particularly effective in the Nifty index.', 
      'To initiate the setup, a minimum price gap of 100 points, either upward or downward, is required ',
      'Traders should identify a swing 30 minutes after the market opens.',
      'The setup focuses on finding market fight (price action) above or below the 50% Fibonacci level.',
      'If the fight is above the 50% level, it suggests a bullish bias, while below the 50% level indicates a bearish bias',
      'For bullish trades, traders should enter once the days high is breached; for bearish trades, entry is triggered by breaking the days low.',
      'It is important to wait for the candle to close above or below the desired levels before entering the trade',
      'The setup is applied on a 5-minute timeframe for optimal analysis and decision-making.'
    ],
    target: 'T1: 45-50 points, T2: Trailing till support/resistance levels',
    stopLoss: '25-30 points',
    accuracy: '80%',
    imageUrl: '/modified_fibo.png',
    redirectionLink: '/hammer',
  },
  {
    name: 'Head & Shoulder Pattern',
    description: 'The Head and Shoulders pattern is a popular technical analysis formation that signals a potential reversal in the market trend. It consists of a central peak (the head) flanked by two smaller peaks (the shoulders) on either side. Head & Shoulders pattern can either be a general one or an inverted one.',
    rules: [
      'The pattern should be seen as a distinct setup on the chart and not just imagined or forced.', 
      'There should be no significant obstacles such as support or resistance levels blocking the price from reaching its target',
      'It is advantageous for the market to exhibit a trending behavior rather than being in a sideways or range-bound movement',
      '5 minute timeframe is preferred',
      'Never take a trade if risk-reward ratio is less than 1.5',
      'Get into the trade once the neckline is broken and a candle is closed above (in case of normal head and shoulders) /below (in case of inverted head and shoulders)',
      
    ],
    target: 'T1: Height of the head, T2: Trailing till support/resistance levels',
    stopLoss: 'Shoulder low/high',
    accuracy: '80%',
    imageUrl: '/head_shoulder_2.jpg',
    redirectionLink: '/hammer',
  },
  {
    name: 'W/M Pattern',
    description: 'The W and M patterns in the stock market are reversal patterns that resemble the letters "W" and "M" respectively. The W pattern indicates a potential bullish reversal, while the M pattern suggests a possible bearish reversal. These patterns are formed by a series of price movements and are commonly used by traders to identify potential buying or selling opportunities.',
    rules: [
      'The M and W patterns have completely opposite rules',
      'For the M pattern, the market should have a continuous upward movement towards a resistance level',
      'Identify the highest point reached by a candle and take note of its value',
      'Wait for the market to retrace back near the previous high, creating a neckline',
      'Draw a line below the neckline at a distance of the recorded value multiplied by 0.001',
      'Enter the bearish position once the candle crosses this line',
      'The pattern should be seen as a distinct setup on the chart and not just imagined or forced.', 
      'It is advantageous for the market to exhibit a trending behavior rather than being in a sideways or range-bound movement',
      '5 minute timeframe is preferred',
      'Never take a trade if risk-reward ratio is less than 1.5',
      'Primary advantage of this setup is to grab a huge target with a negligible stoploss',
      
    ],
    target: 'T1: Neckline, T2: Trailing till support/resistance levels',
    stopLoss: 'Just above the resistance/support line',
    accuracy: '80%',
    imageUrl: '/M_W_Pattern.png',
    redirectionLink: '/hammer',
  }
  // Add more strategies here
];