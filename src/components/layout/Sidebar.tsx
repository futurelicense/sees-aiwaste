import React from "react";
import { HomeIcon, DatabaseIcon, BarChart3Icon, SettingsIcon, LogOutIcon, RecycleIcon } from "lucide-react";
interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}
export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  setActivePage
}) => {
  const navItems = [{
    id: "dashboard",
    label: "Dashboard",
    icon: <HomeIcon size={20} />
  }, {
    id: "data-entry",
    label: "Data Entry",
    icon: <DatabaseIcon size={20} />
  }, {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart3Icon size={20} />
  }, {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon size={20} />
  }];
  return <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <RecycleIcon size={24} className="text-green-600" />
          <h1 className="text-xl font-bold text-green-800">SSES WasteTrack</h1>
        </div>
        <p className="text-xs text-gray-500 mt-1">
        Silver Sterlyn Eco Solution Waste Management Platform
        </p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map(item => <li key={item.id}>
              <button onClick={() => setActivePage(item.id)} className={`flex items-center gap-3 w-full p-2 rounded-md ${activePage === item.id ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50"}`}>
                <span className={activePage === item.id ? "text-green-600" : "text-gray-500"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            </li>)}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-3 w-full p-2 text-gray-600 hover:bg-gray-50 rounded-md">
          <LogOutIcon size={20} className="text-gray-500" />
          <span><a href="https://silverappeal.com">Logout</a></span>
        </button>
      </div>
    </div>;
};