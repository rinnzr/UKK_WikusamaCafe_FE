import {
  BiCollection,
  BiFoodMenu,
  BiTable,
  BiUser,
  BiMoney,
} from "react-icons/bi";
export const menuData = {
  kasir: [
    {
      id: "1",
      icons: <BiCollection />,
      nama: "Dasboard",
      link: "/dashBoard-kasir",
    },
    {
      id: "2",
      icons: <BiMoney />,
      nama: "History",
      link: "/transaction",
    },
    {
      id: "3",
      icons: <BiFoodMenu />,
      nama: "Transaction",
      link: "/add-transaction",
    },
  ],
  admin: [
    {
      id: "1",
      icons: <BiCollection />,
      nama: "Dasboard",
      link: "/dashBoard-admin",
    },
    {
      id: "2",
      icons: <BiFoodMenu />,
      nama: "Menu",
      link: "/menu",
    },
    {
      id: "3",
      icons: <BiTable />,
      nama: "Meja",
      link: "/meja",
    },
    {
      id: "4",
      icons: <BiUser />,
      nama: "user",
      link: "/user",
    },
  ],
  manajer: [
    {
      id: "1",
      icons: <BiCollection />,
      nama: "Dasboard",
      link: "/dashBoard-manajer",
    },
    {
      id: "2",
      icons: <BiFoodMenu />,
      nama: "Laporan transaksi",
      link: "/transaksi-manajer",
    },
    {
      id: "3",
      icons: <BiFoodMenu />,
      nama: "Laporan ",
      link: "/laporan",
    },
    {
      id: "4",
      icons: <BiFoodMenu />,
      nama: "Laporan by kasir ",
      link: "/laporan-kasir",
    },
    {
      id: "5",
      icons: <BiFoodMenu />,
      nama: "Laporan by Hari",
      link: "/laporan-day",
    },
  ],
};
