import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Dasbor = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const id = user?.id;
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!user) {
      dispatch(getMe());
    }
  }, [dispatch, user]);

  return (
    <div>
      <p className="judul">Dasbor </p>
      {user?.role === "Admin" && (
        <p>
          Selamat Datang, <span className="uppercase">{user?.username}</span>.
          Anda Sebagai Pengelolah Klenteng {klenteng?.nama_klenteng}
        </p>
      )}
    </div>
  );
};

export default Dasbor;
