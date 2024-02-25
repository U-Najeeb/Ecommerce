import { useMutation } from "@tanstack/react-query";
import React, { MouseEventHandler } from "react";
import { useAxios } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: React.FC<ModalProps> = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  const logoutFn = async () => {
    await useAxios.post("/auth/logout", {});
  };

  const { mutate: logoutMutation } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutFn,
  });

  const handleLogout: MouseEventHandler = (e) => {
    e.preventDefault();
    logoutMutation();
    navigate("/login");
  };

  const handleProfile: MouseEventHandler = (e) => {
    e.preventDefault();
    navigate("/profile");
  };
  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
          onClick={handleOutsideClick}
        >
          <div className="absolute bg-white rounded-lg shadow-md w-60 top-[5.6rem] right-52 ">
            <div>
              <div
                className="p-3 pt-4 transition-all ease-in duration-300 hover:bg-gray-500 hover:bg-opacity-20"
                onClick={handleProfile}
              >
                <button>Profile</button>
              </div>
              <div className="p-3 transition-all ease-in duration-300 hover:bg-gray-500 hover:bg-opacity-20">
                <button>Contact Us</button>
              </div>
              <div className="p-3 transition-all ease-in duration-300 hover:bg-gray-500 hover:bg-opacity-20">
                <button>Help & Support</button>
              </div>
              <div className="p-3 transition-all ease-in duration-300 hover:bg-gray-500 hover:bg-opacity-20">
                <button>Be A Seller</button>
              </div>
              <div
                className="p-3 pb-4 transition-all ease-in duration-300 hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer"
                onClick={handleLogout}
              >
                <button>Logout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
