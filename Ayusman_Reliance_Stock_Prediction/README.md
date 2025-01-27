# Reliance Stock Price Prediction Project

## Project Overview
This project aims to predict the stock prices of Reliance Industries using various machine learning models. The goal is to provide accurate predictions to help investors make informed decisions.

## Features
- Data collection and preprocessing
- Exploratory data analysis
- Model training and evaluation
- Stock price prediction

## Project Structure
```
├── stock_price.ipynb          # Main Jupyter notebook containing analysis and model
├── reliance_stock_data.csv    # Historical stock data
└── xgb_model.model           # Saved XGBoost model
```

## Data Preparation
The data preparation involves collecting historical stock data, cleaning, and preprocessing it to make it suitable for training the model.

## Exploratory Data Analysis
Exploratory data analysis includes visualizing the stock price over time, daily returns, trading volume, and statistical features like moving averages and volatility.

## Model Building
- Algorithm: XGBoost Regressor

- Features:
    - Log volume
    - 20-day volatility
    - 50-day moving average
    - 200-day moving average
    - Lagged returns (1-day, 2-day)
    - 20-day historical volatility

- Performance Metrics:
    - RMSE: 0.0127
    - Directional Accuracy: 52.91%

## Evaluation
The model is evaluated using metrics like RMSE, MAE, R², and directional accuracy.

## Future Improvements
- Add sentiment analysis features
- Implement ensemble methods
- Incorporate fundamental data
- Explore deep learning approaches

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

