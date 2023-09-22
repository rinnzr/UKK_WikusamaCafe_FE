import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL, config, imageURL } from "../../config";

function TambahTransaksi() {
  const [menu, setMenu] = useState([]);
  const [chartMenu, setChartMenu] = useState([]);
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
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(baseURL + "/user/kasir", config);
      let options = {
        id_user: localStorage.getItem("id_user"),
        nama_user: localStorage.getItem("namauser"),
      };

      setUser(JSON.parse(JSON.stringify(options)));
    } catch (error) {
      console.error(error + "tai");
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

      if (response.status === false) {
        alert("Terjadi kesalahan saat menambahkan transaksi");
        navigate("/transaksi", { replace: true });
      } else if (response.status === true) {
        alert("Transaksi berhasil ditambahkan");
        navigate("/Transaksi", { replace: true });
      }
    } catch (error) {
      console.error(error);
      navigate("/Transaksi");
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

  return (
    <div className="px-8">
      <form onSubmit={handleSubmit}>
        {/* Tanggal Transaksi */}
        <div className="bg-white fixed w-full gap-8 flex max-w-7xl">
          <div className="grid  max-w-md  w-full grid-cols-2 py-3 ">
            {/* User */}

            <div>
              <label className="block mb-1 font-bold text-gray-900">
                Tanggal Transaksi:
              </label>
              <input
                type="date"
                value={tglTransaksi}
                onChange={(event) => setTglTransaksi(event.target.value)}
                className="px-4 py-2  w-52 border rounded-lg text-gray-900"
                required
              />
            </div>

            {/* Nomor Meja */}
            <div>
              <label className="block mb-1 font-bold text-gray-900">
                Nomor Meja:
              </label>
              {meja !== 0 ? (
                <select
                  value={idMeja}
                  onChange={(event) => setIdMeja(event.target.value)}
                  className="px-4 py-2  w-52 border rounded-lg text-gray-900"
                  required
                >
                  <option value="">Pilih Meja</option>

                  {meja.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="px-4 py-2 bg-red-400 w-52 border font-semibold rounded-lg text-white">
                  Meja penuh
                </p>
              )}
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
                className="px-4 py-2  w-52 border rounded-lg text-gray-900"
                required
              />

              {/* Status Pembayaran */}
            </div>
            <div>
              <label className="block mb-1 font-bold text-gray-900">
                Status Pembayaran:
              </label>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  value="lunas"
                  checked={status.includes("lunas")}
                  onChange={(event) => setStatus(event.target.value)}
                  id="lunas"
                  className="checked:w-8"
                  required=""
                ></input>
                <label
                  for="lunas"
                  className=" w-fit py-2 px-1 text-gray-500 bg-white border peer border-gray-200 rounded-lg cursor-pointer"
                >
                  <p>lunas</p>{" "}
                </label>

                <input
                  type="checkbox"
                  value="belum_bayar"
                  checked={status.includes("belum_bayar")}
                  onChange={(event) => setStatus(event.target.value)}
                  id="belum_bayar"
                  className="checked:w-8"
                  required=""
                />
                <label
                  for="belum_bayar"
                  className=" w-fit py-2 px-1 border text-gray-500 bg-white  border-gray-200 rounded-lg cursor-pointer   "
                >
                  <p>belum bayar</p>{" "}
                </label>
              </div>
            </div>
            {/* Total Harga */}
          </div>
          <div className="max-w-[60px] pt-4">
            <label className="block mb-1 font-bold text-gray-900">
              Chasier:
            </label>
            <input
              type="text"
              onChange={(event) => setIdUser(event.target.value)}
              value={user.nama_user}
            />
          </div>
          <div className="flex justify-between  gap-4  py-4">
            <div className="w-full max-h-52 min-w-[450px]  overflow-y-scroll">
              {detailTransaksi.map((item, index) => {
                const menuItem = menu.find(
                  (menu) => menu.id_menu === item.id_menu
                );
                return (
                  <div
                    index={index}
                    key={item.id_menu}
                    className={index % 2 === 0 && index ? "bg-slate-200" : ""}
                  >
                    {detailTransaksi.find(
                      (menu) => menu.id_menu === item.id_menu
                    )?.jumlah <= 0 ? null : (
                      <div className="flex gap-4 items-center">
                        <p className="min-w-[210px] w-full">
                          {menuItem.nama_menu}
                        </p>
                        <p>
                          {
                            detailTransaksi.find(
                              (menu) => menu.id_menu === item.id_menu
                            )?.jumlah
                          }
                        </p>
                        <p>
                          Rp.
                          {detailTransaksi.find(
                            (menu) => menu.id_menu === item.id_menu
                          )?.jumlah * menuItem.harga}
                        </p>
                        <div className="flex justify-end w-full gap-2">
                          <button
                            type="button"
                            className="from-[#FF3B30] bg-gradient-to-r to-[#FFB673]  text-white h-8 w-8 rounded"
                            onClick={() => handleAddToCart(item.id_menu, -1)}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            className="from-[#B7F592] bg-gradient-to-r to-[#73FFE6]  text-white h-8 w-8 rounded"
                            onClick={() => handleAddToCart(item.id_menu, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div>
              <p className="  font-bold text-gray-900">Total Harga:</p>
              <p className="mb-5 text-xl">
                Rp.{new Intl.NumberFormat("id-ID").format(totalHarga)}
              </p>

              <div>
                {meja ? (
                  <button
                    type="submit"
                    className=" from-[#F2E3DB] bg-gradient-to-r to-[#c9a490] text-neutral-800 font-semibold  flex justify-end px-3 py-4 leading-4 rounded-lg cursor-pointer"
                  >
                    Tambah Transaksi
                  </button>
                ) : (
                  <p className="px-12 cursor-pointer py-8  bg-red-400 w-52 border font-semibold rounded-lg text-white">
                    Meja penuh
                  </p>
                )}
              </div>
            </div>
            {/* Tombol Submit */}
          </div>
        </div>

        <div className="justify-center pt-56  grid pb-16 grid-cols-5 gap-4">
          {menu.map((menu) => (
            <>
              <div className="bg-white w-full capitalize">
                <img
                  className="w-full object-cover h-40"
                  src={imageURL + menu.gambar}
                  alt={menu.gambar}
                />
                <article className="px-2 pb-2">
                  <p className="font-medium py-2 text-xl h-16">
                    {menu.nama_menu}
                  </p>
                  <p className="font-semibold text-neutral-400">
                    Rp.{new Intl.NumberFormat("id-ID").format(menu.harga)}
                  </p>
                  <div className="flex mt-4 justify-between w-full ">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(menu.id_menu, 1)}
                      className="from-[#F2E3DB]  bg-gradient-to-r to-[#c9a490] right-0 ml-auto w-fit px-5 text-neutral-800 tracking-widest font-bold py-4 rounded  "
                      required
                    >
                      Pesan
                    </button>
                  </div>
                </article>
              </div>
            </>
          ))}
        </div>
      </form>
    </div>
  );
}

export default TambahTransaksi;
