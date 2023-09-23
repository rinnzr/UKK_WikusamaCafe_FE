import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import Menu from "./pages/admin/Menu";
import User from "./pages/admin/User";
import Meja from "./pages/admin/Meja";
import DashboardKasir from "./pages/kasir/DashboardKasir";
import Transaksi from "./pages/kasir/Transaksi/history";
import TambahTransaksi from "./pages/kasir/TambahTransaksi";
import DashboardManajer from "./pages/manajer/DashboardManajer";
import TransaksiManajer from "./pages/manajer/Transaksi";
import Laporan from "./pages/manajer/Laporan";
import "./App.css";
import Layout from "./Components/layout";

function App() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <>
      <div className="bg-white h-full min-h-screen text-[Poppins]">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        {/* route admin */}
        <div>
          <Layout>
            <Routes path="/dashboard-admin" element={<DashboardAdmin />}>
              <Route path="dashboard-admin" element={<DashboardAdmin />} />
              <Route path="menu" element={<Menu />} />
              <Route path="user" element={<User />} />
              <Route path="meja" element={<Meja />} />
            </Routes>
            {/* route kasir */}
            <Routes path="/dashboard-kasir" element={<DashboardKasir />}>
              <Route path="dashboard-kasir" element={<DashboardKasir />} />
              <Route path="transaksi" element={<Transaksi />} />
              <Route path="tambahtransaksi" element={<TambahTransaksi />} />
            </Routes>
            {/* route manajer */}
            <Routes path="/dashboard-manajer" element={<DashboardManajer />}>
              <Route path="dashboard-manajer" element={<DashboardManajer />} />
              <Route path="transaksi-manajer" element={<TransaksiManajer />} />
              <Route path="laporan" element={<Laporan />} />
            </Routes>
          </Layout>
        </div>
      </div>
    </>
  );
}

export default App;
