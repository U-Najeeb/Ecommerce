/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  ChangeEvent,
  FormEvent,
  MouseEventHandler
} from "react";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/searchIcon.png";
import cartIcon from "../../assets/cart.png";
import locationIcon from "../../assets/locationIcon.png";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../../hooks/useAxios";
import { CartTypes } from "../../types/Cart";

type NavbarProps = {
  setSearchResult: React.Dispatch<React.SetStateAction<string>>;
  searchResults: string;
};
type GeolocationPosition = {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const Navbar: React.FC<NavbarProps> = ({ setSearchResult, searchResults }) => {
  const navigate = useNavigate();
  const {userData}  = useUserContext()
  const [cartData , setCartData] = React.useState<CartTypes>({
    _id : "",
    consumer : "",
    productsInCart : [],
    itemsInCart : 0
  })
  const [currentLocation, setCurrentLocation] = React.useState<GeolocationPosition| null> ({
    coords : {
      latitude : 28.7041,
      longitude : 77.1025
    }
  });


  const handleSearch = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchResult((e.target as HTMLInputElement).value);
  };

  const handleLogin: MouseEventHandler = (e) => {
    e.preventDefault();
    if (!userData) {
      return navigate("/login");
    }
    navigate("/profile");
  };

  const handleDropdown = (e: ChangeEvent<HTMLSelectElement>) => {
    navigate(`/products/${e.target.value}`)
  };

  const handleLogoClick : MouseEventHandler = (e) => {
    e.preventDefault()
    navigate("/")
  }

  const handleSetLocation: MouseEventHandler = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation(position);
    });
  };

  const fetchCartData = async () => {
    const response = await useAxios.get("/cart/getusercart", {
      headers : {
        Authorization : `Bearer ${document.cookie}`
      }
    })
    setCartData(response?.data?.cart)
    return response
  }
  const {data, refetch} = useQuery({
    queryKey : ["cart-data", cartData],
    queryFn : fetchCartData,
  })

  React.useEffect(()=>{
    refetch()
  }, [refetch, data])

    // useEffect(() => {
    //   async function getLocation() {
    //     const response = await fetch(
    //       `https://api.geoapify.com/v1/geocode/reverse?lat=${Number(
    //         currentLocation?.coords?.latitude
    //       )}&lon=${Number(
    //         currentLocation?.coords?.longitude
    //       )}&apiKey=9722f72525dd454eba4f2affa527a193`
    //     );
    //     console.log(await response.json());
    //   }
    //   getLocation();
    // }, [currentLocation]);

  return (
    <>
      <div className="navbar--container  flex p-1 bg-black fixed w-full top-0 left-0 z-50 box-border ">
        <div className="navbar--wrapper flex w-full relative">
          <button className=" w-2/8 max-sm:w-9/12" onClick = {handleLogoClick}>
            <img src={logo} alt="logo" className="w-full" />
          </button>
          <button
            className=" p-2 flex flex-col justify-center border-2 border-solid border-transparent  hover:border-2 hover:border-solid hover:border-white"
            onClick={handleSetLocation}
          >
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
                onChange={handleDropdown}
              >
                <option value={"All Categories"} disabled >
                  All Categories
                </option>
                <option value={"smartphones"}>Smartphones</option>
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
          <button
            className=" p-2 flex flex-col justify-center  border-2 border-solid border-transparent  hover:border-2 hover:border-solid hover:border-white"
            onClick={handleLogin}
          >
            <div className="">
              <p className="text-white text-xs">
                {userData ? `Hello, ${userData?.fName}` : "Hello, Friend"}
              </p>
            </div>
            <div className="">
              <p className="text-white text-sm font-semibold">
                {userData ? "View Profile" : "Login here"}
              </p>
            </div>
          </button>
          <button className=" p-2 flex flex-col justify-center items-center border-2 border-solid border-transparent  hover:border-2 hover:border-solid hover:border-white">
            <div className="">
              <p className="text-white font-semibold">Orders</p>
            </div>
          </button>
          <button className=" p-2 flex flex-col justify-center border-2 border-solid border-transparent  hover:border-2 hover:border-solid hover:border-white">
            <div className="flex items-center gap-1">
              <img src={cartIcon} />
              <div className="bg-white w-5 h-5 rounded-xl flex justify-center items-center font-bold">
                {cartData?.itemsInCart ? cartData?.itemsInCart :   "0"}
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
