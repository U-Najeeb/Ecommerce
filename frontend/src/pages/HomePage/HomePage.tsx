import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../../hooks/useAxios";
import { ProductsType } from "../../types/Products";
import Navbar from "../../components/Navbar/Navbar";
import Carousel from "../../components/Carousel/Carousel";

const HomePage = () => {
  const [products, setProducts] = React.useState<ProductsType[]>([]);
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
  const filteredProducts = products.filter((product: ProductsType) =>
    product.title.toLowerCase().includes(searchResults)
  );

  return (
    <div>
      <Navbar setSearchResult={setSearchResult} searchResults={searchResults} />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1>Error fetching products.</h1>
      ) : (
        <div style={{padding: " 4.8rem 0"}}>
        <Carousel/>
          <ul>
            {filteredProducts.map((product: ProductsType) => (
              <li key={product._id}>{product.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;
