import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddUmatModal from "./Modal/AddUmatModal";
import axios from "axios";
import { useSelector } from "react-redux";
import EditUmatModal from "./Modal/EditUmatModal";
import { AnimatePresence } from "framer-motion";

const DataUmat = () => {
  const navigate = useNavigate();
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [umat, setUmat] = useState([]);
  const [filteredUmat, setFilteredUmat] = useState([]); // State to store filtered umat data
  const [searchText, setSearchText] = useState(""); // State to store search text
  const { klentengId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [items, setItem] = useState([])
  
  const getUmat = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/dataumat/klenteng/true/${id}`
      );
      setUmat(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUmat(klentengId);
  }, [klentengId]);

  useEffect(() => {
    filterUmat(); // Filter umat when data or searchText changes
  }, [umat, searchText]);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClickEdit = (item) => {
    setOpenModalEdit(true);
    setItem(item);
  }


  // Function to filter umat based on no_ktp and nama
  const filterUmat = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filtered = umat.filter(
      (item) =>
        item.no_ktp.toLowerCase().includes(lowerCaseSearchText) ||
        item.nama.toLowerCase().includes(lowerCaseSearchText)
    );
    setFilteredUmat(filtered);
  };

  const hapusData = async (id) => {
    try {
      if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        await axios.delete(`http://localhost:5000/dataumat/${id}`);
        getUmat(klentengId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white border border-gray-300 w-full rounded">
      <AnimatePresence>

      {openModalAdd && (
        <AddUmatModal setIsOpenModalAdd={setOpenModalAdd} getUmat={getUmat} />
      )}
      {openModalEdit && (
        <EditUmatModal getUmat={getUmat} setOpenModalEdit={setOpenModalEdit} item={items}/>
      )}
      </AnimatePresence>
      <div className="p-4">
        <p className="judul">Data Umat</p>
      </div>
      <hr className="my-2 border-gray-300" />

      <div className=" p-4">
        <div className="border-b border-gray-300 space-x-1 pb-3">
          {user?.role === "SuperAdmin" && (
            <button className="btn-batal" onClick={() => navigate(-1)}>
              Kembali
            </button>
          )}
          {user?.role === "Admin" && (
            <button className="btn-add" onClick={() => setOpenModalAdd(true)}>
              Tambah Umat
            </button>
          )}
        </div>
        <div className="py-2 ">
          <div className="flex justify-end items-center gap-3">
            <p className="text-sm">Cari: </p>
            <input
              type="text"
              className="input"
              placeholder="Nama / No.KTP"
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
          <div className="overflow-x-auto mt-2">
            <table className=" min-w-full bg-gray-100 border px-3 border-gray-200 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-red-500 text-gray-100 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 whitespace-nowrap text-left">No</th>
                  <th className="py-3 px-6 whitespace-nowrap text-left">
                    No KK
                  </th>
                  <th className="py-3 px-6 whitespace-nowrap text-left">
                    No KTP
                  </th>
                  <th className="py-3 px-6 whitespace-nowrap text-left">
                    Nama Umat
                  </th>
                  <th className="py-3 px-6 whitespace-nowrap text-left">
                    Jabatan
                  </th>
                  <th className="py-3 px-6 whitespace-nowrap text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {filteredUmat.length > 0 ? (
                  filteredUmat.map((item, index) => (
                    <tr
                      className="border-b border-gray-300 hover:bg-gray-200"
                      key={item.id}
                    >
                      <td className="py-3 px-6 whitespace-nowrap text-left">
                        {index + 1}
                      </td>
                      <td className="py-3 px-6 whitespace-nowrap text-left">
                        {item?.no_kk}
                      </td>
                      <td className="py-3 px-6 whitespace-nowrap text-left">
                        {item?.no_ktp}
                      </td>
                      <td className="py-3 px-6 whitespace-nowrap text-left">
                        {item?.nama}
                      </td>
                      <td className="py-3 px-6 whitespace-nowrap text-left">
                        {item?.jabatan}
                      </td>
                      <td className="py-3 px-6 whitespace-nowrap text-center space-x-1 flex">
                        <button
                          className="delete"
                          onClick={() =>
                            navigate(
                              `/data-klenteng/data-umat/${klentengId}/${item.id}`
                            )
                          }
                        >
                          Lihat
                        </button>
                        <button
                          className="delete"
                          onClick={() => handleClickEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete"
                          onClick={() => hapusData(item.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-3 px-6 whitespace-nowrap text-center"
                    >
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

export default DataUmat;
