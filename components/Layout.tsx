import React from "react";

import Navbar from "./Navbar";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <div>
      <Navbar />
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Layout;
