import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import OrderDetailsPage from "./pages/OrderDetailsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/order/:id" element={<OrderDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;