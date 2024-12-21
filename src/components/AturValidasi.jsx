import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddUmatModal from "./Modal/AddUmatModal";
import axios from "axios";

const AturValidasi = () => {
  const navigate = useNavigate();
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [umat, setUmat] = useState([]);
  const { id, nama } = useParams();
  const getUmat = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/dataumat/klenteng/false/${id}`
      );
      setUmat(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const terimahDataUmat = async (idUmat) => {
    try {
      await axios.patch(`http://localhost:5000/dataumat/terimah/${idUmat}`);
      alert("Data telah diterima");
      getUmat(id);
    } catch (error) {
      console.log(error);
    }
  };

  const tolakDataUmat = async (idUmat) => {
    try {
      await axios.patch(`http://localhost:5000/dataumat/tolak/${idUmat}`);
      alert("Data telah ditolak");
      getUmat(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUmat(id);
  }, [id]);

  return (
    <div className="bg-white border border-gray-300 w-full rounded">
      {openModalAdd && (
        <AddUmatModal setIsOpenModalAdd={setOpenModalAdd} getUmat={getUmat} />
      )}
      <div className="p-4">
        <p className="text-xl font-bold text-gray-800">Data Umat {nama}</p>
      </div>

      <hr className="my-2 border-gray-300" />
      <div className="p-4">
        <div className="border-b border-gray-300 space-x-1 pb-3">
          <button className="btn-batal" onClick={() => navigate(-1)}>
            Kembali
          </button>
        </div>
      </div>

      {/* Tabel Data Umat */}
      <div className="px-4 py-2">
        <div className="overflow-x-auto mt-2">
          <table className="min-w-full bg-gray-100 border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-red-500 text-gray-100 uppercase text-sm leading-normal">
                <th className="py-3 px-6 whitespace-nowrap text-left">No</th>
                <th className="py-3 px-6 whitespace-nowrap text-left">No KK</th>
                <th className="py-3 px-6 whitespace-nowrap text-left">No KTP</th>
                <th className="py-3 px-6 whitespace-nowrap text-left">Nama Umat</th>
                <th className="py-3 px-6 whitespace-nowrap text-left">Jabatan</th>
                <th className="py-3 px-6 whitespace-nowrap text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {umat.map((item, index) => (
                <tr
                  className="border-b border-gray-300 hover:bg-gray-200"
                  key={item.id}
                >
                  <td className="py-3 px-6 whitespace-nowrap text-left">{index + 1}</td>
                  <td className="py-3 px-6 whitespace-nowrap text-left">{item?.no_kk}</td>
                  <td className="py-3 px-6 whitespace-nowrap text-left">{item?.no_ktp}</td>
                  <td className="py-3 px-6 whitespace-nowrap text-left">{item?.nama}</td>
                  <td className="py-3 px-6 whitespace-nowrap text-left">{item?.jabatan}</td>
                  <td className="py-3 px-6 whitespace-nowrap text-center">
                    <div className="flex gap-1 justify-center">
                      <button
                        className="delete"
                        onClick={() =>
                          navigate(`/validasi/${nama}/${id}/${item.id}`)
                        }
                      >
                        Lihat
                      </button>
                      <button
                        className="delete"
                        onClick={() => terimahDataUmat(item?.id)}
                      >
                        Terima
                      </button>
                      <button
                        className="delete"
                        onClick={() => tolakDataUmat(item?.id)}
                      >
                        Tolak
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AturValidasi;
