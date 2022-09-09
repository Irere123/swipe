import { BrowserRouter } from "react-router-dom";
import { ConfirmModal } from "./components/ComfirmModal";
import { PromptModal } from "./components/PromptModal";
import { Routes } from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes />
      <PromptModal />
      <ConfirmModal />
    </BrowserRouter>
  );
}

export default App;
