import React from "react";
export const Settings: React.FC = () => {
  return <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500">
          Manage your account and application preferences
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue="Admin User" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue="admin@wastetrack.ng" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50" defaultValue="Administrator" disabled />
            </div>
          </div>
        </div>
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Application Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">
                  Receive email alerts for critical waste events
                </p>
              </div>
              <div className="relative inline-block w-12 h-6 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 bg-green-600">
                <span className="inline-block w-5 h-5 transform translate-x-6 bg-white rounded-full transition ease-in-out duration-200"></span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Data Sharing</p>
                <p className="text-sm text-gray-500">
                  Share anonymized data with other municipalities
                </p>
              </div>
              <div className="relative inline-block w-12 h-6 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 bg-gray-200">
                <span className="inline-block w-5 h-5 transform translate-x-0 bg-white rounded-full transition ease-in-out duration-200"></span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default State Filter
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>All States</option>
                <option>Lagos</option>
                <option>Abuja</option>
                <option>Kano</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-6 flex justify-end">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>;
};