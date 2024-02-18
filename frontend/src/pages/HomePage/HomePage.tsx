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
      <Navbar setSearchResult={setSearchResult} searchResults={searchResults} />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1>Error fetching products.</h1>
      ) : (
        <div style={{ padding: "4.8rem 0" }}>
          <Carousel />
          {/* Render cards for each category */}
          <div className="grid grid-cols-3">
          {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
            <div key={category} className="border-2 flex flex-col gap-5 items-center h-full w-5/6">
              <h2 className=" uppercase font-bold text-2xl text-center">{category}</h2>
              <div className="card-container grid grid-cols-2 w-full place-items-center">
                {categoryProducts.map((product) => (
                  <div key={product._id} className="card w-full flex flex-col justify-center items-center">
                    <img src={product?.thumbnail} width={"60rem"} className=" rounded-full"/>
                    <h3>{product.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
