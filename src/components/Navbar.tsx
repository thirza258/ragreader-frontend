import service from "../services/service";

const NavBar: React.FC = () => {
    const handleStartOver = async () => {
      try {
        await service.cleanSystem();
      } catch (error) {
        console.error("Error cleaning system:", error);
        alert("Failed to clean system.");
      }
      window.location.href = "/";
    };

    return (
      <nav className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4 border-b-2 border-white z-10">
      <h1 className="text-lg font-bold">RAG Reader</h1>
      <button
        onClick={handleStartOver}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Start Over
      </button>
      </nav>
    );
  };
  
  export default NavBar;
  