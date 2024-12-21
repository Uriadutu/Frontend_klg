import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddUmatModal from "../Modal/AddUmatModal";
import axios from "axios";
import { useSelector } from "react-redux";

const DataValidasi = () => {
  const navigate = useNavigate();
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [umat, setUmat] = useState([]);
  const { klentengId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const id = user?.id;
  const [klenteng, setKlenteng] = useState(null);

  const getKlenteng = async (iduser) => {
    try {
      const response = await axios.get(`http://localhost:5000/klenteng/user/${iduser}`);
      setKlenteng(response.data);
    } catch (error) {
      console.error("Error fetching klenteng:", error);
    }
  };

  const getUmat = async (id) => {
    if (!id) return; // Mencegah error jika id belum tersedia
    try {
      const response = await axios.get(`http://localhost:5000/dataumat/klenteng/false/${id}`);
      setUmat(response.data);
    } catch (error) {
      console.error("Error fetching umat:", error);
    }
  };

  const hapusData = async(idData) => {
    try {
        await axios.delete(`http://localhost:5000/dataumat/${idData}`);
        getKlenteng(klenteng?.id)
        getUmat(id)
    } catch (error) {
        
    }
  }

  useEffect(() => {
    getKlenteng(id);
  }, [id]);

  useEffect(() => {
    if (klenteng?.id) {
      getUmat(klenteng.id);
    }
  }, [klenteng]);

  return (
    <div className="bg-white border border-gray-300 w-full rounded">
      {openModalAdd && <AddUmatModal setIsOpenModalAdd={setOpenModalAdd} />}
      <div className="p-4">
        <p className="judul">Validasi Data</p>
      </div>
      <hr className="my-2 border-gray-300" />

      {/* Data Tabel */}
      <div className="p-4">
        <p className="sub-judul">Data Belum Tervalidasi</p>
        <div className="overflow-x-auto mt-2">
          <table className="min-w-full bg-gray-100 border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-red-500 text-gray-100 uppercase text-sm leading-normal">
                <th className="py-3 px-6  whitespace-nowrap text-left">No</th>
                <th className="py-3 px-6  whitespace-nowrap text-left">No KK</th>
                <th className="py-3 px-6  whitespace-nowrap text-left">No KTP</th>
                <th className="py-3 px-6  whitespace-nowrap text-left">Nama Umat</th>
                <th className="py-3 px-6  whitespace-nowrap text-left">Status</th>
                <th className="py-3 px-6  whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {umat && umat.length > 0 ? (
                umat.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-300 hover:bg-gray-200"
                  >
                    <td className="py-3 px-6  whitespace-nowrap text-left">{index + 1}</td>
                    <td className="py-3 px-6  whitespace-nowrap text-left">{item.no_kk}</td>
                    <td className="py-3 px-6  whitespace-nowrap text-left">{item.no_ktp}</td>
                    <td className="py-3 px-6  whitespace-nowrap text-left">{item.nama}</td>
                    <td className="py-3 px-6  whitespace-nowrap text-left">
                      {item.validate === 1 ? "Tervalidasi" : "Menunggu Validasi"}
                    </td>
                    <td className="py-3 px-6  whitespace-nowrap text-center space-x-1">
                      <button
                        className="delete"
                        onClick={() =>
                          navigate(`/data-klenteng/data-umat/${klentengId}/${item.id}`)
                        }
                      >
                        Lihat
                      </button>
                      <button className="delete" onClick={()=> hapusData(item.id)}>Batal</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-3 px-6  whitespace-nowrap text-center hover:bg-gray-200"
                  >
                    Belum Ada Data
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

export default DataValidasi;
