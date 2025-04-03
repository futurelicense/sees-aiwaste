import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useWasteData } from '../../context/WasteDataContext';
export const MonthlyTrendChart: React.FC = () => {
  const {
    wasteData
  } = useWasteData();
  const monthlyData = useMemo(() => {
    const monthly = wasteData.reduce((acc, item) => {
      const date = new Date(item.collection_date);
      const monthYear = date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
      if (!acc[monthYear]) {
        acc[monthYear] = {
          month: monthYear,
          total: 0,
          recycled: 0
        };
      }
      acc[monthYear].total += Number(item.waste_amount);
      if (['Plastic', 'Paper', 'Glass', 'Metal'].includes(item.waste_type)) {
        acc[monthYear].recycled += Number(item.waste_amount);
      }
      return acc;
    }, {} as {
      [key: string]: {
        month: string;
        total: number;
        recycled: number;
      };
    });
    return Object.values(monthly).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
  }, [wasteData]);
  if (monthlyData.length === 0) {
    return <div className="h-full flex items-center justify-center text-gray-500">
        No data available
      </div>;
  }
  return <ResponsiveContainer width="100%" height="100%">
      <LineChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value: number) => `${value.toFixed(1)} tons`} />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#3B82F6" name="Total Waste" />
        <Line type="monotone" dataKey="recycled" stroke="#10B981" name="Recycled" />
      </LineChart>
    </ResponsiveContainer>;
};