import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home_bk from "./pages/Home_bk";
import CounterPage from "./pages/CounterPage";
import EmbedDemo from "./pages/EmbedDemo";
import TestPage from "./pages/TestPage";
import Dummy1 from "./pages/Dummy1";
import GeminiSimple from "./pages/GeminiSimple";
import WikiPage from "./pages/WikiPage";
import PlantDetail from "./pages/PlantDetail";
import TosspayCheckout from "./pages/TosspayCheckout";
import TosspaySuccess from "./pages/TosspaySuccess";
import TosspayFail from "./pages/TosspayFail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout은 공통 틀이고 */}
        <Route element={<Layout />}>
          {/* 여기 안에 있는 것만 바뀜 */}
          <Route path="/" element={<EmbedDemo />} />
          <Route path="/counter" element={<CounterPage />} />
          <Route path="/embed" element={<EmbedDemo />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/dummy1" element={<Dummy1 />} />
          <Route path="/gemini" element={<GeminiSimple />} />
          <Route path="/wiki" element={<WikiPage />} />
          <Route path="/plant_detail" element={<PlantDetail />} />
          <Route path="/toss_pay_checkout" element={<TosspayCheckout />} />
          <Route path="/toss_pay_success" element={<TosspaySuccess />} />
          <Route path="/toss_pay_fail" element={<TosspayFail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;