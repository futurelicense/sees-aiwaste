import React, { useState } from 'react';
import { SaveIcon } from 'lucide-react';
export const WasteDataForm: React.FC = () => {
  const [formData, setFormData] = useState({
    city: '',
    state: '',
    latitude: '',
    longitude: '',
    wasteAmount: '',
    wasteType: '',
    sector: '',
    collectionDate: '',
    notes: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would normally send the data to your backend
    alert('Data submitted successfully!');
  };
  const nigerianStates = ['Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'];
  const wasteTypes = ['Organic', 'Plastic', 'Paper', 'Glass', 'Metal', 'Electronic', 'Hazardous', 'Medical', 'Construction', 'Mixed'];
  const sectors = ['Residential', 'Commercial', 'Industrial', 'Institutional', 'Agricultural', 'Public Spaces', 'Healthcare', 'Educational', 'Hospitality', 'Other'];
  return <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter city name" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <select name="state" value={formData.state} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" required>
            <option value="">Select a state</option>
            {nigerianStates.map(state => <option key={state} value={state}>
                {state}
              </option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Latitude
          </label>
          <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g. 9.0765" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Longitude
          </label>
          <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g. 7.3986" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Waste Amount (tons)
          </label>
          <input type="number" name="wasteAmount" value={formData.wasteAmount} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter amount in tons" required min="0" step="0.01" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Waste Type
          </label>
          <select name="wasteType" value={formData.wasteType} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" required>
            <option value="">Select waste type</option>
            {wasteTypes.map(type => <option key={type} value={type}>
                {type}
              </option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Collection Date
        </label>
        <input type="date" name="collectionDate" value={formData.collectionDate} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Notes
        </label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Any additional information about this waste collection" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sector
          </label>
          <select name="sector" value={formData.sector} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" required>
            <option value="">Select sector</option>
            {sectors.map(sector => <option key={sector} value={sector}>
                {sector}
              </option>)}
          </select>
        </div>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center gap-2 hover:bg-green-700">
          <SaveIcon size={18} />
          Save Data
        </button>
      </div>
    </form>;
};