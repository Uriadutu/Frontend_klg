import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TanggalFormat } from "../utils/helper";

const DetailAturValidasi = () => {
  const { idumat } = useParams();
  const navigate = useNavigate();
  const [dataUmat, setDataUmat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getUmat = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/dataumat/${id}`);
      setDataUmat(response.data);
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const terimahDataUmat = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/dataumat/terimah/${id}`);
      alert("Data telah diterima");
      navigate(-1);
      getUmat(idumat);
    } catch (error) {
      console.log(error);
    }
  };

  const tolakDataUmat = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/dataumat/tolak/${id}`);
      alert("Data telah ditolak");
      navigate(-1);
      getUmat(idumat);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUmat(idumat);
  }, [idumat]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className=" w-full bg-white shadow-xl rounded-lg border border-gray-300">
      <div className="p-4">
        <p className="judul">Data Umat </p>
      </div>

      <hr className="my-2 border-gray-300" />
      <div className="p-4">
        <div className=" border-b border-gray-300 space-x-1 pb-3">
          <button className="btn-batal" onClick={() => navigate(-1)}>
            Kembali
          </button>
          <button className="btn-batal" onClick={() => terimahDataUmat(idumat)}>
            Terimah
          </button>
          <button className="btn-batal" onClick={() => tolakDataUmat(idumat)}>
            Tolak
          </button>
        </div>
      </div>

      {/* Tombol tambah pengguna */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 p-4">
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700">
            Informasi Pribadi
          </h2>
          <div className="mt-4">
            <div className="text-sm text-gray-500">
              <span className="font-medium">No. KK: </span>
              {dataUmat.no_kk}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">No. KTP: </span>
              {dataUmat.no_ktp}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Nama: </span>
              {dataUmat.nama}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Alamat: </span>
              {dataUmat.alamat}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Status: </span>
              {dataUmat.status}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Tanggal Lahir: </span>
              {dataUmat.tgl_lahir
                ? TanggalFormat(new Date(dataUmat.tgl_lahir))
                : "-"}
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg shadow-sm p-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Pekerjaan dan Kontak
          </h2>
          <div className="mt-4">
            <div className="text-sm text-gray-500">
              <span className="font-medium">Pekerjaan: </span>
              {dataUmat.pekerjaan}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">No. HP: </span>
              {dataUmat.no_hp}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Jabatan: </span>
              {dataUmat.jabatan}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700">
            Informasi Klenteng
          </h2>
          <div className="mt-4">
            <div className="text-sm text-gray-500">
              <span className="font-medium">Nama Rumah Ibadah: </span>
              {dataUmat.klenteng.nama_klenteng}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Pengelola: </span>
              {dataUmat.user.username}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center p-4">
        <div>
          <span className="font-medium">Validasi: </span>
          <span
            className={`px-2 py-1 text-sm rounded-full ${
              dataUmat.validate
                ? "bg-green-200 text-green-700"
                : "bg-red-200 text-red-700"
            }`}
          >
            {dataUmat.validate ? "Tervalidasi" : "Belum Tervalidasi"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailAturValidasi;
