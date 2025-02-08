import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../services/service';

const AI_MODELS = ['OpenAI', 'Mistral', 'Claude'];

interface FileSubmitProps {
  setFile: (file: File | null) => void;
  modelName: string;
  vectorNumber: number;
  setModelName: (model: string) => void;
  setVectorNumber: (vectorNumber: number) => void;
}

const FileSubmit: React.FC<FileSubmitProps> = ({ setFile, modelName, setModelName,  vectorNumber, setVectorNumber}) => {
  const [fileLocal, setFileLocal] = useState<File | null>(null);
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitType, setSubmitType] = useState<'file' | 'url'>('file');

const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setModelName(event.target.value);
  console.log("Model changed to:", event.target.value);
};


  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFileLocal(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (submitType === 'file' && !fileLocal) {
      alert("Please upload a file before submitting.");
      return;
    }

    if (submitType === 'url' && !url) {
      alert("Please enter a URL before submitting.");
      return;
    }

    try {
      setIsLoading(true);
      console.log("Submitting:", submitType, modelName, vectorNumber);
      const response = submitType === 'file' 
        ? await service.submitFile(fileLocal as File, modelName, vectorNumber) 
        : await service.submitURL(url, modelName, vectorNumber);
      
      console.log("Submission successful:", response);
      alert("Submitted successfully!");
      navigate("/main");
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Failed to submit.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card max-w-md mx-auto p-6 border rounded shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold">RAGReader Upload</h2>
      </div>
      
      <div className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Submit Type:</label>
          <select
            title="Submit Type"
            value={submitType}
            onChange={(e) => setSubmitType(e.target.value as 'file' | 'url')}
            className="w-full border rounded p-2"
          >
            <option value="file">Upload File</option>
            <option value="url">Submit URL</option>
          </select>
        </div>

        {submitType === 'file' && (
          <div className="mb-4">
            <label htmlFor="file-upload" className="block text-sm font-medium mb-2">Upload File:</label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="w-full border rounded p-2"
            />
          </div>
        )}

        {submitType === 'url' && (
          <div className="mb-4">
            <label htmlFor="url-input" className="block text-sm font-medium mb-2">Enter URL:</label>
            <input
              id="url-input"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="model-select" className="block text-sm font-medium mb-2">Select AI Model:</label>
          <select
            id="model-select"
            value={modelName}
            onChange={handleModelChange}
            className="w-full border rounded p-2"
          >
            {AI_MODELS.map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="vector-select" className="block text-sm font-medium mb-2">Select number of results:</label>
          <select
            id="vector-select"
            value={vectorNumber}
            onChange={(e) => setVectorNumber(parseInt(e.target.value))}
            className="w-full border rounded p-2"
          >
            {[...Array(9)].map((_, i) => (
              <option key={i + 2} value={i + 2}>{i + 2}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default FileSubmit;
