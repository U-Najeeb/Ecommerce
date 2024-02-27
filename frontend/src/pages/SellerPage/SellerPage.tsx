import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoRoundedIcon from "@mui/icons-material/LooksTwoRounded";
import Looks3RoundedIcon from "@mui/icons-material/Looks3Rounded";
import Looks4RoundedIcon from "@mui/icons-material/Looks4Rounded";
import SellerForm from "../../components/SellerForm/SellerForm";
import { MouseEventHandler, useRef } from "react";

const SellerPage = () => {
  const targetRef = useRef(null);

  const handleRegister: MouseEventHandler = (e) => {
    e.preventDefault();

    if (targetRef.current) {
      (targetRef.current as HTMLDivElement).scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="mt-20 flex flex-col justify-center item border-2  px-8 py-6">
      <div className="how-to-sell flex flex-col gap-8 rounded-xl border-2 border-blue-100  shadow-lg px-10 ">
        <div className="p-2">
          <h1 className=" text-[3.5rem] text-center font-medium">
            How to sell on GoCart?
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-16 w-full p-6 place-items-center">
          <div className="flex  items-center w-full gap-4">
            {" "}
            <span className="w-28 h-28 rounded-full flex justify-center items-center flex-col text-2xl uppercase font-bold text-center transition-all duration-300 ease-in  bg-pink-100 ">
              Step
              <br />
              <LooksOneIcon sx={{ fontSize: "1.8rem " }} />
            </span>
            <div>
              <h2 className=" font-bold mb-2">
                Create an Account or Register as a Seller:{" "}
              </h2>
              <p>Register as a seller on GoCart.</p>
            </div>
          </div>
          <div className="flex items-center w-full gap-4">
            {" "}
            <span className="w-28 h-28 rounded-full flex justify-center items-center flex-col text-2xl uppercase font-bold text-center bg-blue-100">
              Step <br />
              <LooksTwoRoundedIcon sx={{ fontSize: "1.8rem " }} />
            </span>
            <div>
              <h2 className=" font-bold mb-2">List Products: </h2>
              <p>Upload product details, images, and descriptions.</p>
              <p>Ensure accurate categorization and tagging.</p>
            </div>
          </div>
          <div className="flex items-center w-full flex-wrap gap-4 ">
            {" "}
            <span className="w-28 h-28 rounded-full flex justify-center items-center flex-col text-2xl uppercase font-bold text-center bg-red-100">
              Step <br />
              <Looks3RoundedIcon sx={{ fontSize: "1.8rem " }} />
            </span>
            <div className=" rounded-l-md w-[70%]">
              <h2 className=" font-bold mb-2">Set Pricing and Policies: </h2>
              <p>Determine competitive pricing.</p>
              <p>
                Establish clear shipping, return, and customer service policies.
              </p>
              <p>Configure payment methods.</p>
            </div>
          </div>
          <div className="flex items-center w-full gap-4">
            {" "}
            <span className="w-28 h-28 rounded-full flex justify-center items-center flex-col text-2xl uppercase font-bold text-center bg-yellow-100">
              Step <br />
              <Looks4RoundedIcon sx={{ fontSize: "1.8rem " }} />
            </span>
            <div>
              <h2 className=" font-bold mb-2">Manage Inventory and Orders: </h2>
              <p>Keep track of inventory levels.</p>
              <p>Fulfill orders promptly.</p>
              <p>Monitor feedback and address issues promptly.</p>
            </div>
          </div>
        </div>

        <div className="flex gap-10 justify-center items-center px-4 pt-4 pb-12">
          <span className=" text-gray-500">
            Become A Seller <ArrowForwardIcon />
          </span>
          <button
            onClick={handleRegister}
            className=" relative bg-black text-white w-400 px-5 py-3 rounded-full transition-all duration-300 ease-in-out font-medium hover:bg-yellow-500  hover:text-black "
          >
            Register as a seller
          </button>
        </div>
      </div>
      <SellerForm refrence={targetRef} />
    </div>
  );
};

export default SellerPage;
