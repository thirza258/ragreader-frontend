import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../services/service';

const AI_MODELS = ['Gemini', 'Mistral', 'Claude', 'OpenAI'];

interface FileSubmitProps {
  setFile: (file: File | null) => void;
  modelName: string;
  vectorNumber: number;
  setModelName: (model: string) => void;
  setVectorNumber: (vectorNumber: number) => void;
}

const FileSubmit: React.FC<FileSubmitProps> = ({ setFile, modelName, setModelName,  vectorNumber, setVectorNumber}) => {
  const [fileLocal, setFileLocal] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFileLocal(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!fileLocal) {
      alert("Please upload a file before submitting.");
      return;
    }

    try {
      setIsLoading(true);
      // Replace with your actual service call
      const response = await service.submitFile(fileLocal, modelName, vectorNumber);
      console.log("File submitted successfully:", response);
      alert("File submitted successfully!");
      navigate("/main");
    } catch (error) {
      console.error("Error submitting file:", error);
      alert("Failed to submit the file.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card max-w-md mx-auto p-6 border rounded shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold">RAGReader File Upload</h2>
      </div>
      
      <div className="space-y-4">
        <div className="mb-4">
          <label htmlFor="file-upload" className="block text-sm font-medium mb-2">
            Upload File:
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="model-select" className="block text-sm font-medium mb-2">
            Select AI Model:
          </label>
          <select
            id="model-select"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            className="w-full border rounded p-2"
          >
            {AI_MODELS.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="vector-select" className="block text-sm font-medium mb-2">
            Select number of results:
          </label>
          <select
            id="vector-select"
            value={vectorNumber}
            onChange={(e) => setVectorNumber(parseInt(e.target.value))}
            className="w-full border rounded p-2"
          >
            {[...Array(9)].map((_, i) => (
              <option key={i + 2} value={i + 2}>
                {i + 2}
              </option>
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