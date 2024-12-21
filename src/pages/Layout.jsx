import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
          <div className="fixed z-10">
            <Navbar />
          </div>
            <Sidebar />
      <div
        className="p-0 flex bg-gradient-to-b "
        style={{ height: "100vh" }}
      >
        <div className=" w-full">
          <main className=" pt-20 sm:pt-5 bg-gray-100 h-[100vh]">
            <div className="pl-2 pr-2 sm:pl-72 flex sm:pr-8">{children}</div>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
