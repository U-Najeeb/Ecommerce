import React, { useState } from "react";
import { useQuery } from "react-query";
import { useAxios } from "../../hooks/useAxios";
import { ProductsType } from "../../types/Products";
import Navbar from "../../components/Navbar/Navbar";

const HomePage = () => {
  const [products, setProducts] = React.useState<ProductsType[]>([]);
  const [searchResults, setSearchResult] = useState("");
  
  async function getProducts() {
    const response = await useAxios.get("/products");
    setProducts(response?.data?.products);
  }
  
  const { isLoading } = useQuery("all-products", getProducts);

  const filteredProducts = products.filter((product: ProductsType) =>
  product.title.toLowerCase().includes(searchResults)
  
);
  return (
    <div>
      <Navbar setSearchResult = {setSearchResult} searchResults = {searchResults}/>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <ul>
          {filteredProducts.map((product: ProductsType) => (
            <li key={product._id}>{product.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
