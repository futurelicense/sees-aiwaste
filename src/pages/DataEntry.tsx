import React, { useState } from "react";
import { WasteDataForm } from "../components/forms/WasteDataForm";
import { CSVUploader } from "../components/forms/CSVUploader";
import { TableIcon, UploadIcon } from "lucide-react";
export const DataEntry: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"form" | "csv">("form");
  return <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Entry</h1>
        <p className="text-gray-500">
          Add waste management data manually or upload CSV files
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button className={`px-4 py-3 flex items-center gap-2 ${activeTab === "form" ? "text-green-600 border-b-2 border-green-600" : "text-gray-500 hover:bg-gray-50"}`} onClick={() => setActiveTab("form")}>
            <TableIcon size={18} />
            <span>Manual Entry</span>
          </button>
          <button className={`px-4 py-3 flex items-center gap-2 ${activeTab === "csv" ? "text-green-600 border-b-2 border-green-600" : "text-gray-500 hover:bg-gray-50"}`} onClick={() => setActiveTab("csv")}>
            <UploadIcon size={18} />
            <span>CSV Upload</span>
          </button>
        </div>
        <div className="p-6">
          {activeTab === "form" ? <WasteDataForm /> : <CSVUploader />}
        </div>
      </div>
    </div>;
};