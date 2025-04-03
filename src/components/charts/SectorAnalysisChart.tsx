import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useWasteData } from '../../context/WasteDataContext';
const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6', '#F97316', '#6B7280'];
export const SectorAnalysisChart: React.FC = () => {
  const {
    getStatistics
  } = useWasteData();
  const {
    sectorData
  } = getStatistics();
  const data = Object.entries(sectorData).map(([name, value]) => ({
    name,
    value
  }));
  if (data.length === 0) {
    return <div className="h-full flex items-center justify-center text-gray-500">
        No sector data available
      </div>;
  }
  return <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
        name,
        value
      }) => `${name}: ${value.toFixed(1)}t`}>
          {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip formatter={(value: number) => `${value.toFixed(1)} tons`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>;
};