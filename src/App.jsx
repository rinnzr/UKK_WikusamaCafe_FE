import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import Menu from "./pages/admin/Menu";
import User from "./pages/admin/User";
import Meja from "./pages/admin/Meja";
import DashboardKasir from "./pages/kasir/DashboardKasir";
import Transaksi from "./pages/kasir/Transaksi/Transaksi";
import TambahTransaksi from "./pages/kasir/TambahTransaksi";
import DashboardManajer from "./pages/manajer/DashboardManajer";
import TransaksiManajer from "./pages/manajer/Transaksi";
import LaporanTgl from "./pages/manajer/Laporan";
import LaporanKasir from "./pages/manajer/LaporanKasir";
import "./App.css";
import Layout from "./Components/layout";

function App() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <>
      <div className="App bg-[#EFE1D1] h-full min-h-screen text-[Poppins]">
        {/* agar login tidak menampilkan sidebar */}
        {location.pathname !== "/" && location.pathname !== "*" && <Layout />}

        {/* route utama */}
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        {/* route admin */}
        <div>
          <Layout>
            <Routes path="/DashboardAdmin" element={<DashboardAdmin />}>
              <Route path="DashboardAdmin" element={<DashboardAdmin />} />
              <Route path="menu" element={<Menu />} />
              <Route path="user" element={<User />} />
              <Route path="meja" element={<Meja />} />
            </Routes>
            {/* route kasir */}
            <Routes path="/DashboardKasir" element={<DashboardKasir />}>
              <Route path="DashboardKasir" element={<DashboardKasir />} />
              <Route path="transaksi" element={<Transaksi />} />
              <Route path="Tambahtransaksi" element={<TambahTransaksi />} />
            </Routes>
            {/* route manajer */}
            <Routes path="/DashboardManajer" element={<DashboardManajer />}>
              <Route path="DashboardManajer" element={<DashboardManajer />} />
              <Route path="TransaksiManajer" element={<TransaksiManajer />} />
              <Route path="Laporan" element={<LaporanTgl />} />
              <Route path="LaporanKasir" element={<LaporanKasir />} />
            </Routes>
          </Layout>
        </div>
      </div>
    </>
  );
}

export default App;
