import React, { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { DataEntry } from "./pages/DataEntry";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";
import { WasteDataProvider } from "./context/WasteDataContext";
export function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "data-entry":
        return <DataEntry />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };
  return <WasteDataProvider>
      <div className="flex h-screen w-full bg-gray-50">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <div className="flex-1 overflow-auto">{renderPage()}</div>
      </div>
    </WasteDataProvider>;
}