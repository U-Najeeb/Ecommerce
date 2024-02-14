import React, { FormEvent } from "react";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/searchIcon.png";
import cartIcon from "../../assets/cart.png";
import locationIcon from "../../assets/locationIcon.png";

type navbarPropTypes = {
  setSearchResult: React.Dispatch<React.SetStateAction<string>>;
  searchResults: string;
};

const Navbar: React.FC<navbarPropTypes> = ({
  setSearchResult,
  searchResults,
}) => {
  const handleSearch = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchResult(e.currentTarget.value);
  };

  return (
    <>
      <div className="navbar--container  flex p-1 bg-black fixed w-full top-0 left-0 z-50">
        <div className="navbar--wrapper flex w-full gap-2">
          <div className=" w-2/8 max-sm:w-9/12">
            <img src={logo} alt="logo" className="w-full" />
          </div>
          <button className=" p-2 flex flex-col justify-center  hover:border-2 border-solid border-white">
            <div>
              <p className=" text-input-grey text-xs font-medium">
                Delivering to Srinagar 190025
              </p>
            </div>
            <div>
              <p className="text-white text-base font-semibold flex justify-center items-center gap-1">
                <img src={locationIcon} className=" w-1/12 h-1/6" />
                Change location
              </p>
            </div>
          </button>
          <form className=" w-2/4  flex justify-center items-center">
            <div className=" flex justify-center items-center w-full ">
              <select
                name="categories"
                defaultValue={"All Categories"}
                className="h-10 px-2 outline-none rounded-l-md border-r-2 border-black bg-input-grey w-1/5"
              >
                <option value={"All Categories"} disabled>
                  All Categories
                </option>
                <option value={"smartphones"}>Smartphones</option>
                <option value={"fashion"}>Fashion</option>
                <option value={"skincare"}>Skin Care</option>
                <option value={"home-decoration"}>Home Decoration</option>
                <option value={"laptops"}>Laptops</option>
                <option value={"fragrances"}>Fragrances</option>
                <option value={"groceries"}>Groceries</option>
              </select>
              <input
                type="text"
                placeholder="Search in GoCart"
                className="w-3/5 h-10 p-2 outline-none"
                name="searchfeild"
                value={searchResults}
                onChange={handleSearch}
              />
              <button
                type="submit"
                className="h-10 flex justify-center items-center rounded-r-md bg-primary"
              >
                <img src={searchIcon} className="w-1/2 bg-primary" />
              </button>
            </div>
          </form>
          <button className=" p-2 flex flex-col justify-center  hover:border-2 border-solid border-white">
            <div className="">
              <p className="text-white text-xs">Hello, Friend</p>
            </div>
            <div className="">
              <p className="text-white text-sm font-semibold">Login here</p>
            </div>
          </button>
          <button className=" p-2 flex flex-col justify-center items-center hover:border-2 border-solid border-white">
            <div className="">
              <p className="text-white font-semibold">Orders</p>
            </div>
          </button>
          <button className=" p-2 flex flex-col justify-center hover:border-2 border-solid border-white">
            <div className="flex items-center gap-1">
              <img src={cartIcon} />
              <div className="bg-white w-5 h-5 rounded-xl flex justify-center items-center font-bold">
                1
              </div>
              <p className="text-white text-sm">Cart</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
