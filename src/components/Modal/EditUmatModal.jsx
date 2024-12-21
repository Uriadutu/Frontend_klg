import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const EditUmatModal = ({ setOpenModalEdit, getUmat, item }) => {
  const { klentengId } = useParams();
  
  const [formData, setFormData] = useState({
    no_kk: item.no_kk,
    no_ktp: item.no_ktp,
    nama: item.nama,
    alamat: item.alamat,
    status: item.status,
    tgl_lahir: item.tgl_lahir,
    pekerjaan: item.pekerjaan,
    no_hp: item.no_hp,
    jabatan: item.jabatan,
    customJabatan: item.customJabatan,
    klentengId: item.klentengId,
  });
  const [msg, setMsg] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveUmat = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        jabatan:
          formData.jabatan === "Lainnya"
            ? formData.customJabatan
            : formData.jabatan,
      };
      await axios.patch(`http://localhost:5000/dataumat/${item.id}`, dataToSend);
      alert("Data Diupdate");
      setOpenModalEdit(false);
      getUmat(klentengId);
    } catch (error) {
      setMsg(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex p-3 items-start justify-center bg-black bg-opacity-60 z-40"
      aria-hidden="true"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg bg-white rounded-lg shadow-lg h-[60%] flex flex-col"
      >
        <form onSubmit={saveUmat} className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-xl font-semibold text-gray-900">
              Tambah Data Umat
            </h3>
            <button
              onClick={() => setOpenModalEdit(false)}
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
              { label: "No KK", name: "no_kk", type: "text" },
              { label: "No KTP", name: "no_ktp", type: "text" },
              { label: "Nama", name: "nama", type: "text" },
              { label: "Alamat", name: "alamat", type: "text" },
              { label: "Tanggal Lahir", name: "tgl_lahir", type: "date" },
              { label: "Pekerjaan", name: "pekerjaan", type: "text" },
              { label: "No HP", name: "no_hp", type: "text" },
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
              <label className="block font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Pilih Status</option>
                <option value="Masih Hidup">Masih Hidup</option>
                <option value="Sudah Meninggal">Sudah Meninggal</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <label className="block font-medium text-gray-700">Jabatan</label>
              <select
                name="jabatan"
                value={formData.jabatan}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Pilih Jabatan</option>
                <option value="Umat">Umat</option>
                <option value="Rohaniawan">Rohaniawan</option>
                <option value="Ketua BP">Ketua BP</option>
                <option value="Sekretaris">Sekretaris</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            {formData.jabatan === "Lainnya" && (
              <div className="grid grid-cols-2 gap-5">
                <label className="block font-medium text-gray-700">
                  Jabatan Lainnya
                </label>
                <input
                  type="text"
                  name="customJabatan"
                  value={formData.customJabatan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between p-4 border-t space-x-3">
            <p>{msg}</p>
            <div className="flex gap-3">
              <button type="submit" className="btn-add">
                Simpan
              </button>
              <button
                onClick={() => setOpenModalEdit(false)}
                type="button"
                className="btn-batal"
              >
                Batal
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditUmatModal;
