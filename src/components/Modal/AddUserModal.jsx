import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AddUserModal = ({ setIsOpenModalAdd, getUsers }) => {
  const [klentengSelect, setKlentengSelect] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "Admin",
    klentengId: "",
  });
  const [klenteng, setKlenteng] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKlentengChange = (e) => {
    const selectedId = e.target.value;
    setKlentengSelect(selectedId);
    setFormData({ ...formData, klentengId: selectedId });
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/user", formData);
      setIsOpenModalAdd(false);
      getUsers(); // Refresh the list of users
    } catch (error) {
      console.log(error);
    }
  };

  const getKlenteng = async () => {
    try {
      const response = await axios.get("http://localhost:5000/klenteng/null");
      setKlenteng(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKlenteng();
  }, []);

  return (
    <div
      className="fixed inset-0 p-4 flex items-start justify-center bg-black bg-opacity-60 z-40"
      aria-hidden="true"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-lg shadow-lg flex flex-col"
      >
        <form onSubmit={saveUser} className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-xl font-semibold text-gray-900">Tambah User</h3>
            <button
              onClick={() => setIsOpenModalAdd(false)}
              type="button"
              className="w-8 h-8 flex items-center justify-center text-gray-400 rounded-lg hover:bg-gray-200 hover:text-gray-900"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
                aria-hidden="true"
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
          <div className="p-4 space-y-4 overflow-y-auto flex-1">
            {[
              { label: "Username", name: "username", type: "text" },
              { label: "Password", name: "password", type: "password" },
              {
                label: "Confirm Password",
                name: "confirmPassword",
                type: "password",
              },
            ].map((field, index) => (
              <div className="grid grid-cols-2 gap-5" key={index}>
                <label className="block font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-5">
              <label className="block font-medium text-gray-700">
                Nama Rumah Ibadah
              </label>
              <select
                value={klentengSelect}
                onChange={handleKlentengChange}
                name="klentengId"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Pilih Rumah Ibadah</option>
                {klenteng.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.nama_klenteng}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end p-4 border-t space-x-3">
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
        </form>
      </motion.div>
    </div>
  );
};

export default AddUserModal;
