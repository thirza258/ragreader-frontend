import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import FileSubmit from "./components/FileSubmit";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function StepOne({ setFile, modelName,vectorNumber, setModelName, setVectorNumber }: { setFile: React.Dispatch<React.SetStateAction<File | null>>, modelName: string, vectorNumber:number, setModelName: React.Dispatch<React.SetStateAction<string>>, setVectorNumber: React.Dispatch<React.SetStateAction<number>> }) {
  return (
    <div>
      <FileSubmit setFile={setFile} modelName={modelName} vectorNumber={vectorNumber} setModelName={setModelName} setVectorNumber={setVectorNumber} />
    </div>
  );
}

function StepTwo({ file, modelName, vectorNumber }: { file: File | null, modelName: string, vectorNumber: number }) {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar files={file ? [file] : []}/>
        <div className="flex-grow overflow-y-auto bg-white p-4">
          <Chatbot/>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [modelName, setModelName] = useState("GPT");
  const [vectorNumber, setVectorNumber] = useState(1);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StepOne setFile={setFile} modelName={modelName} vectorNumber={vectorNumber} setModelName={setModelName} setVectorNumber={setVectorNumber}/>} />
        <Route path="/main" element={<StepTwo file={file} modelName={modelName} vectorNumber={vectorNumber}/>} />
      </Routes>
    </Router>
  );
}

export default App;
