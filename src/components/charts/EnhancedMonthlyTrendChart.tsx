import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useWasteData } from '../../context/WasteDataContext';
export const EnhancedMonthlyTrendChart: React.FC = () => {
  const {
    wasteData
  } = useWasteData();
  const [timeRange, setTimeRange] = useState('12');
  const [dataType, setDataType] = useState<'all' | 'recyclable' | 'organic'>('all');
  const [view, setView] = useState<'monthly' | 'daily'>('monthly');
  const processData = () => {
    const sortedData = [...wasteData].sort((a, b) => new Date(a.collection_date).getTime() - new Date(b.collection_date).getTime());
    const groupedData = sortedData.reduce((acc, item) => {
      const date = new Date(item.collection_date);
      const key = view === 'monthly' ? date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      }) : date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
      if (!acc[key]) {
        acc[key] = {
          date: key,
          total: 0,
          recyclable: 0,
          organic: 0
        };
      }
      const amount = Number(item.waste_amount);
      acc[key].total += amount;
      if (['Plastic', 'Paper', 'Glass', 'Metal'].includes(item.waste_type)) {
        acc[key].recyclable += amount;
      }
      if (item.waste_type === 'Organic') {
        acc[key].organic += amount;
      }
      return acc;
    }, {} as Record<string, any>);
    let data = Object.values(groupedData);
    // Apply time range filter
    const months = parseInt(timeRange);
    if (months) {
      data = data.slice(-months);
    }
    return data;
  };
  const chartData = processData();
  return <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm" value={timeRange} onChange={e => setTimeRange(e.target.value)}>
          <option value="3">Last 3 Months</option>
          <option value="6">Last 6 Months</option>
          <option value="12">Last 12 Months</option>
          <option value="0">All Time</option>
        </select>
        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm" value={dataType} onChange={e => setDataType(e.target.value as any)}>
          <option value="all">All Waste Types</option>
          <option value="recyclable">Recyclable Only</option>
          <option value="organic">Organic Only</option>
        </select>
        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm" value={view} onChange={e => setView(e.target.value as any)}>
          <option value="monthly">Monthly View</option>
          <option value="daily">Daily View</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} />
          <YAxis />
          <Tooltip />
          <Legend />
          {(dataType === 'all' || dataType === 'recyclable') && <Line type="monotone" dataKey="recyclable" stroke="#10B981" name="Recyclable Waste" strokeWidth={2} />}
          {(dataType === 'all' || dataType === 'organic') && <Line type="monotone" dataKey="organic" stroke="#F59E0B" name="Organic Waste" strokeWidth={2} />}
          {dataType === 'all' && <Line type="monotone" dataKey="total" stroke="#3B82F6" name="Total Waste" strokeWidth={2} />}
        </LineChart>
      </ResponsiveContainer>
    </div>;
};