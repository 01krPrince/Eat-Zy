import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Homepage from "./pages/Homepage";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- ROUTES WITH NAVBAR & FOOTER --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          {/* Add Explore, Subscriptions etc. here later */}
        </Route>

        {/* --- ROUTES WITHOUT NAVBAR (CLEAN PAGE) --- */}
        <Route path="/login" element={<AuthPage />} />

        {/* You can also add a /register route pointing to the same page */}
        <Route path="/register" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;