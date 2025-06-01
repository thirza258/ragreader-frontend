import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import FileSubmit from "./components/FileSubmit";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function StepOne({
  setFile,
  setUrl,
  modelName,
  vectorNumber,
  setModelName,
  setVectorNumber,
}: {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setUrl: React.Dispatch<React.SetStateAction<string | null>>;
  modelName: string;
  vectorNumber: number;
  setModelName: React.Dispatch<React.SetStateAction<string>>;
  setVectorNumber: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div>
      <FileSubmit
        setUrl={setUrl}
        setFile={setFile}
        modelName={modelName}
        vectorNumber={vectorNumber}
        setModelName={setModelName}
        setVectorNumber={setVectorNumber}
      />
    </div>
  );
}

function StepTwo({
  file,
  url,
}: {
  file: File | null;
  url: string | null;
}) {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar files={file ? [file] : []} url={url || ""} />
        <div className="flex-grow overflow-y-auto bg-white p-4">
          <Chatbot />
        </div>
      </div>
    </div>
  );
}
function App() {
  const [file, setFile] = useState<File | null>(null);
  const [modelName, setModelName] = useState("OpenAI");
  const [vectorNumber, setVectorNumber] = useState(2);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
  }, [modelName, vectorNumber]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <StepOne
              setFile={setFile}
              setUrl={setUrl}
              modelName={modelName}
              vectorNumber={vectorNumber}
              setModelName={setModelName}
              setVectorNumber={setVectorNumber}
            />
          }
        />
        <Route
          path="/main"
          element={
            <StepTwo
              file={file}
              url={url}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
