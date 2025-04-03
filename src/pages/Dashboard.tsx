import React, { useMemo } from 'react';
import { MapContainer } from '../components/map/MapContainer';
import { StatsCard } from '../components/dashboard/StatsCard';
import { AIForecastChart } from '../components/charts/AIForecastChart';
import { TrashIcon, RecycleIcon, AlertTriangleIcon, TrendingUpIcon } from 'lucide-react';
import { useWasteData } from '../context/WasteDataContext';
export const Dashboard: React.FC = () => {
  const {
    wasteData,
    getStatistics
  } = useWasteData();
  const stats = useMemo(() => getStatistics(), [wasteData]);
  const calculateChange = (current: number, total: number) => {
    if (total === 0) return '+0%';
    const change = (current / total * 100).toFixed(1);
    return `+${change}%`;
  };
  return <div className="p-6 max-w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
          Silver Sterlyn Eco Solution
          </h1>
          <p className="text-gray-500">
            Overview of waste generation and management across Nigeria
          </p>
        </div>
        <div className="flex gap-2">
          <select className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All States</option>
            <option>Lagos</option>
            <option>Abuja</option>
            <option>Kano</option>
            <option>Rivers</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
            <option>All time</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total Waste" value={`${stats.totalWaste.toFixed(1)} tons`} change={calculateChange(stats.totalWaste, stats.totalWaste)} icon={<TrashIcon className="text-gray-400" />} />
        <StatsCard title="Recycled" value={`${stats.recycledWaste.toFixed(1)} tons`} change={calculateChange(stats.recycledWaste, stats.totalWaste)} icon={<RecycleIcon className="text-green-500" />} isPositive={true} />
        <StatsCard title="Critical Areas" value={`${stats.criticalAreas} locations`} change={`${stats.criticalAreas} identified`} icon={<AlertTriangleIcon className="text-amber-500" />} isPositive={false} />
        <StatsCard title="Waste Trend" value="Active" change={`${stats.topLocations.length} major cities`} icon={<TrendingUpIcon className="text-blue-500" />} isPositive={true} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h2 className="text-lg font-semibold mb-4">Waste Distribution Map</h2>
          <div className="h-[400px] w-full">
            <MapContainer locations={wasteData} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h2 className="text-lg font-semibold mb-2">
            AI-Powered Waste Forecasting
          </h2>
          <p className="text-gray-500 mb-4">
            Machine learning predictions based on historical data
          </p>
          <div className="h-[400px]">
            <AIForecastChart />
          </div>
        </div>
      </div>
    </div>;
};