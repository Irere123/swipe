import { BrowserRouter } from "react-router-dom";
import { PromptModal } from "./components/PromptModal";
import { Routes } from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes />
      <PromptModal />
    </BrowserRouter>
  );
}

export default App;
