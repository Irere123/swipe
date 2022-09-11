import { BrowserRouter } from "react-router-dom";
import { ConfirmModal } from "./components/ComfirmModal";
import { PromptModal } from "./components/PromptModal";
import { Routes } from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
