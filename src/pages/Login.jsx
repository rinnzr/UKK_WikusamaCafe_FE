import React from "react";
import { useState } from "react"; //membuat state
import { useNavigate } from "react-router-dom"; //meredirect halaman setelah login lalu ke dashboard
import axios from "axios"; //mengakses API
import { baseURL } from "../config";
import bg from "./Image/bg_login.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseURL+ "/auth/auth", {
        username,
        password,
      });
      console.log(response.data);
      if (response.data.logged) {
        localStorage.setItem("logged", response.data.logged);
        localStorage.setItem("namauser", JSON.stringify(response.data.data.nama_user));
        localStorage.setItem("id_user", JSON.stringify(response.data.data.id_user));
        localStorage.setItem("user", JSON.stringify(response.data.data.role));
        localStorage.setItem("token", response.data.token);
        // localStorage.setItem('username', username);
        if (response.data.data.role === "admin") {
          history("/DashboardAdmin");
        } else if (response.data.data.role === "kasir"){
          history("/DashboardKasir");
        } else{
          history("/DashboardManajer");
        }
        
        // alert("Login Berhasil")
      } else {
        console.log("LOGIN GAGAL");
        alert("Login Gagal");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen" style={{backgroundImage:`url(${bg})`}}>
        <div className="flex flex-col max-w-md w-full p-6 rounded-md bg-black  sm:p-10 backdrop-blur-sm  bg-opacity-5  text-gray-100">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign in</h1>
            <p className="text-sm text-gray-400">
              Sign in to access your account
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-12 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label for="username" className="text-sm">
                    Username
                  </label>
                </div>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  className="w-full px-3 py-2 border rounded-md  border-gray-700 bg-[#F2E3DB] text-black"
                  fdprocessedid="zp48ba"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label for="password" className="text-sm">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  className="w-full px-3 py-2 border rounded-md border-[#4D4D4D] bg-[#F2E3DB] text-black"
                  fdprocessedid="qaktod"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 font-semibold rounded-md bg-[#E86A33] text-white" >
                  Sign in
                </button>
              </div>
            </div>
            <p></p>
            <h1 className="text-center text-xs font-light">aplikasi kasir untuk menunjang perekonimian umkm kecil dengan fitur fitur yang mudah di gunakan</h1>
          </form>
        </div>
      </div>
<p className="-mt-8 text-center text-black text-opacity-40 font-semibold">Dibuat <span>oleh orin zahara 2023</span></p>

    </>
  );
}

export default Login;
