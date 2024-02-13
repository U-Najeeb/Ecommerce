import React, {FormEvent} from "react";
import logo from "../../assets/logo.png";

type navbarPropTypes = {
  setSearchResult: React.Dispatch<React.SetStateAction<string>>;
  searchResults : string
};

const Navbar: React.FC<navbarPropTypes> = ({setSearchResult , searchResults}) => {
  
  const handleSearch = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchResult(e.currentTarget.value);
  };

  return (
    <>
      <div className="navbar--container  flex pl-1 pr-1 bg-black">
        <div className="navbar--wrapper flex w-full">
          <div className="w-fit max-sm:w-9/12">
            <img src={logo} alt="logo" className="w-5/6" />
          </div>
          <form className="w-3/5 flex justify-center items-center border-2 border-white ">
            <input
              type="text"
              placeholder="Search in GoCart"
              className="w-3/5 h-9 p-2 outline-none  rounded-md"
              name="searchfeild"
              value={searchResults}
              onChange={handleSearch}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Navbar;
