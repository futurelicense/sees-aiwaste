import React from "react";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";
interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
  isPositive?: boolean;
}
export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  isPositive
}) => {
  return <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-2 rounded-full bg-gray-50">{icon}</div>
      </div>
      <div className="mt-4 flex items-center">
        {isPositive !== undefined && <span className={`mr-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? <TrendingUpIcon size={16} /> : <TrendingDownIcon size={16} />}
          </span>}
        <span className={`text-xs ${isPositive === undefined ? "text-gray-500" : isPositive ? "text-green-500" : "text-red-500"}`}>
          {change}
        </span>
      </div>
    </div>;
};