import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CounterPage from "./pages/CounterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout은 공통 틀이고 */}
        <Route element={<Layout />}>
          {/* 여기 안에 있는 것만 바뀜 */}
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<CounterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;