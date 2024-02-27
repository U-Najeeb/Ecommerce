import { useMutation } from "@tanstack/react-query";
import React, { MouseEventHandler } from "react";
import { useAxios } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HelpIcon from "@mui/icons-material/Help";
import SellIcon from "@mui/icons-material/Sell";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useUserContext } from "../../context/userContext";

type ModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: React.FC<ModalProps> = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserContext();
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget || e.target !== e.currentTarget) {
      setShowModal(false);
    }
  };

  const logoutFn = async () => {
    await useAxios.post("/auth/logout", {});
  };

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      setUserData(undefined);
      // if (location.pathname === "/") {
      //   window.location.reload();
      // } else {
      navigate("/");
      // }
    },
  });

  const handleLogout: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    logoutMutation();
  };

  const handleLogin: MouseEventHandler = (e) => {
    e.preventDefault();
    if (!userData) {
      return navigate("/login");
    }
  };
  const handleProfile: MouseEventHandler = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  const handleSellerClick: MouseEventHandler = (e) => {
    e.preventDefault();
    navigate("/sell-on-gocart");
  };
  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
          onClick={handleOutsideClick}
        >
          <div className="absolute bg-white rounded-lg shadow-md w-60 top-[5.6rem] right-52 ">
            <div className=" p-2">
              {userData && (
                <div
                  className="p-3 pt-4 transition-all ease-in duration-300 hover:bg-gray-500 hover:bg-opacity-20"
                  onClick={handleProfile}
                >
                  <button>
                    <AccountBoxIcon sx={{ mr: "0.5rem" }} /> Profile
                  </button>
                </div>
              )}
              <div className="p-3 transition-all ease-in duration-300 hover:bg-gray-500 hover:bg-opacity-20">
                <button>
                  <ContactMailIcon sx={{ mr: "0.5rem" }} /> Contact Us
                </button>
              </div>
              <div className="p-3 transition-all ease-in duration-300 hover:bg-gray-500 hover:bg-opacity-20">
                <button>
                  {" "}
                  <HelpIcon sx={{ mr: "0.5rem" }} /> Help & Support
                </button>
              </div>
              <div
                className="p-3 transition-all ease-in duration-300 hover:bg-gray-500 hover:bg-opacity-20"
                onClick={handleSellerClick}
              >
                <button>
                  <SellIcon sx={{ mr: "0.5rem" }} />
                  Become A Seller
                </button>
              </div>
              <div className="p-3 pb-4 transition-all ease-in duration-300 hover:bg-gray-500 hover:bg-opacity-20 cursor-pointer">
                {userData ? (
                  <button onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: "0.5rem" }} /> Logout
                  </button>
                ) : (
                  <button onClick={handleLogin}>
                    <LoginIcon sx={{ mr: "0.5rem" }} /> Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
