import React, { useState, createElement } from 'react';
import Papa from 'papaparse';
import { UploadIcon, FileIcon, CheckCircleIcon, AlertCircleIcon, LoaderIcon } from 'lucide-react';
import { useWasteData } from '../../context/WasteDataContext';
interface WasteData {
  city: string;
  state: string;
  latitude: string;
  longitude: string;
  waste_amount: string;
  waste_type: string;
  sector: string;
  collection_date: string;
  notes?: string;
}
export const CSVUploader: React.FC = () => {
  const {
    setWasteData
  } = useWasteData();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const validateCSVData = (results: Papa.ParseResult<WasteData>) => {
    const requiredFields = ['city', 'state', 'waste_amount', 'waste_type', 'sector', 'collection_date'];
    const headers = results.meta.fields || [];
    const missingFields = requiredFields.filter(field => !headers.includes(field));
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    results.data.forEach((row, index) => {
      if (!row.city || !row.state) {
        throw new Error(`Row ${index + 1}: City and State are required`);
      }
      if (!row.waste_amount || isNaN(Number(row.waste_amount))) {
        throw new Error(`Row ${index + 1}: Invalid waste amount`);
      }
      if (!row.waste_type) {
        throw new Error(`Row ${index + 1}: Waste type is required`);
      }
      if (!row.sector) {
        throw new Error(`Row ${index + 1}: Sector is required`);
      }
      if (!row.collection_date || isNaN(Date.parse(row.collection_date))) {
        throw new Error(`Row ${index + 1}: Invalid collection date`);
      }
    });
    return results.data.map(row => ({
      ...row,
      waste_amount: Number(row.waste_amount)
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };
  const validateAndSetFile = (selectedFile: File) => {
    if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
      setUploadStatus('error');
      setErrorMessage('Only CSV files are supported');
      setFile(null);
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setUploadStatus('error');
      setErrorMessage('File is too large. Maximum size is 5MB');
      setFile(null);
      return;
    }
    setFile(selectedFile);
    setUploadStatus('idle');
    setErrorMessage('');
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };
  const handleUpload = () => {
    if (!file) return;
    setUploadStatus('loading');
    setUploadProgress(0);
    Papa.parse<WasteData>(file, {
      header: true,
      complete: results => {
        try {
          const validatedData = validateCSVData(results);
          let progress = 0;
          const interval = setInterval(() => {
            progress += 20;
            setUploadProgress(Math.min(progress, 100));
            if (progress >= 100) {
              clearInterval(interval);
              setWasteData(validatedData);
              setUploadStatus('success');
              console.log('Parsed and validated data:', validatedData);
            }
          }, 500);
        } catch (error) {
          setUploadStatus('error');
          setErrorMessage(error instanceof Error ? error.message : 'Invalid CSV format');
        }
      },
      error: error => {
        setUploadStatus('error');
        setErrorMessage(`Failed to parse CSV: ${error.message}`);
      }
    });
  };
  const downloadTemplate = () => {
    const template = `city,state,latitude,longitude,waste_amount,waste_type,sector,collection_date,notes
Lagos,Lagos,6.5244,3.3792,120,Plastic,Commercial,2023-07-15,Commercial area collection
Abuja,FCT,9.0765,7.3986,85,Organic,Residential,2023-07-16,Residential area collection
Kano,Kano,12.0022,8.5920,150,Mixed,Industrial,2023-07-16,Industrial zone waste
Port Harcourt,Rivers,4.8156,7.0498,95,Electronic,Institutional,2023-07-15,Office complex waste
`;
    const blob = new Blob([template], {
      type: 'text/csv'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'waste_data_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return <div className="space-y-6">
      <div className={`bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 text-center
          ${isDragging ? 'border-green-500 bg-green-50' : ''}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-3 bg-green-50 rounded-full">
            <UploadIcon size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-gray-700 font-medium">
              Drag & drop your CSV file here
            </p>
            <p className="text-gray-500 text-sm">or click to browse files</p>
          </div>
          <input type="file" id="csv-upload" className="hidden" accept=".csv" onChange={handleFileChange} />
          <button onClick={() => document.getElementById('csv-upload')?.click()} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            Browse Files
          </button>
        </div>
      </div>
      {uploadStatus === 'error' && <div className="flex items-center p-3 bg-red-50 text-red-700 rounded-md">
          <AlertCircleIcon size={18} className="mr-2 flex-shrink-0" />
          <span className="text-sm">{errorMessage}</span>
        </div>}
      {file && <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileIcon size={20} className="text-gray-500" />
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            {uploadStatus === 'success' ? <div className="flex items-center text-green-600">
                <CheckCircleIcon size={18} className="mr-1" />
                <span className="text-sm">Uploaded successfully</span>
              </div> : uploadStatus === 'loading' ? <div className="flex items-center text-gray-600">
                <LoaderIcon size={18} className="mr-2 animate-spin" />
                <span className="text-sm">{uploadProgress}%</span>
              </div> : <button onClick={handleUpload} className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
                Upload
              </button>}
          </div>
          {uploadStatus === 'loading' && <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-green-600 h-1.5 rounded-full transition-all duration-500" style={{
          width: `${uploadProgress}%`
        }}></div>
            </div>}
        </div>}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Need a template?</h3>
            <p className="text-sm text-gray-500">
              Download our CSV template to ensure your data is formatted
              correctly
            </p>
          </div>
          <button onClick={downloadTemplate} className="px-3 py-1 border border-green-600 text-green-600 rounded-md hover:bg-green-50 text-sm">
            Download Template
          </button>
        </div>
      </div>
    </div>;
};