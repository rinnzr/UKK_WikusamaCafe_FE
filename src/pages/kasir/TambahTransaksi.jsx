import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL, config, myToken, imageURL } from "../../config";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
function TambahTransaksi() {
  const [menu, setMenu] = useState([]);
  const [meja, setMeja] = useState([]);
  const [user, setUser] = useState([]);
  const [harga, setHarga] = useState(0);
  const [tglTransaksi, setTglTransaksi] = useState("");
  const [idUser, setIdUser] = useState("");
  const [idMeja, setIdMeja] = useState("");
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [status, setStatus] = useState("");
  const [detailTransaksi, setDetailTransaksi] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    fetchMenu();
    fetchMeja();
    fetchUser();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(baseURL + "/menu", config);
      setMenu(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMeja = async () => {
    try {
      const response = await axios.get(baseURL + "/status/kosong", config);
      let options = response.data.data.map(function (meja) {
        return meja.nomor_meja;
      });

      setMeja(options);

      // mejaOptions = options

      // console.log("options >>> ", mejaOptions)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async () => {
    try {
      let options = {
        id_user: localStorage.getItem("id_user"),
        nama_user: localStorage.getItem("namauser"),
      };

      setUser(options);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = (id_menu, jumlah) => {
    const existingItem = detailTransaksi.find(
      (item) => item.id_menu === id_menu
    );

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        jumlah: existingItem.jumlah + jumlah,
        harga: existingItem,
      };
      const updatedTransaksi = detailTransaksi.map((item) =>
        item.id_menu === id_menu ? updatedItem : item
      );
      setDetailTransaksi(updatedTransaksi);
    } else {
      const newItem = { id_menu: id_menu, jumlah: jumlah, harga };
      const updatedTransaksi = [...detailTransaksi, newItem];
      setDetailTransaksi(updatedTransaksi);
    }
  };

  const handleQtyChange = (id_menu) => {
    const updatedItem = {
      ...detailTransaksi.find((item) => item.id_menu === id_menu),
      harga: parseInt(harga),
    };
    const updatedTransaksi = detailTransaksi.map((item) =>
      item.id_menu === id_menu ? updatedItem : item
    );
    setDetailTransaksi(updatedTransaksi);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const transaksiData = {
        tgl_transaksi: tglTransaksi,
        id_user: localStorage.getItem("id_user"),
        id_meja: idMeja,
        nama_pelanggan: namaPelanggan,
        status: status,
        detail_transaksi: detailTransaksi,
      };
      console.log(transaksiData);
      ///transaksi API
      const response = await axios
        .post(baseURL + "/transaksi", transaksiData, config)
        .then((e) => {
          console.log(e);
        });

      if (response.status == false) {
        alert("Terjadi kesalahan saat menambahkan transaksi");
        navigate("/transaksi", { replace: true });
      } else if (response.status == true) {
        alert("Transaksi berhasil ditambahkan");
        navigate("/Transaksi", { replace: true });
      }
    } catch (error) {
      console.error(error);
      navigate("/Transaksi", { replace: true });
      alert("Transaksi berhasil ditambahkan");
    } finally {
      // Reset form fields and state after successful submission

      setTglTransaksi("");
      setIdUser("");
      setIdMeja("");
      setNamaPelanggan("");
      setStatus("");
      setDetailTransaksi([]);
      setTotalHarga(0);
    }
  };

  const calculateTotalHarga = () => {
    let total = 0;
    detailTransaksi.forEach((item) => {
      const menuItem = menu.find(
        (menuItem) => menuItem.id_menu === item.id_menu
      );
      total += item.jumlah * menuItem.harga;
    });
    setHarga(total);
    return total;
  };

  useEffect(() => {
    const total = calculateTotalHarga();
    setTotalHarga(total);
  }, [detailTransaksi, menu]);

  useEffect(() => {
    const hariini = new Date().toISOString().split("T")[0];
    setTglTransaksi(hariini);
  }, []);

  return (
    <div className="overflow-auto">
      <form onSubmit={handleSubmit} className=" gap-4 ">
        {/* Tanggal Transaksi */}
        <div className="flex justify-between pt-5 pb-7 px-5">
          <div className="">
            <label className="block mb-1 font-bold text-gray-900">
              Tanggal Transaksi:
            </label>
            <input
              type="date"
              value={tglTransaksi}
              onChange={(event) => setTglTransaksi(event.target.value)}
              className="px-4 py-2  w-60 border rounded-lg text-gray-900"
              required
            />
          </div>
          {/* Nomor Meja */}
          <div>
            <label className="block mb-1 font-bold text-gray-900">
              Nomor Meja:
            </label>
            <select
              value={idMeja}
              onChange={(event) => setIdMeja(event.target.value)}
              className="px-4 py-2  w-60 border rounded-lg text-gray-900"
              required
            >
              <option value="">Pilih Meja</option>
              {meja.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Nama Pelanggan */}
          <div>
            <label className="block mb-1 font-bold text-gray-900">
              Nama Pelanggan:
            </label>
            <input
              type="text"
              value={namaPelanggan}
              onChange={(event) => setNamaPelanggan(event.target.value)}
              className="px-4 py-2  w-60 border rounded-lg text-gray-900"
              required
            />
          </div>

          {/* Status Pembayaran */}
          <div>
            <label className="block mb-1 font-bold text-gray-900">
              Status Pembayaran:
            </label>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              name="status"
              className="px-4 py-2  w-60 border rounded-lg text-gray-900"
              required
            >
              <option value="">Pilih Status</option>
              <option value="belum_bayar">Belum Bayar</option>
              <option value="lunas">Lunas</option>
            </select>
          </div>
          {/* User */}
          <div>
            <label className="block mb-1 font-bold text-gray-900">User:</label>
            <input
              type="text"
              value={user.nama_user}
              onChange={(event) => setIdUser(event.target.value)}
              className="px-4 py-2  w-60  outline-none  rounded-lg text-gray-900"
              required
            />
          </div>
        </div>
        {/* Menu */}
        <div className="flex flex-wrap gap-4 mt-6 justify-center">
          {menu.map((menu) => (
            <>
              <div
                key={menu.id_menu}
                className="bg-white max-w-[220px] max-h-[800px] capitalize rounded-lg overflow-hidden w-full"
              >
                <img
                  className="object-cover w-full h-44"
                  src={imageURL + menu.gambar}
                  alt={menu.gambar}
                />
                <div className="p-4">
                  <p
                    className={
                      menu.jenis === "makanan"
                        ? `bg-red-200 w-fit px-2 rounded-full font-semibold text-xs py-0.5`
                        : "bg-blue-200 w-fit px-2 rounded-full font-semibold text-xs py-0.5"
                    }
                  >
                    {menu.jenis}
                  </p>
                  <p className="font-semibold text-xl mt-2">{menu.nama_menu}</p>
                  <p>Rp {new Intl.NumberFormat("id-ID").format(menu.harga)}</p>
                  <p className="p-3 px-2 text-center">
                    Rp{" "}
                    {new Intl.NumberFormat("id-ID").format(
                      menu.harga *
                        (detailTransaksi.find(
                          (item) => item.id_menu === menu.id_menu
                        )?.jumlah || 0)
                    )}
                  </p>
                  <div className="flex  h-12 gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(menu.id_menu, -1)}
                      className="border-red-500 border-2 text-red-500 hover:border-red-600  w-full flex justify-center items-center  rounded"
                      required
                    >
                      <AiFillMinusCircle />
                    </button>
                    <input
                      type="text"
                      value={
                        detailTransaksi.find(
                          (item) => item.id_menu === menu.id_menu
                        )?.jumlah || 0
                      }
                      min="0"
                      max="99"
                      onChange={(event) =>
                        handleQtyChange(menu.id_menu, event.target.value)
                      }
                      className="w-24 text-center border rounded-md  px-2 text-black"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddToCart(menu.id_menu, 1)}
                      className="border-blue-500 border-2 hover:border-blue-600 text-blue-500 w-full flex justify-center items-center rounded "
                      required
                    >
                      <AiFillPlusCircle />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="mt-6">
          {/* Total Harga */}
          <div>
            <label className="block mb-1 text-xl font-bold text-gray-900">
              TOTAL HARGA:
            </label>
            <span className="text-xl"> Rp {new Intl.NumberFormat("id-ID").format(totalHarga)}</span>
          </div>
          {/* Tombol Submit */}
          <button
            type="submit"
            className="btn bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded-md no-underline inline-block cursor-pointer mt-2"
          >
            Tambah Transaksi
          </button>
        </div>
      </form>
    </div>
  );
}

export default TambahTransaksi;
