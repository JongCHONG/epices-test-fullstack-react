import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductionViewer from "./components/ProductionViewer/ProductionViewer";
import './App.scss'

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProductionViewer />} />
    </Routes>
  </BrowserRouter>
);

export default App;