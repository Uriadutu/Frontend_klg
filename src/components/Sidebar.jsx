import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOut, IoPerson } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset, getMe } from "../features/authSlice";
import { MdDashboard } from "react-icons/md";
import { FaDatabase } from "react-icons/fa6";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import MenejemenAkunModal from "./Modal/ManajemenAkunModal";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [panjang, setPanjang] = useState(0);
  const id = user?.id;

  const [klenteng, setKlenteng] = useState([]);
  const getKlenteng = async (iduser) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/klenteng/user/${iduser}`
      );
      setKlenteng(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getKlenteng(id);
  }, [id]);

  const getPanjangUmatFalse = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/dataumat/validate/false"
      );
      setPanjang(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPanjangUmatFalse();
  }, []);

  // Memanggil getMe untuk mengambil data pengguna
  useEffect(() => {
    if (!user) {
      dispatch(getMe());
    }
  }, [dispatch, user]);

  // Logout handler
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  const [openAkun, setOpenAkun] = useState(false);

  const handleManajemen = () => {
    setOpenAkun(true);
  };

  // Cek user dan tampilkan loading jika sedang proses pengambilan data
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hidden sm:block fixed z-40 bg-gradient-to-bl from-red-900 to-[#870000] text-white w-64 px-6 h-[100vh] drop-shadow-lg ">
       <AnimatePresence>
        {openAkun && <MenejemenAkunModal setIsOpenModalAdd={setOpenAkun} />}
      </AnimatePresence>
      <div className="w-full">
        <div className="flex py-3 w-full border-b border-white">
          <Link to="/dasbor" className="space-y-1">
            <h1 className="text-xl font-bold uppercase">{user?.username}</h1>
            <h1 className="font-semibold">{user?.role}</h1>
          </Link>
        </div>
        <div className="mt-3 grid gap-y-3 text-xl">
          <Link
            to="/dasbor"
            className="rounded-md flex items-center text-sm w-full text-left"
          >
            <MdDashboard color="" size={15} className="mr-4" />
            Dasbor
          </Link>
          {user?.role === "SuperAdmin" && (
            <Link
              to="/data-klenteng"
              className="rounded-md flex items-center text-sm w-full text-left"
            >
              <FaDatabase color="" size={15} className="mr-4" />
              Data Rumah Ibadah
            </Link>
          )}
          {user?.role === "SuperAdmin" && (
            <Link
              to="/user"
              className="rounded-md flex items-center text-sm w-full text-left"
            >
              <IoPerson color="" size={15} className="mr-4" />
              Data Pengguna
            </Link>
          )}
          {user?.role === "SuperAdmin" && (
            <Link
              to="/validasi"
              className="rounded-md relative flex items-center text-sm w-full text-left"
            >
              <RiVerifiedBadgeFill color="" size={15} className="mr-4" />
              Validasi Data{" "}
              {panjang > 0 ? (
                <span className="bg-red-500 absolute right-0 rounded-full text-[10px]  px-[6px] top-[-10px] border-white border font-bold text-white">
                  {panjang > 9 ? "9+" : panjang}
                </span>
              ) : null}
            </Link>
          )}
          {user?.role === "Admin" && (
            <Link
              to={`/data-klenteng/data-umat/${klenteng?.id}`}
              className="rounded-md relative flex items-center text-sm w-full text-left"
            >
              <IoPerson color="" size={15} className="mr-4" />
              Data Umat
            </Link>
          )}
          {user?.role === "Admin" && (
            <Link
              to={"/data-validasi"}
              className="rounded-md relative flex items-center text-sm w-full text-left"
            >
              <RiVerifiedBadgeFill color="" size={15} className="mr-4" />
              Data Validasi
            </Link>
          )}
          <button
            onClick={handleManajemen}
            className="rounded-md text-white flex items-center text-sm w-full text-left"
          >
            <IoPerson color="white" size={15} className="mr-4" />
            Edit Akun
          </button>
          <button
            onClick={logout}
            className="rounded-md flex items-center text-sm w-full text-left"
          >
            <IoLogOut color="" size={15} className="mr-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
