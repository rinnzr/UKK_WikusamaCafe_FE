import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../config";
import { IoEye, IoEyeOff } from "react-icons/io5";

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [messages, setMessages] = React.useState(false);
  const [isShow, setIsShow] = React.useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseURL + "/auth/auth", {
        username,
        password,
      });
      if (response.data.logged) {
        localStorage.setItem("logged", response.data.logged);
        localStorage.setItem("namauser", response.data.data.nama_user);
        localStorage.setItem("id_user", response.data.data.id_user);
        localStorage.setItem("user", response.data.data.role);
        localStorage.setItem("token", response.data.token);
        if (response.data.data.role === "admin") {
          navigate("/dashboard-admin");
        } else if (response.data.data.role === "kasir") {
          navigate("/dashboard-kasir");
        } else {
          navigate("/dashboard-manajer");
        }
      } else {
        if (response.data.message) {
          setMessages(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen bg-teal-500">
        <div className="flex flex-col w-full  h-full p-6 text-neutral-700 rounded-md justify-center  ">
          <div className="bg-[#fafafa] max-w-7xl flex  items-center w-full mx-auto  py-16 rounded-xl px-12">
            <div className="w-1/2">
              <img
                src="/login_image.png"
                alt=""
                className="w-96 mx-auto h-fit "
              />
            </div>
            <div className="bg-[#fafafa] w-1/2 mx-auto rounded-xl px-12">
              <div className="mb-8 text-center ">
                <img src="/logo1.png" alt="" className="w-16 mx-auto" />
                <h1 className="my-3 text-2xl font-bold ">LOGIN</h1>
                <p className="text-sm text-gray-400">
                  Sign in to access your account
                </p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="space-y-12 ng-untouched ng-pristine ng-valid"
              >
                <div className="space-y-4 max-w-sm mx-auto">
                  <div className="mb-4 mt-6">
                    <label
                      htmlFor="username"
                      className={`block -mb-5 font-medium   ${
                        username ? "transform -translate-y-7 text-sm mt-10" : ""
                      } transition-all duration-300`}
                    >
                      username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="username"
                      className="w-full px-3 py-3 ring-1   rounded focus:outline-none ring-neutral-400"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-2 mt-6">
                    <label
                      htmlFor="username"
                      className={`block -mb-5 font-medium  ${
                        password ? "transform -translate-y-7 text-sm mt-10" : ""
                      } transition-all duration-300`}
                    >
                      Password
                    </label>
                    <div className="flex w-full ring-1 overflow-hidden rounded  ring-neutral-400">
                      <input
                        type={isShow ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="password"
                        className="focus:outline-none w-full  px-3 py-3 bg-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <p
                        className="bg-white flex justify-center items-center px-2"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsShow(!isShow);
                        }}
                      >
                        {isShow ? <IoEye /> : <IoEyeOff />}
                      </p>
                    </div>

                    {messages === true && (
                      <p className="text-end text-sm mt-2  text-red-300">
                        password atau username salah!
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 max-w-sm ml-14 hover:bg-white hover:ring-1 ring-teal-500 hover:text-teal-500 duration-200 font-semibold rounded-md bg-teal-500 text-white"
                >
                  LogIn
                </button>
                <p></p>
                <h1 className="text-center text-xs font-light max-w-sm px-12 bg-neutral-200 rounded-lg py-4 mx-auto">
                  aplikasi kasir untuk menunjang perekonimian umkm kecil dengan
                  fitur fitur yang mudah di gunakan
                </h1>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
