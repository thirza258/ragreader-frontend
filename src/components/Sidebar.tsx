import React from "react";
import  DocViewer,  {DocViewerRenderers } from "@cyntler/react-doc-viewer";

const Sidebar: React.FC = ({ files }) => {
  if (!files || files.length === 0) {
    return <p className="text-gray-500 text-sm">No files available.</p>;
  }

  interface File {
    name: string;
    size: number;
    type: string;
  }

  const docFiles: { uri: string }[] = files.map((file: File) => ({ uri: URL.createObjectURL(file) }));

  return (
    <div className="w-1/3 bg-gray-200 h-full p-4 border-r-2 border-white z-10 shadow-lg flex-shrink-0">
      <ul>
        
        <h2 className="mb-4 text-xl">File</h2>
        <div className="overflow-y-auto max-h-[100vh] p-4 bg-white shadow rounded-lg border border-gray-300">
          {files.map((file, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-bold text-lg mb-2">{file.name}</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Type:</strong> {file.type}
              </p>
            </div>
          ))}
          <DocViewer
            documents={docFiles}
            pluginRenderers={DocViewerRenderers}
          />
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
