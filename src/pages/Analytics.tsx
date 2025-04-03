import React from 'react';
import { RecyclingOpportunitiesChart } from '../components/charts/RecyclingOpportunitiesChart';
import { WasteReductionChart } from '../components/charts/WasteReductionChart';
import { WasteCompositionChart } from '../components/charts/WasteCompositionChart';
import { EnhancedMonthlyTrendChart } from '../components/charts/EnhancedMonthlyTrendChart';
import { SectorAnalysisChart } from '../components/charts/SectorAnalysisChart';
import { AIRecommendationChart } from '../components/charts/AIRecommendationChart';
export const Analytics: React.FC = () => {
  return <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
        <p className="text-gray-500">
          Advanced waste analytics and predictions
        </p>
      </div>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-2">AI Recommendations</h2>
          <p className="text-gray-500 mb-4">
            Smart suggestions for waste management improvement
          </p>
          <div className="h-[500px]">
            <AIRecommendationChart />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-2">Detailed Waste Trends</h2>
          <p className="text-gray-500 mb-4">
            Comprehensive view of waste generation patterns
          </p>
          <div className="h-[500px]">
            <EnhancedMonthlyTrendChart />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-2">Sector Analysis</h2>
            <p className="text-gray-500 mb-4">
              Waste generation distribution by sector
            </p>
            <div className="h-[400px]">
              <SectorAnalysisChart />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-2">Waste Composition</h2>
            <p className="text-gray-500 mb-4">
              Distribution of different types of waste
            </p>
            <div className="h-[400px]">
              <WasteCompositionChart />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-2">
              Recycling Opportunities
            </h2>
            <p className="text-gray-500 mb-4">
              Current vs potential recycling rates by material type
            </p>
            <div className="h-[400px]">
              <RecyclingOpportunitiesChart />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-2">
              Waste Reduction Impact
            </h2>
            <p className="text-gray-500 mb-4">
              Impact of waste reduction and diversion initiatives
            </p>
            <div className="h-[400px]">
              <WasteReductionChart />
            </div>
          </div>
        </div>
      </div>
    </div>;
};