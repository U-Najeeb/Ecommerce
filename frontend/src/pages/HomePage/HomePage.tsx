import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../../hooks/useAxios";
import { ProductsType } from "../../types/Products";
import Navbar from "../../components/Navbar/Navbar";
import Carousel from "../../components/Carousel/Carousel";

const HomePage = () => {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [searchResults, setSearchResult] = useState("");
  const { isLoading, isError } = useQuery({
    queryKey: ["all-products"],
    queryFn: getProducts,
    enabled: true,
  });
  
  async function getProducts() {
    try {
      const response = await useAxios.get("/products");
      setProducts(response?.data?.products);
      return response?.data?.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  }

  const productsByCategory: { [key: string]: ProductsType[] } = products.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    },
    {} as { [key: string]: ProductsType[] }
  );

  return (
    <div>
      <Navbar
        setSearchResult={setSearchResult}
        searchResults={searchResults}
      />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1>Error fetching products.</h1>
      ) : (
        <div style={{ padding: "4.8rem 0" }}>
          <Carousel />

          <div className="grid grid-cols-3 gap-8 pt-10 p-4">
            {Object.entries(productsByCategory).map(
              ([category, categoryProducts]) => (
                <div
                  key={category}
                  className="flex flex-col gap-5 items-center h-full w-full border-2 rounded-lg transition-shadow duration-300 ease-in-out  hover:shadow-lg"
                >
                  <h2 className=" uppercase font-semibold text-2xl text-center bg-black w-full p-3 rounded-t-lg text-white">
                    {category}
                  </h2>
                  <div className="card-container grid grid-cols-2 w-full place-items-start p-2 gap-2">
                    {categoryProducts.slice(0, 4).map((product) => (
                      <div
                        key={product._id}
                        className="card w-full flex flex-col justify-center items-center h-full border-2 rounded-md p-2"
                      >
                        <img
                          src={product?.thumbnail}
                          width={"40%"}
                          className="rounded-full aspect-square object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                        />
                        <h3>{product.title}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
