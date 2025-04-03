import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useWasteData } from '../../context/WasteDataContext';
export const WasteReductionChart: React.FC = () => {
  const {
    wasteData
  } = useWasteData();
  const reductionData = useMemo(() => {
    const monthlyData = wasteData.reduce((acc, item) => {
      const date = new Date(item.collection_date);
      const monthYear = date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
      if (!acc[monthYear]) {
        acc[monthYear] = {
          month: monthYear,
          total: 0,
          diverted: 0,
          reduced: 0
        };
      }
      acc[monthYear].total += Number(item.waste_amount);
      // Calculate diverted waste (recycling and composting)
      if (['Plastic', 'Paper', 'Glass', 'Metal', 'Organic'].includes(item.waste_type)) {
        acc[monthYear].diverted += Number(item.waste_amount) * 0.4; // Assume 40% diversion rate
      }
      // Calculate reduced waste through prevention initiatives
      acc[monthYear].reduced += Number(item.waste_amount) * 0.15; // Assume 15% reduction rate
      return acc;
    }, {} as {
      [key: string]: {
        month: string;
        total: number;
        diverted: number;
        reduced: number;
      };
    });
    return Object.values(monthlyData).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
  }, [wasteData]);
  if (reductionData.length === 0) {
    return <div className="h-full flex items-center justify-center text-gray-500">
        No data available
      </div>;
  }
  return <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={reductionData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value: number) => `${value.toFixed(1)} tons`} />
        <Legend />
        <Area type="monotone" dataKey="total" stackId="1" stroke="#F59E0B" fill="#FCD34D" name="Total Waste" />
        <Area type="monotone" dataKey="diverted" stackId="2" stroke="#10B981" fill="#6EE7B7" name="Diverted Waste" />
        <Area type="monotone" dataKey="reduced" stackId="2" stroke="#3B82F6" fill="#93C5FD" name="Reduced Waste" />
      </AreaChart>
    </ResponsiveContainer>;
};