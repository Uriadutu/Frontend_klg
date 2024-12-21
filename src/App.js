import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DasborPage from "./pages/DasborPage";
import UserPage from "./pages/UserPage";
import ValidasiPage from "./pages/ValidasiPage";
import DataKlentengPage from "./pages/DataKlentengPage";
import DataUmatPage from "./pages/DataUmatPage";
import AturValidasiPage from "./pages/AturValidasiPage";
import DetailAturValidasiPage from "./pages/DetailAturValidasiPage";
import DetailUmatPage from "./pages/DetailUmatPage";
import DataValidasiPage from "./pages/Asmin/DataValidasiPage";





function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dasbor" element={<DasborPage/>} />
          <Route path="/user" element={<UserPage />} /> 
          <Route path="/validasi" element={<ValidasiPage />} /> 
          <Route path="/validasi/:nama/:id" element={<AturValidasiPage />} /> 
          <Route path="/validasi/:nama/:id/:idumat" element={<DetailAturValidasiPage />} /> 
          <Route path="/data-klenteng" element={<DataKlentengPage />} /> 
          <Route path="/data-klenteng/data-umat/:klentengId" element={<DataUmatPage />} /> 
          <Route path="/data-klenteng/data-umat/:klentengId/:idumat" element={<DetailUmatPage />} /> 
          <Route path="/data-klenteng/data-umat/:klentengId/detail" element={<DataUmatPage />} /> 
          {/* //admin */}
          <Route path="/data-validasi" element={<DataValidasiPage />} /> 

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
