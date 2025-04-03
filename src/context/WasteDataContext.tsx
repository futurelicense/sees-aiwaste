import React, { useCallback, useState, createContext, useContext } from 'react';
export interface WasteData {
  city: string;
  state: string;
  latitude: string;
  longitude: string;
  waste_amount: number;
  waste_type: string;
  sector: string;
  collection_date: string;
  notes?: string;
}
interface WasteDataContextType {
  wasteData: WasteData[];
  setWasteData: (data: WasteData[]) => void;
  addWasteData: (data: WasteData) => void;
  getStatistics: () => {
    totalWaste: number;
    recycledWaste: number;
    criticalAreas: number;
    wasteTypes: {
      [key: string]: number;
    };
    topLocations: {
      name: string;
      amount: number;
    }[];
    sectorData: {
      [key: string]: number;
    };
  };
  getForecast: () => {
    prediction: number;
    confidence: number;
    trend: 'increasing' | 'decreasing' | 'stable';
    nextMonthEstimate: number;
  };
}
const WasteDataContext = createContext<WasteDataContextType | undefined>(undefined);
export const WasteDataProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [wasteData, setWasteData] = useState<WasteData[]>([]);
  const addWasteData = useCallback((data: WasteData) => {
    setWasteData(prev => [...prev, data]);
  }, []);
  const getStatistics = useCallback(() => {
    const totalWaste = wasteData.reduce((sum, item) => sum + Number(item.waste_amount), 0);
    const recycledWaste = wasteData.filter(item => ['Plastic', 'Paper', 'Glass', 'Metal'].includes(item.waste_type)).reduce((sum, item) => sum + Number(item.waste_amount), 0);
    const wasteTypes = wasteData.reduce((acc, item) => {
      acc[item.waste_type] = (acc[item.waste_type] || 0) + Number(item.waste_amount);
      return acc;
    }, {} as {
      [key: string]: number;
    });
    const criticalAreas = wasteData.filter(item => Number(item.waste_amount) > 500).length;
    const locationTotals = wasteData.reduce((acc, item) => {
      acc[item.city] = (acc[item.city] || 0) + Number(item.waste_amount);
      return acc;
    }, {} as {
      [key: string]: number;
    });
    const topLocations = Object.entries(locationTotals).map(([name, amount]) => ({
      name,
      amount
    })).sort((a, b) => b.amount - a.amount).slice(0, 5);
    const sectorData = wasteData.reduce((acc, item) => {
      acc[item.sector] = (acc[item.sector] || 0) + Number(item.waste_amount);
      return acc;
    }, {} as {
      [key: string]: number;
    });
    return {
      totalWaste,
      recycledWaste,
      criticalAreas,
      wasteTypes,
      topLocations,
      sectorData
    };
  }, [wasteData]);
  const getForecast = useCallback(() => {
    const sortedData = [...wasteData].sort((a, b) => new Date(a.collection_date).getTime() - new Date(b.collection_date).getTime());
    const xValues = sortedData.map((_, i) => i);
    const yValues = sortedData.map(item => Number(item.waste_amount));
    const n = xValues.length;
    const sumX = xValues.reduce((a, b) => a + b, 0);
    const sumY = yValues.reduce((a, b) => a + b, 0);
    const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
    const sumXX = xValues.reduce((sum, x) => sum + x * x, 0);
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    const yMean = sumY / n;
    const totalSS = yValues.reduce((sum, y) => sum + Math.pow(y - yMean, 2), 0);
    const residualSS = yValues.reduce((sum, y, i) => {
      const prediction = slope * xValues[i] + intercept;
      return sum + Math.pow(y - prediction, 2);
    }, 0);
    const rSquared = 1 - residualSS / totalSS;
    const nextMonthEstimate = slope * (n + 30) + intercept;
    return {
      prediction: slope,
      confidence: rSquared,
      trend: slope > 0 ? 'increasing' : slope < 0 ? 'decreasing' : 'stable',
      nextMonthEstimate: Math.max(0, nextMonthEstimate)
    };
  }, [wasteData]);
  return <WasteDataContext.Provider value={{
    wasteData,
    setWasteData,
    addWasteData,
    getStatistics,
    getForecast
  }}>
      {children}
    </WasteDataContext.Provider>;
};
export const useWasteData = () => {
  const context = useContext(WasteDataContext);
  if (context === undefined) {
    throw new Error('useWasteData must be used within a WasteDataProvider');
  }
  return context;
};