import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useWasteData } from '../../context/WasteDataContext';
export const AIForecastChart: React.FC = () => {
  const {
    wasteData,
    getForecast
  } = useWasteData();
  const forecast = getForecast();
  // Prepare historical data
  const historicalData = wasteData.sort((a, b) => new Date(a.collection_date).getTime() - new Date(b.collection_date).getTime()).map(item => ({
    date: new Date(item.collection_date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    }),
    amount: item.waste_amount
  }));
  // Generate future dates for forecasting
  const lastDate = new Date(wasteData[wasteData.length - 1]?.collection_date || new Date());
  const futureData = Array.from({
    length: 6
  }, (_, i) => {
    const date = new Date(lastDate);
    date.setMonth(date.getMonth() + i + 1);
    return {
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      }),
      forecast: forecast.nextMonthEstimate * (1 + i * forecast.prediction / 100)
    };
  });
  const confidenceInterval = forecast.confidence * 100;
  return <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className={`inline-block w-3 h-3 rounded-full ${forecast.trend === 'increasing' ? 'bg-red-500' : forecast.trend === 'decreasing' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
            <span className="font-medium">
              {forecast.trend.charAt(0).toUpperCase() + forecast.trend.slice(1)}{' '}
              Trend
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Confidence: {confidenceInterval.toFixed(1)}%
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium">Next Month Estimate</p>
          <p className="text-lg font-bold text-green-600">
            {forecast.nextMonthEstimate.toFixed(1)} tons
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={[...historicalData, ...futureData]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#3B82F6" name="Historical Data" strokeWidth={2} />
          <Line type="monotone" dataKey="forecast" stroke="#F59E0B" strokeDasharray="5 5" name="AI Forecast" />
        </LineChart>
      </ResponsiveContainer>
    </div>;
};