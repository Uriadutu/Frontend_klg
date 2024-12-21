import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddUmatModal from "./Modal/AddUmatModal";
import axios from "axios";

const Validasi = () => {
  const navigate = useNavigate();
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [klenteng, setKlenteng] = useState([]);
  const [umatCounts, setUmatCounts] = useState({});

  const getKlenteng = async () => {
    try {
      const response = await axios.get("http://localhost:5000/klenteng/true");
      const klentengData = response.data;
      setKlenteng(klentengData);

      // Ambil jumlah umat secara paralel
      const umatPromises = klentengData.map((klentengItem) =>
        axios
          .get(
            `http://localhost:5000/klenteng/false/${klentengItem.id}/umat-count`
          )
          .then((res) => ({ id: klentengItem.id, count: res.data }))
      );

      const umatCountsData = await Promise.all(umatPromises);

      // Buat object umatCounts dari hasil request
      const counts = umatCountsData.reduce(
        (acc, curr) => ({ ...acc, [curr.id]: curr.count }),
        {}
      );
      setUmatCounts(counts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKlenteng();
  }, []);

  const filteredKlenteng = klenteng.filter(
    (item) => umatCounts[item.id] > 0
  );

  return (
    <div className="bg-white border border-gray-300 w-full rounded">
      {openModalAdd && <AddUmatModal setIsOpenModalAdd={setOpenModalAdd} />}
      <div className="p-4">
        <p className="judul">Validasi Data</p>
      </div>
      <hr className="my-2 border-gray-300" />

      {/* Tombol tambah pengguna */}
      <div className="p-4">
        <p className="sub-judul">Data Belum Tervalidasi</p>
        <div className="overflow-x-auto">
          <table className="bg-gray-100 border border-gray-200 rounded-lg shadow-lg w-full">
            <thead>
              <tr className="bg-red-500 text-gray-100 uppercase text-sm leading-normal">
                <th className="py-4 px-6 text-sm text-left whitespace-nowrap">
                  No
                </th>
                <th className="py-4 px-6 text-sm text-left sm:w-auto w-96 p-10 whitespace-nowrap">
                  Nama Rumah Ibadah
                </th>
                <th className="py-4 px-6 text-sm text-left whitespace-nowrap">
                  Pengelolah
                </th>
                <th className="py-4 px-6 text-sm text-center whitespace-nowrap">
                  Jumlah Data
                </th>
                <th className="py-4 px-6 text-sm text-center whitespace-nowrap">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-600 text-sm font-light">
              {filteredKlenteng.length > 0 ? (
                filteredKlenteng.map((item, index) => (
                  <tr
                    className="border-b border-gray-300 hover:bg-gray-200"
                    key={item.id}
                  >
                    <td className="py-4 px-6 text-sm text-left">{index + 1}</td>
                    <td className="py-4 px-6 text-sm text-left">
                      {item.nama_klenteng}
                    </td>
                    <td className="py-4 px-6 text-sm text-left">
                      {item?.user?.username}
                    </td>
                    <td className="py-4 px-6 text-sm text-center">
                      <span className="bg-red-500 rounded-full px-2 py-1 border-white border font-bold text-white">
                        {umatCounts[item.id] || 0}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-center space-x-1">
                      <button
                        className="delete"
                        onClick={() =>
                          navigate(`/validasi/${item.nama_klenteng}/${item.id}`)
                        }
                      >
                        Lihat
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 px-6 text-sm text-center">
                    Tidak Ada Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Validasi;
