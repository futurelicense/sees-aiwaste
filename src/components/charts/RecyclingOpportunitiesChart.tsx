import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useWasteData } from '../../context/WasteDataContext';
export const RecyclingOpportunitiesChart: React.FC = () => {
  const {
    wasteData
  } = useWasteData();
  const recyclingData = useMemo(() => {
    const recyclableTypes = ['Plastic', 'Paper', 'Glass', 'Metal'];
    return recyclableTypes.map(type => {
      const total = wasteData.reduce((sum, item) => item.waste_type === type ? sum + Number(item.waste_amount) : sum, 0);
      // Estimate potential based on typical recycling rates
      const recyclingRates: {
        [key: string]: number;
      } = {
        Plastic: 0.75,
        Paper: 0.85,
        Glass: 0.9,
        Metal: 0.95
      };
      const potential = total * (recyclingRates[type] || 0.8);
      const current = total * 0.4; // Assume current recycling rate is 40%
      return {
        type,
        current,
        potential: potential - current
      };
    });
  }, [wasteData]);
  if (recyclingData.length === 0) {
    return <div className="h-full flex items-center justify-center text-gray-500">
        No data available
      </div>;
  }
  return <ResponsiveContainer width="100%" height="100%">
      <BarChart data={recyclingData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip formatter={(value: number) => `${value.toFixed(1)} tons`} />
        <Legend />
        <Bar dataKey="current" stackId="a" fill="#10B981" name="Current Recycling" />
        <Bar dataKey="potential" stackId="a" fill="#3B82F6" name="Additional Potential" />
      </BarChart>
    </ResponsiveContainer>;
};