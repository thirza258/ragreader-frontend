import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Iframe from "react-iframe";

interface SidebarProps {
  files?: File[];
  url?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ files, url }) => {
  if (!files || files.length === 0) {
    if (!url) {
      return (
        <p className="text-gray-500 text-sm">Currently reading nothing.</p>
      );
    }
    return (
      <div className="w-1/3 bg-gray-200 h-full p-4 border-r-2 border-white z-10 shadow-lg flex-shrink-0">
        <p className="mb-4 text-xl">Currently asking</p>
        <div className="overflow-hidden max-h-[100vh] p-4 bg-white shadow rounded-lg border border-gray-300">
          <Iframe url={url} width="100%" height="500px" className="border rounded-lg shadow-lg" />
        </div>
      </div>
    );
  }

  const docFiles: { uri: string }[] = files.map((file: File) => ({
    uri: URL.createObjectURL(file),
  }));

  return (
    <div className="w-1/3 bg-gray-200 h-full p-4 border-r-2 border-white z-10 shadow-lg flex-shrink-0">
      <ul>
        <h2 className="mb-4 text-xl">File</h2>
        <div className="overflow-y-auto max-h-[100vh] p-4 bg-white shadow rounded-lg border border-gray-300">
          {files.map((file: File, index: number) => (
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
