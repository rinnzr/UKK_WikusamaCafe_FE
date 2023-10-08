import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import Menu from "./pages/admin/Menu";
import User from "./pages/admin/User";
import Meja from "./pages/admin/Meja";
import DashboardKasir from "./pages/kasir/DashboardKasir";
import Transaction from "./pages/kasir/Transaction";
import DashboardManajer from "./pages/manajer/DashboardManajer";
import HistoryTransaction from "./pages/kasir/history";
import TransaksiManajer from "./pages/manajer/Transaksi";
import Laporan from "./pages/manajer/Laporan";
import LaporanDay from "./pages/manajer/LaporanDay";
import LaporanKasir from "./pages/manajer/laporanByKasir";
import "./App.css";
import Layout from "./Components/layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      {/* route admin */}
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
          <Route path="transaction" element={<HistoryTransaction/>} />
          <Route path="add-transaction" element={<Transaction />} />
        </Routes>
        {/* route manajer */}
        <Routes path="/dashboard-manajer" element={<DashboardManajer />}>
          <Route path="dashboard-manajer" element={<DashboardManajer />} />
          <Route path="transaksi-manajer" element={<TransaksiManajer />} />
          <Route path="laporan-kasir" element={<LaporanKasir />} />
          <Route path="laporan-day" element={<LaporanDay />} />
          <Route path="laporan" element={<Laporan />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
