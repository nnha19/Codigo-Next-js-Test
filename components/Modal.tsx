import React from "react";
import Backdrop from "./Backdrop";

interface IProps {
  children: React.ReactNode;
  header: string;
  show?: boolean;
  handleModalClose?: () => void;
}

const Modal = ({ children, header, handleModalClose }: IProps) => {
  return (
    <>
      <Backdrop show onBackdropClick={handleModalClose} />
      <div
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          position: "fixed",
        }}
        className="w-96 h-[25rem] overflow-y-auto bg-gray-50 shadow-lg"
      >
        <div className="border-b border-gray-400 p-4  flex justify-between">
          <h4 className="font-bold">{header}</h4>
          <span onClick={handleModalClose}>X</span>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

export default Modal;
