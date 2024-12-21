import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOut, IoPerson } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { FaDatabase } from "react-icons/fa6";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { LogOut, reset } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import MenejemenAkunModal from "./Modal/ManajemenAkunModal";


const Navbar = () => {
  const [openSidebar, setOpenSideBar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const id = user?.id;

  const [openAkun, setOpenAkun] = useState(false);

  const handleManajemen = () => {
    setOpenAkun(true);
  };

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

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full">
       <AnimatePresence>
        {openAkun && <MenejemenAkunModal setIsOpenModalAdd={setOpenAkun} />}
      </AnimatePresence>
      <div className="">
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={`fixed inset-0 flex items-center justify-start z-40 bg-black bg-opacity-60 transition-opacity duration-500 ${
            openSidebar ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`absolute z-40 bg-gray-100 w-64 h-[100vh] drop-shadow-lg transform transition-transform duration-500 ${
              openSidebar ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="w-full">
              <div className="w-full relative">
                <button
                  onClick={() => setOpenSideBar(false)}
                  className="absolute top-1 right-2"
                >
                  <IoIosClose color="black" size={30} className="" />
                </button>
                <div className="w-full border-b border-gray-400 ">
                  <Link
                    to="/dasbor"
                    className="text-gray-900 rounded-md justify-center items-center w-full pt-4"
                  >
                    <div className="p-3">
                      <h1 className="text-xl font-bold uppercase">
                        {user?.username}
                      </h1>
                      <h1 className="font-semibold">{user?.role}</h1>
                    </div>
                  </Link>
                </div>
              </div>
              <div className=" grid gap-y-3 px-3">
                <Link
                  to="/dasbor"
                  className="rounded-md text-gray-900 flex items-center text-sm w-full text-left"
                >
                  <MdDashboard color="black" size={15} className="mr-4" />
                  Dasbor
                </Link>
                {user?.role === "SuperAdmin" && (
                  <>
                    <Link
                      to="/data-klenteng"
                      className="rounded-md text-gray-900 flex items-center text-sm w-full text-left"
                    >
                      <FaDatabase color="black" size={15} className="mr-4" />
                      Data Rumah Ibadah
                    </Link>
                    <Link
                      to="/user"
                      className="rounded-md text-gray-900 flex items-center text-sm w-full text-left"
                    >
                      <IoPerson color="black" size={15} className="mr-4" />
                      Data Pengguna
                    </Link>
                    <Link
                      to="/validasi"
                      className="rounded-md text-gray-900 flex items-center text-sm w-full text-left"
                    >
                      <RiVerifiedBadgeFill
                        color="black"
                        size={15}
                        className="mr-4"
                      />
                      Validasi Data
                    </Link>
                  </>
                )}
                {user?.role === "Admin" && (
                  <>
                    <Link
                      to={`/data-klenteng/data-umat/${klenteng?.id}`}
                      className="rounded-md text-gray-900 flex items-center text-sm w-full text-left"
                    >
                      <IoPerson color="black" size={15} className="mr-4" />
                      Data Umat
                    </Link>
                    <Link
                      to="/data-validasi"
                      className="rounded-md text-gray-900 flex items-center text-sm w-full text-left"
                    >
                      <RiVerifiedBadgeFill
                        color="black"
                        size={15}
                        className="mr-4"
                      />
                      Data Validasi
                    </Link>
                  </>
                )}
                <button
                  onClick={handleManajemen}
                  className="rounded-md text-gray-900 flex items-center text-sm w-full text-left"
                >
                  <IoPerson color="black" size={15} className="mr-4" />
                  Edit Akun
                </button>
                <button
                  onClick={logout}
                  className="rounded-md text-gray-900 flex items-center text-sm w-full text-left"
                >
                  <IoLogOut color="black" size={15} className="mr-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        <div className="sm:hidden block bg-red-900 w-full flex m-0 py-4 z-10 justify-between items-center fixed">
          <div className="flex pl-5 justify-between w-full items-center">
            <button onClick={() => setOpenSideBar(true)} className="">
              <GiHamburgerMenu color="white" size={20} />
            </button>
            <div className="text-black mx-8 flex justify-end"></div>
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
