import { BrowserRouter } from "react-router-dom";
import { MainLayout } from "./modules/layouts/MainLayout";
import { Routes } from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
