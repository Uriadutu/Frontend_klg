import React, { useEffect, useState } from "react";
import AddUserModal from "./Modal/AddUserModal";
import axios from "axios";
import { AnimatePresence } from "framer-motion";

const User = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [klenteng, setKlenteng] = useState([]);
  const [filteredKlenteng, setFilteredKlenteng] = useState([]); // State to store filtered klenteng data
  const [searchText, setSearchText] = useState(""); // State to store search text

  const getKlentengByNotNULL = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/klenteng/notnull`
      );
      setKlenteng(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKlentengByNotNULL();
  }, []);

  useEffect(() => {
    filterKlenteng(); // Filter klenteng when data or searchText changes
  }, [klenteng, searchText]);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Function to filter klenteng based on username
  const filterKlenteng = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filtered = klenteng.filter((item) =>
      item?.user?.username.toLowerCase().includes(lowerCaseSearchText)
    );
    setFilteredKlenteng(filtered);
  };

  const hapusData = async (id) => {
    try {
      if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        await axios.delete(`http://localhost:5000/user/${id}`);
        getKlentengByNotNULL();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white border border-gray-300 w-full rounded">
      <AnimatePresence>
        {openModalAdd && (
          <AddUserModal
            setIsOpenModalAdd={setOpenModalAdd}
            getUsers={getKlentengByNotNULL}
          />
        )}
      </AnimatePresence>
      <div className="p-4">
        <p className="judul">Data Pengguna</p>
      </div>
      <hr className="my-2 border-gray-300" />

      {/* Tombol tambah pengguna */}
      <div className="p-4">
        <div className="border-b border-gray-300">
          <button
            className="btn-add mb-3"
            onClick={() => setOpenModalAdd(true)}
          >
            Tambah Pengguna
          </button>
        </div>
        <div className="py-2">
          <div className="flex justify-end items-center gap-3">
            <p className="text-sm">Cari: </p>
            <input
              type="text"
              className="input"
              placeholder="username"
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
          <div className="overflow-x-auto mt-2">
            <table className="min-w-full bg-gray-100 border border-gray-200 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-red-500 text-gray-100 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">No</th>
                  <th className="py-3 px-6 text-left">Username</th>
                  <th className="py-3 px-6 text-left">Mengelolah</th>
                  <th className="py-3 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {filteredKlenteng.length > 0 ? (
                  filteredKlenteng.map((item, index) => (
                    <tr
                      className="border-b border-gray-300 hover:bg-gray-200"
                      key={index + 1}
                    >
                      <td className="py-3 px-6 text-left">{index + 1}</td>
                      <td className="py-3 px-6 text-left">
                        {item?.user?.username}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {item.nama_klenteng}
                      </td>
                      <td className="py-3 px-6 text-center space-x-1">
                        <button
                          className="delete"
                          onClick={() => hapusData(item.userId)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-3 px-6 text-center">
                      Tidak Ada Data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
