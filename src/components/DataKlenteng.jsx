import React, { useEffect, useState } from "react";
import AddKlentengModal from "./Modal/AddKlentengModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const DataKlenteng = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [klenteng, setKlenteng] = useState([]);
  const [umatCounts, setUmatCounts] = useState({}); // Menyimpan jumlah umat berdasarkan id klenteng
  const [searchText, setSearchText] = useState(""); // Menyimpan teks pencarian
  const [filteredKlenteng, setFilteredKlenteng] = useState([]); // Menyimpan klenteng yang sudah difilter

  const navigate = useNavigate();

  // Mendapatkan data klenteng
  const getKlenteng = async () => {
    try {
      const response = await axios.get("http://localhost:5000/klenteng");
      setKlenteng(response.data);

      // Mengambil jumlah umat untuk setiap klenteng
      response.data.forEach(async (klentengItem) => {
        const umatResponse = await axios.get(
          `http://localhost:5000/klenteng/true/${klentengItem.id}/umat-count`
        );

        // Update state umatCounts berdasarkan id klenteng
        setUmatCounts((prevCounts) => ({
          ...prevCounts,
          [klentengItem.id]: umatResponse.data, // Menyimpan jumlah umat berdasarkan id klenteng
        }));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKlenteng();
  }, []);

  useEffect(() => {
    filterKlenteng(); // Filter klenteng setiap kali data atau searchText berubah
  }, [klenteng, searchText]);

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Fungsi untuk memfilter data klenteng berdasarkan searchText
  const filterKlenteng = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filtered = klenteng.filter(
      (klenteng) =>
        klenteng.nama_klenteng.toLowerCase().includes(lowerCaseSearchText)
    );
    setFilteredKlenteng(filtered);
  };

  const hapusData = async (id) => {

    try {
      if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){

        await axios.delete(`http://localhost:5000/klenteng/${id}`);
        getKlenteng();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white border border-gray-300 w-full rounded">
      <AnimatePresence>

      {openModalAdd && <AddKlentengModal setIsOpenModalAdd={setOpenModalAdd} getUmat={getKlenteng} />}
      </AnimatePresence>
      <div className="p-4">
        <p className="judul">Data Rumah Ibadah</p>
      </div>
      <hr className="my-2 border-gray-300" />

      {/* Tombol tambah pengguna */}
      <div className="p-4">
        <div className="border-b border-gray-300">
          <button className="btn-add mb-3" onClick={() => setOpenModalAdd(true)}>
            Tambah Data
          </button>
        </div>
        <div className="py-2">
          <div className="flex justify-end items-center gap-3">
            <p className="text-sm">Cari: </p>
            <input
              type="text"
              placeholder="Rumah Ibadah"
              className="input"
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
          <div className="overflow-x-auto mt-2">
            <table className="min-w-full bg-gray-100 border border-gray-200 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-red-500 text-gray-100 uppercase text-sm leading-normal">
                  <th className="py-3 px-6  whitespace-nowrap text-left">No</th>
                  <th className="py-3 px-6  whitespace-nowrap text-left">Nama Rumah Ibadah</th>
                  <th className="py-3 px-6  whitespace-nowrap text-center">Jumlah Umat</th>
                  <th className="py-3 px-6  whitespace-nowrap text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {filteredKlenteng.length > 0 ? filteredKlenteng.map((item, index) => (
                  <tr className="border-b border-gray-300 hover:bg-gray-200" key={item.id}>
                    <td className="py-3 px-6  whitespace-nowrap text-left">{index + 1}</td>
                    <td className="py-3 px-6  whitespace-nowrap text-left">{item?.nama_klenteng}</td>
                    <td className="py-3 px-6  whitespace-nowrap text-center">{umatCounts[item.id] || 0}</td> {/* Menampilkan jumlah umat */}
                    <td className="py-3 px-6  whitespace-nowrap text-center space-x-1 flex justify-center">
                      <button
                        className="delete"
                        onClick={() => navigate(`data-umat/${item?.id}`)}
                      >
                        Lihat
                      </button>
                      <button className="delete" onClick={() => hapusData(item?.id)}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                )): (
                  <td colSpan={6} className="py-3 px-6  whitespace-nowrap text-center ">
                    Data Tidak Ada Rumah Ibadah
                  </td>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataKlenteng;
