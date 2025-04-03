import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useWasteData } from '../../context/WasteDataContext';
const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6', '#F97316', '#6B7280'];
export const WasteCompositionChart: React.FC = () => {
  const {
    wasteData
  } = useWasteData();
  const compositionData = useMemo(() => {
    const composition = wasteData.reduce((acc, item) => {
      acc[item.waste_type] = (acc[item.waste_type] || 0) + Number(item.waste_amount);
      return acc;
    }, {} as {
      [key: string]: number;
    });
    return Object.entries(composition).map(([name, value]) => ({
      name,
      value
    }));
  }, [wasteData]);
  if (compositionData.length === 0) {
    return <div className="h-full flex items-center justify-center text-gray-500">
        No data available
      </div>;
  }
  return <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={compositionData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
        name,
        value
      }) => `${name}: ${value.toFixed(1)}t`}>
          {compositionData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip formatter={(value: number) => `${value.toFixed(1)} tons`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>;
};