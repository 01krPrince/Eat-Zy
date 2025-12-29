import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminRoutes from "./routes/AdminRoutes";
import ProviderRoutes from "./routes/ProviderRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />

        <Route path="/dashboard/*" element={<ProviderRoutes />} />

        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;