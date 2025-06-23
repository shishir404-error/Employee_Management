import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthRedirect from "./routes/AuthRedirect";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthRedirect />      {/* 🔒 Auth check on route load */}
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
