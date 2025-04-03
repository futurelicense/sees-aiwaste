import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useWasteData } from '../../context/WasteDataContext';
export const WastePredictionChart: React.FC = () => {
  const {
    wasteData
  } = useWasteData();
  const predictionData = useMemo(() => {
    if (wasteData.length === 0) return [];
    // Get the last 30 days of data and calculate average daily increase
    const sortedData = [...wasteData].sort((a, b) => new Date(b.collection_date).getTime() - new Date(a.collection_date).getTime());
    const dailyTotals = sortedData.reduce((acc, item) => {
      const date = item.collection_date.split('T')[0];
      acc[date] = (acc[date] || 0) + Number(item.waste_amount);
      return acc;
    }, {} as {
      [key: string]: number;
    });
    const dailyData = Object.entries(dailyTotals).map(([date, amount]) => ({
      date,
      amount
    }));
    // Calculate average daily increase
    let avgIncrease = 0;
    if (dailyData.length > 1) {
      avgIncrease = (dailyData[0].amount - dailyData[dailyData.length - 1].amount) / dailyData.length;
    }
    // Generate predictions for next 30 days
    const lastDate = new Date(dailyData[0].date);
    const predictions = Array.from({
      length: 30
    }, (_, i) => {
      const date = new Date(lastDate);
      date.setDate(date.getDate() + i + 1);
      return {
        date: date.toISOString().split('T')[0],
        prediction: dailyData[0].amount + avgIncrease * (i + 1)
      };
    });
    return [...dailyData.slice(0, 30).map(d => ({
      date: d.date,
      actual: d.amount,
      prediction: null
    })), ...predictions.map(d => ({
      date: d.date,
      actual: null,
      prediction: d.prediction
    }))];
  }, [wasteData]);
  if (predictionData.length === 0) {
    return <div className="h-full flex items-center justify-center text-gray-500">
        No data available
      </div>;
  }
  return <ResponsiveContainer width="100%" height="100%">
      <LineChart data={predictionData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={date => new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })} />
        <YAxis />
        <Tooltip formatter={(value: number) => `${value?.toFixed(1) || 0} tons`} />
        <Legend />
        <Line type="monotone" dataKey="actual" stroke="#3B82F6" name="Actual Waste" strokeWidth={2} />
        <Line type="monotone" dataKey="prediction" stroke="#F59E0B" name="Predicted Waste" strokeDasharray="5 5" />
      </LineChart>
    </ResponsiveContainer>;
};