import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-tabs/style/react-tabs.css";
import Modal from "react-modal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { baseURL, config, imageURL } from "../../config";
import { IoCartOutline } from "react-icons/io5";

function TambahTransaksi() {
  const [menu, setMenu] = useState([]);
  const [meja, setMeja] = useState([]);
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
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
    //menjalankan fungsi secara otomatis dari ketiga fungsi didalamnya dalam sekali render
    fetchMenu();
    fetchMeja();
    getUser();
  }, []);

  const fetchMenu = async () => {
    //untuk memanggil data dari api /menu
    try {
      //menjalankan fungsi pertama untuk memanggil data API /menu
      const response = await axios.get(baseURL + "/menu", config);
      setMenu(response.data.data); //memperbarui nilai dari Menu
    } catch (error) {
      // membuat pesan err ketika ada kesalahan dalam fethMenu
      console.error(error); //menampilkan error
      alert("gagal menampilkan data");
    }
  };

  const fetchMeja = async () => {
    //untuk memanggil data dari api /status/kosong
    try {
      //menjalankan fungsi pertama untuk memanggil data API /status/kosong
      const response = await axios.get(baseURL + "/status/kosong", config);
      let options = response.data.data.map(function (meja) {
        //membuat array[] dengan fungsi map,dari data respon data
        return meja.nomor_meja; //mengembalikan nilai ke options dengan data meja.nomor_meja
      });

      setMeja(options); //memperbarui nilai dari Menu dan mendapatkan dari options[]
    } catch (error) {
      // membuat pesan err ketika ada kesalahan dalam fethMenu
      console.error(error); //menampilkan error
    }
  };

  const getUser = () => {
    //fungsi untuk melakukan getUser
    let user = {
      id_user: localStorage.getItem("id_user"), //memanggil data dari localstorage "id_user"
      nama_user: localStorage.getItem("namauser"), //memanggil data dari localstorage "namauser"
    };
    setUser(user); //memperbarui nilai user dari data user
  };

  const handleAddCart = (id_menu, jumlah) => {
    //funsi yang memiliki parameter id_menu dan jumlah
    const dataDariOrder = detailTransaksi.find(
      //find berfunsi untuk menemukan data
      (menu) => menu.id_menu === id_menu //menyalmakan data menu.id_menu dengan id_menu dari parameter yang dikirim
    );

    if (dataDariOrder) {
      const updatedItem = {
        //memperbarui nilai dari datadariorder + jumlah dan harga
        ...dataDariOrder, //array objek yang nilainya akan di perbarui dengan menggabungkan dengan nilai baru
        //======,//nilai baru yang di gabungkan dengan array data datadarioder
        jumlah: dataDariOrder.jumlah + jumlah,
        harga: dataDariOrder,
        //====
      };
      const NewTransaksi = detailTransaksi.map(
        (
          transaksi //membuat funsi baru untuk membuat array dari map detailtransaksi
        ) => (transaksi.id_menu === id_menu ? updatedItem : transaksi) //menyamaakan data detailtransaksi dengan id_menu dari parameter id_menu
      );
      setDetailTransaksi(NewTransaksi); //memperbarui nilai detailtransaksi dari data Newtransaksi
    } else {
      const newItem = { id_menu: id_menu, jumlah: jumlah, harga }; //Newitem yang berisi  id_menu: id_menu, jumlah: jumlah, harga
      const NewTransaksi = [...detailTransaksi, newItem]; //menggabugnkan spread object dengan newItem
      setDetailTransaksi(NewTransaksi); //memperbarui nilai detailtransaksi dari data Newtransaksi
    }
  };

  const handleSubmit = async (event) => {
    //fungsi handle yang akan menjalankan perintah dengan parameter envent
    event.preventDefault(); //menjalankan fungsi prevent untuk menghentikan default data dari event
    try {
      const transaksiData = {
        tgl_transaksi: tglTransaksi, //mengisi data tgl_transaksi dengan tglTransaksi
        id_user: localStorage.getItem("id_user"),
        id_meja: idMeja,
        nama_pelanggan: namaPelanggan,
        status: status,
        detail_transaksi: detailTransaksi,
      };
      ///transaksi API
      axios.post(baseURL + "/transaksi", transaksiData, config).then((err) => {
        console.log(err);
        alert("Transaksi berhasil ditambahkan");
        navigate("/transaksi");
      });
    } catch (err) {
      alert("Transaksi berhasil ditambahkan");
      navigate("/transaksi");
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
      total +=
        item.jumlah *
        menu.find((menuItem) => menuItem.id_menu === item.id_menu).harga;
    });
    setHarga(total);
    return total;
  };

  useEffect(() => {
    const total = calculateTotalHarga();
    setTotalHarga(total);
  }, [detailTransaksi, menu]);

  useEffect(() => {
    const formattedDate = new Date().toISOString().split("T")[0];
    setTglTransaksi(formattedDate);
  }, []);

  const handleOpen = (menu) => {
    setSelectedMenu(menu);
    setOpen(!open);
  };

  return (
    <>
      <div className="w-full">
        <div className="w-full">
          <form onSubmit={handleSubmit} className="flex w-full h-screen">
            <div className="w-full">
              <div className="data-transaksi-user sticky flex top-0 w-full gap-8 bg-white">
                <div className="flex flex-wrap py-3 gap-2">
                  <div>
                    <label className="text-neutral-600 font-semibold text-sm">
                      Tanggal Transaksi:
                    </label>
                    <input
                      type="date"
                      value={tglTransaksi}
                      onChange={(event) => setTglTransaksi(event.target.value)}
                      className="block appearance-none w-full border-2 border-gray-200 rounded hover:border-gray-500 px-4 h-10 focus:outline-none "
                      required
                    />
                  </div>

                  <div>
                    <label className="text-neutral-600 font-semibold text-sm">
                      Nomor Meja:
                    </label>
                    {meja !== 0 ? (
                      <select
                        value={idMeja}
                        onChange={(event) => setIdMeja(event.target.value)}
                        className="block appearance-none w-full border-2 border-gray-200 rounded hover:border-gray-500 px-4 h-10 focus:outline-none "
                        required
                      >
                        <option>pilih meja</option>
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

                  <div>
                    <label className="text-neutral-600 font-semibold text-sm">
                      Nama Pelanggan:
                    </label>
                    <input
                      type="text"
                      value={namaPelanggan}
                      onChange={(event) => setNamaPelanggan(event.target.value)}
                      className="block appearance-none w-full border-2 border-gray-200 rounded hover:border-gray-500 px-4 h-10 focus:outline-none "
                      required
                    />
                  </div>
                  <div>
                    <label className="text-neutral-600 font-semibold text-sm">
                      Status Pembayaran:
                    </label>
                    <div className="flex gap-1 items-center h-10">
                      <input
                        type="checkbox"
                        value="lunas"
                        checked={status.includes("lunas")}
                        onChange={(event) => setStatus(event.target.value)}
                        className="w-8 h-8 border-green-600 outline-green-600  rounded-md"
                        required=""
                      />
                      <p className="text-green-500">Paid</p>
                      <input
                        type="checkbox"
                        value="belum_bayar"
                        checked={status.includes("belum_bayar")}
                        onChange={(event) => setStatus(event.target.value)}
                        className="w-8 h-8"
                        required=""
                      />
                      <p className="checked:bg-black text-red-500">Not Paid</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-neutral-600 font-semibold text-sm">
                      Chasier Name:
                    </label>
                    <input
                      type="text"
                      className="block appearance-none w-full pl-4 h-10 focus:outline-none "
                      onChange={(event) => setIdUser(event.target.value)}
                      value={user.nama_user}
                    />
                  </div>
                </div>
              </div>
              <div className="h-[85vh] w-full bg-[#fafafa]">
                <Tabs className="w-full">
                  <TabList>
                    <Tab>Minuman</Tab>
                    <Tab>Makanan</Tab>
                  </TabList>
                  <TabPanel className=" w-full ">
                    <div className="w-full flex h-[80vh] flex-wrap gap-1 overflow-y-scroll">
                      {menu
                        .filter((jenis) => jenis.jenis == "minuman")
                        .map((menu) => (
                          <>
                            <div
                              key={menu.id_menu}
                              className="bg-white h-fit w-full max-w-[12rem] border rounded border-green-500"
                            >
                              <img
                                onClick={() => handleOpen(menu)}
                                className="w-full object-cover h-32"
                                src={imageURL + menu.gambar}
                                alt={menu.gambar}
                              />
                              <article className="px-2 pb-2">
                                <p className="font-medium pt-2 text-base truncate capitalize">
                                  {menu.nama_menu}
                                </p>
                                <p className="font-normal text-sm text-neutral-400">
                                  Rp.
                                  {new Intl.NumberFormat("id-ID").format(
                                    menu.harga
                                  )}
                                </p>
                                <div className="flex mt-4 justify-between w-full ">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleAddCart(menu.id_menu, 1)
                                    }
                                    className="w-full bg-neutral-100 border border-green-500 active:bg-green-500 active:text-white py-4 duration-200 rounded text-green-500  "
                                    required
                                  >
                                    Order
                                  </button>
                                </div>
                              </article>
                            </div>
                          </>
                        ))}
                    </div>
                  </TabPanel>
                  <TabPanel className=" w-full ">
                    <div className="w-full flex  h-[80vh] flex-wrap gap-1  overflow-y-scroll">
                      {menu
                        .filter((jenis) => jenis.jenis == "makanan")
                        .map((menu) => (
                          <>
                            <div
                              key={menu.id_menu}
                              className="bg-white h-fit w-full max-w-[12rem] border rounded border-green-500"
                            >
                              <img
                                onClick={() => handleOpen(menu)}
                                className="w-full object-cover h-32"
                                src={imageURL + menu.gambar}
                                alt={menu.gambar}
                              />
                              <article className="px-2 pb-2">
                                <p className="font-medium pt-2 text-base truncate capitalize">
                                  {menu.nama_menu}
                                </p>
                                <p className="font-normal text-sm text-neutral-400">
                                  Rp.
                                  {new Intl.NumberFormat("id-ID").format(
                                    menu.harga
                                  )}
                                </p>
                                <div className="flex mt-4 justify-between w-full ">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleAddCart(menu.id_menu, 1)
                                    }
                                    className="w-full bg-neutral-100 border border-green-500 active:bg-green-500 active:text-white py-4 duration-200 rounded text-green-500  "
                                    required
                                  >
                                    Order
                                  </button>
                                </div>
                              </article>
                            </div>
                          </>
                        ))}
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>

            {detailTransaksi[0] ? (
              <div className="min-w-[400px] border-l border-green-500 right-0 flex flex-col items-stretch relative max-w-[400px] h-screen   translate-x-4 text-xs max-h-[100vh] overflow-y-scroll">
                <table className="py-4 pl-4 pr-2">
                  <thead>
                    <tr className="bg-neutral-200">
                      <th className="text-start p-2">Nama</th>
                      <th>Jumlah</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailTransaksi.map((item, index) => {
                      const menuItem = menu.find(
                        (menu) => menu.id_menu === item.id_menu
                      );
                      return detailTransaksi.find(
                        (menu) => menu.id_menu === item.id_menu
                      )?.jumlah <= 0 ? null : (
                        <tr className={index % 2 !== 0 && "bg-neutral-100"}>
                          <td className="w-full px-1">{menuItem.nama_menu}</td>
                          <td className="text-center">
                            {
                              detailTransaksi.find(
                                (menu) => menu.id_menu === item.id_menu
                              )?.jumlah
                            }
                          </td>
                          <td className=" px-2">
                            Rp.
                            {detailTransaksi.find(
                              (menu) => menu.id_menu === item.id_menu
                            )?.jumlah * menuItem.harga}
                          </td>

                          <td className="flex gap-2 py-1">
                            <button
                              type="button"
                              className="from-[#FF3B30] bg-gradient-to-r to-[#FFB673]  text-white text-2xl font-semibold h-8 w-8 rounded"
                              onClick={() => handleAddCart(item.id_menu, -1)}
                            >
                              -
                            </button>
                            <button
                              type="button"
                              className="from-[#B7F592] bg-gradient-to-r to-[#73FFE6]  text-white text-2xl font-semibold h-8 w-8 rounded"
                              onClick={() => handleAddCart(item.id_menu, 1)}
                            >
                              +
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className=" py-4 pl-4 pr-2">
                  <div className="flex justify-between">
                    <p className="mb-5 flex flex-col">
                      <span className="font-normal">Total Harga:</span>
                      Rp.{new Intl.NumberFormat("id-ID").format(totalHarga)}
                      <br />
                      PPN 10%.
                      {new Intl.NumberFormat("id-ID").format(totalHarga * 0.1)}
                      <br />
                      <span className="text-lg font-semibold">
                        Total Bayar Rp.
                        {new Intl.NumberFormat("id-ID").format(
                          totalHarga + totalHarga * 0.1
                        )}
                      </span>
                    </p>
                    <p className="mb-5 text-sm text-end">
                      <span>Jumlah Item </span>
                      {detailTransaksi.reduce(
                        (total, item) => total + item.jumlah,
                        0
                      )}
                    </p>
                  </div>
                  <button
                    type="submit"
                    className=" bg-green-500  text-neutral-100 text-base flex justify-center gap-4 font-semibold  w-full  py-4 leading-4 rounded-lg cursor-pointer"
                  >
                    Tambah Transaksi
                    <IoCartOutline fontSize="large" />
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
      <Modal
        isOpen={open}
        overlayRef={false}
        className="w-full bg-black bg-opacity-60 p-24 h-screen"
      >
        <button onClick={() => setOpen(!open)} className="text-white">
          close
        </button>
        {selectedMenu && (
          <div
            onClick={() => setOpen(!open)}
            className="  w-full flex justify-center items-center h-full"
          >
            <div className="bg-white w-96 h-full max-h-[37.215rem] p-2 rounded-md flex flex-col justify-between items-center">
              <img
                src={imageURL + selectedMenu.gambar}
                alt="gambar"
                className="h-64 object-cover w-full rounded-sm"
              />
              <p className="text-2xl  font-semibold capitalize">
                {selectedMenu.nama_menu}
              </p>
              <p className="text-lg  text-neutral-500  font-semibold capitalize">
                Rp.{new Intl.NumberFormat("id-ID").format(selectedMenu.harga)}
              </p>
              <p>
                Deskripsi: <span>{selectedMenu.deskripsi}</span>
              </p>
              <button
                type="button"
                onClick={() => handleAddCart(selectedMenu.id_menu, 1)}
                className="w-full bg-neutral-100 border  border-green-500 active:bg-green-500 active:text-white py-4 duration-200 rounded text-green-500  "
                required
              >
                Order
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default TambahTransaksi;
