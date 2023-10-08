import Modal from "react-modal";
import * as React from "react";
import axios from "axios";
import { config, baseURL, imageURL } from "../../config";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import NoData from "../../Components/NoData";

const Menu = () => {
  const [menus, setMenus] = React.useState([]);
  const [ModalIsOpen, setModalIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [change, setChange] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [newMenu, setnewMenu] = React.useState([
    {
      id_menu: "",
      nama_menu: "",
      jenis: "",
      deskripsi: "",
      gambar: null,
      harga: "",
    },
  ]);

  React.useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(baseURL + "/menu", config);
      setMenus(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        baseURL + "/menu/find",
        { keyword: search },
        config
      );
      setMenus(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    setAction("add"); // save new member

    setnewMenu({
      id_menu: "",
      nama_menu: "",
      jenis: "",
      deskripsi: "",
      gambar: null,
      harga: "",
    });
  };

  const handleEdit = (item) => {
    setAction("edit"); // update old member
    setnewMenu({
      id_menu: item.id_menu,
      nama_menu: item.nama_menu,
      jenis: item.jenis,
      harga: item.harga,
      deskripsi: item.deskripsi,
      gambar: item.gambar,
    });
  };

  const handleDelete = async (id_menu) => {
    alert("Are you sure delete this data?");

    try {
      const response = await axios.delete(baseURL + "/menu/" + id_menu, config);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
    }
    fetchMenu();
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setChange(false);

    const data = new FormData();
    data.append("nama_menu", newMenu.nama_menu);
    data.append("jenis", newMenu.jenis);
    data.append("harga", newMenu.harga);
    data.append("deskripsi", newMenu.deskripsi);
    data.append("gambar", newMenu.gambar);

    if (action === "add") {
      try {
        const response = await axios.post(baseURL + "/menu", data, config);
        alert(response.data.message);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
    if (action === "edit") {
      try {
        const response = await axios.put(
          baseURL + "/menu/" + newMenu.id_menu,
          data,
          config
        );
        alert(response.data.message);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
    fetchMenu();
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full ">
        <div className="flex  bg-white z-50 text-white justify-between py-6">
          <form className="  w-full" onSubmit={(e) => handleSearch(e)}>
            <input
              type="search"
              name="Search"
              placeholder="Search..."
              className="w-96 h-12 rounded pl-4 text-sm outline-none bg-white text-neutral-700 border border-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-teal-500 ml-4 w-24 h-12 rounded">cari</button>
          </form>
          <button
            onClick={() => setModalIsOpen(true, handleAdd())}
            className="bg-teal-500 w-44 px-4 h-12 rounded"
          >
            Add Menu
          </button>
        </div>
        {menus.length ? (
          <Tabs className="w-full mb-10 h-[85vh] overflow-y-scroll">
            <TabList className="sticky ">
              <Tab>Minuman</Tab>
              <Tab>Makanan</Tab>
            </TabList>
            <TabPanel className=" w-full ">
              <table className="min-w-full h-full divide-y divide-gray-200 ">
                <thead className="bg-teal-500 text-xs tracking-wider text-white sticky top-0  uppercase text-center   w-full">
                  <tr>
                    <th className="px-2 font-medium  py-4">No</th>
                    <th>Nama Menu</th>
                    <th>Jenis</th>
                    <th>Harga</th>
                    <th>Deskripsi</th>
                    <th>Gambar</th>
                    <th className="px-2 font-medium  min-w-[150px] ">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 text-base">
                  {menus
                    .filter((jenis) => jenis.jenis === "minuman")
                    .map((item, index) => (
                      <tr key={item.id_menu}>
                        <td className="px-4">{index + 1}</td>
                        <td className="px-4">{item.nama_menu}</td>
                        <td className="px-4">{item.jenis}</td>
                        <td className="px-4">{item.harga}</td>
                        <td className="px-4">{item.deskripsi}</td>
                        <td className="px-4">
                          <img
                            className="object-cover w-44 h-32 py-2"
                            src={imageURL + item.gambar}
                            alt={item.gambar}
                          />
                        </td>
                        <td className="px-2 flex min-w-[150px] h-full justify-center items-center">
                          <div>
                            <button
                              className="hover:bg-blue-400 text-blue-400 hover:text-white duration-150 ease-out font-bold py-2 px-4 rounded-md cursor-pointer"
                              onClick={() => {
                                setModalIsOpen(true);
                                handleEdit(item);
                              }}
                            >
                              <AiFillEdit />
                            </button>
                            <button
                              className="hover:bg-red-400 text-red-400 hover:text-white duration-150 ease-out font-bold py-2 px-4 rounded-md cursor-pointer"
                              onClick={() => handleDelete(item.id_menu)}
                            >
                              <AiFillDelete />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </TabPanel>
            <TabPanel className=" w-full ">
              <table className="min-w-full h-full divide-y divide-gray-200 ">
                <thead className="bg-teal-500 text-xs tracking-wider text-white sticky top-0  uppercase text-center   w-full">
                  <tr>
                    <th className="px-2 font-medium  py-4 max-w-fit ">No</th>
                    <th>Nama Menu</th>
                    <th>Jenis</th>
                    <th>Harga</th>
                    <th>Deskripsi</th>
                    <th>Gambar</th>
                    <th className="px-2 font-medium  min-w-[150px] ">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 text-base">
                  {menus.length ? "" : <NoData />}
                  {menus
                    .filter((jenis) => jenis.jenis === "makanan")
                    .map((item, index) => (
                      <tr key={item.id_menu}>
                        <td className="px-4">{index + 1}</td>
                        <td className="px-4">{item.nama_menu}</td>
                        <td className="px-4">{item.jenis}</td>
                        <td className="px-4">{item.harga}</td>
                        <td className="px-4">{item.deskripsi}</td>
                        <td className="px-4">
                          <img
                            className="object-cover w-44 h-32 py-2"
                            src={imageURL + item.gambar}
                            alt={item.gambar}
                          />
                        </td>
                        <td className="px-2 flex min-w-[150px] h-full justify-center items-center">
                          <div>
                            <button
                              className="hover:bg-blue-400 text-blue-400 hover:text-white duration-150 ease-out font-bold py-2 px-4 rounded-md cursor-pointer"
                              onClick={() => {
                                setModalIsOpen(true);
                                handleEdit(item);
                              }}
                            >
                              <AiFillEdit />
                            </button>
                            <button
                              className="hover:bg-red-400 text-red-400 hover:text-white duration-150 ease-out font-bold py-2 px-4 rounded-md cursor-pointer"
                              onClick={() => handleDelete(item.id_menu)}
                            >
                              <AiFillDelete />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </TabPanel>
          </Tabs>
        ) : (
          <NoData />
        )}

        {/* button add */}
      </div>

      <Modal
        isOpen={ModalIsOpen}
        ariaHideApp={false}
        onRequestClose={() => setModalIsOpen(false)}
        overlayClassName="modal-overlay"
      >
        <div className="modal-content ">
          <h2 className="text-2xl font-semibold leading-tight tracking-wide">
            Menu
          </h2>
          <div>
            <button onClick={() => setModalIsOpen(false)}>
              <a className="absolute top-2 right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="flex-shrink-0 w-6 h-6"
                >
                  <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
                </svg>
              </a>
            </button>
          </div>
          <div>
            <form onSubmit={(e) => handleSave(e)} className="flex flex-col ">
              <div>
                <label className="text-sm text-gray-800">Nama</label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 text-sm  bg-white border border-gray-400 rounded-md focus:border focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) =>
                    setnewMenu({ ...newMenu, nama_menu: e.target.value })
                  }
                  value={newMenu.nama_menu}
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-800">Jenis</label>
                <select
                  className="block w-full px-4 py-2 text-sm  bg-white border border-gray-400 rounded-md focus:border focus:outline-none focus:ring focus:ring-opacity-40"
                  value={newMenu.jenis}
                  onChange={(e) =>
                    setnewMenu({ ...newMenu, jenis: e.target.value })
                  }
                  required
                >
                  <option value="">
                    {newMenu.jenis !== "" ? newMenu.jenis : "~Choose~"}
                  </option>
                  <option value="makanan">Makanan</option>
                  <option value="minuman">Minuman</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-800">Harga</label>
                <input
                  type="number"
                  className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-400 rounded-md focus:border focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={(e) =>
                    setnewMenu({ ...newMenu, harga: e.target.value })
                  }
                  value={newMenu.harga}
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-800">Deskripsi</label>
                <textarea
                  className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-400 rounded-md focus:border focus:outline-none focus:ring focus:ring-opacity-40 h-24"
                  onChange={(e) =>
                    setnewMenu({ ...newMenu, deskripsi: e.target.value })
                  }
                  value={newMenu.deskripsi}
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-800">Gambar</label> <br />
                <img
                  src={
                    newMenu.gambar !== null
                      ? change
                        ? URL.createObjectURL(newMenu.gambar)
                        : imageURL + newMenu.gambar
                      : null
                  }
                  alt={newMenu.gambar}
                  className="max-w-xs"
                />
                <input
                  type="file"
                  className="form-control mb-2"
                  onChange={(e) => {
                    setnewMenu({ ...newMenu, gambar: e.target.files[0] });
                    setChange(true);
                  }}
                />
              </div>

              <button
                className="btn hover:bg-blue-400 text-blue-400 hover:text-white duration-150 ease-out font-bold py-2 px-4 rounded-md no-underline inline-block cursor-pointer"
                type="submit"
              >
                Save
              </button>
            </form>
          </div>
          {/* <button
          type="button"
          classN1w-full"px-8 py-2 font-semibold rounded-full bg-violet-400 text-gray-900"
        >
          Start recycling
        </button> */}
        </div>
      </Modal>
    </div>
  );
};

export default Menu;
