import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/authSlice";

const Login = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dasbor");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(loginUser({ Username, Password }));
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-b from-red-900 to-[#510000] flex justify-center  items-center">
      <section className="  px-0 sm:bg-transparent">
        <div className=" px-0 ">
          <div className="">
            <div className="">
              <form
                onSubmit={Auth}
                className="relative w-[350px] bg-white  sm:shadow-lg sm:rounded-lg px-5 py-10 sm:px-5 sm:py-10"
              >
                <div className=" justify-center mt-2 w-full">
                  <div className="">
                    <p className="text-black uppercase font-bold text-center text-xl">
                      Pendataan Umat Klenteng
                    </p>
                  </div>
                  <div className="flex w-full text-center justify-center relative mt-3">
                    <div className="absolute top-3 w-full">
                      <div className="flex border-t-2 border-gray-300 w-full h-[30px]"></div>
                    </div>

                    <p className="text-sm text-gray-500 z-30 bg-white px-3">
                      Masuk
                    </p>
                  </div>
                </div>

                <div className=" mt-4 w-full flex justify-center">
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md  w-full"
                    value={Username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mt-2 w-full flex justify-center">
                  <input
                    type="password"
                    className="p-2 border border-gray-300 rounded-md w-full"
                    value={Password}
                    placeholder="Kata Sandi"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className=" mt-4">
                  <button
                    type="submit"
                    className="w-full p-2 bg-[#7d0303] bg-opacity-80 text-white rounded hover:bg-[#700000]"
                  >
                    {isLoading ? "Loading..." : "Masuk"}
                  </button>
                </div>
                {isError && (
                  <div className="px-4 py-2 mt-3 text-red-600 bg-red-100 border border-red-300 rounded-md">
                    {message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Login;
