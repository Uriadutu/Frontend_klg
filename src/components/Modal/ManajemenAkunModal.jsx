import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

const MenejemenAkunModal = ({ setIsOpenModalAdd }) => {
  const { user } = useSelector((state) => state.auth);
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [username, setUsername] = useState(user.username);
  const [msg, setMsg] = useState("");

  const editSandi = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await axios.patch(`http://localhost:5000/user/`, {
        username: username,
        password: pass,
        confPassword: confPass,
      });
      setIsOpenModalAdd(false);
    } catch (error) {
      if (error.response && error.response.data) {
        setMsg(
          error.response.data.msg || "Terjadi kesalahan, silakan coba lagi."
        );
      } else {
        setMsg("Terjadi kesalahan jaringan.");
      }
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 p-4 flex items-start justify-center bg-black bg-opacity-60 z-40"
      aria-hidden="true"
    >
      <form onSubmit={editSandi}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md bg-white rounded-lg shadow-lg flex flex-col"
        >
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold">Menejemen Akun</h3>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="w-8 h-8 flex items-center justify-center text-gray-400 rounded-lg hover:bg-gray-200 hover:text-gray-900"
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div className="mb-6">
              <div className="mb-4 grid items-center grid-cols-2 gap-4">
                <label className="block font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label className="block font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />

                <label className="block font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  value={confPass}
                  onChange={(e) => setConfPass(e.target.value)}
                />
              </div>
            </div>
          </div>
          {msg && (
            <div className="px-4 py-2 text-red-400 bg-red-900 border border-red-800 rounded-md">
              {msg}
            </div>
          )}
          <div className="flex items-center justify-end p-4 space-x-3 border-t rounded-b">
            <button type="submit" className="btn-add">
              Simpan
            </button>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="btn-batal"
            >
              Batal
            </button>
          </div>
        </motion.div>
      </form>
    </div>,
    document.getElementById("root")
  );
};

export default MenejemenAkunModal;
