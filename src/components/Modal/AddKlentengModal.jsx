import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AddKlentengModal = ({ setIsOpenModalAdd, getUmat }) => {
  const [nama_klenteng, setNamaKlenteng] = useState("");

  const saveKlenteng = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/klenteng", { nama_klenteng });
      setIsOpenModalAdd(false);
      getUmat();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 px-2 flex items-start p-4 justify-center bg-black z-40 bg-opacity-60"
    >
      <form onSubmit={saveKlenteng}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg bg-white rounded-lg shadow-lg"
        >
          <div className="flex items-start justify-between p-4 border-b border-gray-400 rounded-t">
            <h3 className="text-xl font-semibold text-gray-700">Tambah Rumah Ibadah</h3>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-700 hover:text-gray-100 ms-auto"
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
          <div className="p-4 space-y-4 text-gray-300">
            <div className="mb-6">
              <div className="grid items-center grid-cols-2 gap-4">
                <label className="block  font-medium text-gray-700">
                  Nama Rumah Ibadah
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-400 bg-white text-gray-700 rounded-lg focus:outline-none"
                    // value={nama_klenteng}
                    onChange={(e) => setNamaKlenteng(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-400 rounded-b">
            <button
              type="submit"
              className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 border border-gray-400 transition duration-300"
            >
              Simpan
            </button>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="px-3 py-2 bg-gray-300 border border-gray-600 text-gray-700 text-sm rounded-md hover:bg-gray-400 transition duration-300"
            >
              Batal
            </button>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default AddKlentengModal;
