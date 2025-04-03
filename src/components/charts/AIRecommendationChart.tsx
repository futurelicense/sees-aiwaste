import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useWasteData } from '../../context/WasteDataContext';
interface Recommendation {
  action: string;
  impact: number;
  priority: 'High' | 'Medium' | 'Low';
  description: string;
}
export const AIRecommendationChart: React.FC = () => {
  const {
    wasteData
  } = useWasteData();
  // Generate AI recommendations based on waste data patterns
  const generateRecommendations = (): Recommendation[] => {
    const totalWaste = wasteData.reduce((sum, item) => sum + item.waste_amount, 0);
    const wasteByType = wasteData.reduce((acc, item) => {
      acc[item.waste_type] = (acc[item.waste_type] || 0) + item.waste_amount;
      return acc;
    }, {} as Record<string, number>);
    const wasteByTypePercentage = Object.entries(wasteByType).map(([type, amount]) => ({
      type,
      percentage: amount / totalWaste * 100
    }));
    const recommendations: Recommendation[] = [];
    // Analyze recyclable materials
    const recyclableWaste = ['Plastic', 'Paper', 'Glass', 'Metal'].reduce((sum, type) => sum + (wasteByType[type] || 0), 0);
    const recyclablePercentage = recyclableWaste / totalWaste * 100;
    if (recyclablePercentage < 30) {
      recommendations.push({
        action: 'Increase Recycling',
        impact: 85,
        priority: 'High',
        description: 'Implement comprehensive recycling programs'
      });
    }
    // Analyze organic waste
    const organicPercentage = (wasteByType['Organic'] || 0) / totalWaste * 100;
    if (organicPercentage > 30) {
      recommendations.push({
        action: 'Composting Program',
        impact: 75,
        priority: 'High',
        description: 'Establish community composting facilities'
      });
    }
    // Analyze hazardous waste
    const hazardousPercentage = (wasteByType['Hazardous'] || 0) / totalWaste * 100;
    if (hazardousPercentage > 5) {
      recommendations.push({
        action: 'Hazardous Waste Management',
        impact: 90,
        priority: 'High',
        description: 'Improve hazardous waste handling protocols'
      });
    }
    // Add waste reduction recommendation
    recommendations.push({
      action: 'Waste Reduction',
      impact: 70,
      priority: 'Medium',
      description: 'Implement waste reduction education programs'
    });
    // Add infrastructure recommendation
    recommendations.push({
      action: 'Infrastructure Upgrade',
      impact: 65,
      priority: 'Medium',
      description: 'Modernize waste collection infrastructure'
    });
    return recommendations;
  };
  const recommendations = generateRecommendations();
  const chartData = recommendations.map(rec => ({
    name: rec.action,
    impact: rec.impact,
    priority: rec.priority
  }));
  return <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec, index) => <div key={index} className={`p-4 rounded-lg border ${rec.priority === 'High' ? 'border-red-200 bg-red-50' : rec.priority === 'Medium' ? 'border-yellow-200 bg-yellow-50' : 'border-green-200 bg-green-50'}`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{rec.action}</h3>
              <span className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${rec.priority === 'High' ? 'bg-red-100 text-red-800' : rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}
              `}>
                {rec.priority}
              </span>
            </div>
            <p className="text-sm text-gray-600">{rec.description}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div className={`h-2 rounded-full ${rec.priority === 'High' ? 'bg-red-500' : rec.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`} style={{
              width: `${rec.impact}%`
            }} />
              </div>
              <span className="text-sm font-medium">{rec.impact}%</span>
            </div>
          </div>)}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="impact" fill="#3B82F6" name="Impact Score" />
        </BarChart>
      </ResponsiveContainer>
    </div>;
};