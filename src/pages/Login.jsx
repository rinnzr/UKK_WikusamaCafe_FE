import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../config";

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [messages, setMessages] = React.useState(false);
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
      <div
        className="flex justify-center items-center w-screen h-screen"
        style={{ backgroundImage: 'url("/bg_login.png")' }}
      >
        <div className="flex flex-col w-full h-full p-6 rounded-md justify-center bg-black  backdrop-blur-sm  bg-opacity-5  text-gray-100">
          <div className="mb-8 text-center  ">
            <h1 className="my-3 text-4xl font-bold">Sign in</h1>
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
                  className={`block -mb-5 font-medium ${
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
                  className="w-full px-3 py-3 focus:ring-4 text-black  rounded focus:outline-none focus:ring-teal-400"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-2 mt-6">
                <label
                  htmlFor="username"
                  className={`block -mb-5 font-medium ${
                    password ? "transform -translate-y-7 text-sm mt-10" : ""
                  } transition-all duration-300`}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  className="w-full px-3 py-3 focus:ring-4 text-neutral-600 placeholder:font-normal font-extrabold rounded focus:outline-none focus:ring-teal-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {messages === true && (
                  <p className="text-end text-sm mt-2  text-red-300">
                    password atau username salah!
                  </p>
                )}
              </div>
            </div>

            <div className="max-w-sm mx-auto">
              <div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 font-semibold rounded-md bg-gradient-to-r  from-teal-200 to-lime-200 text-neutral-500"
                >
                  Sign in
                </button>
              </div>
            </div>
            <p></p>
            <h1 className="text-center text-xs font-light max-w-sm px-12 bg-black bg-opacity-20 rounded-lg py-4 mx-auto">
              aplikasi kasir untuk menunjang perekonimian umkm kecil dengan
              fitur fitur yang mudah di gunakan
            </h1>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
