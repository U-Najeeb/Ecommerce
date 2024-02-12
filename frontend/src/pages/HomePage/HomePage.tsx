import React from "react";
import { useQuery } from "react-query";
import { useAxios } from "../../hooks/useAxios";
import { ProductsType } from "../../types/products";

const HomePage = () => {
  const [products, setProducts] = React.useState<ProductsType[]>([]);
  
  async function getProducts() {
    const response = await useAxios.get("/products");
    setProducts(response?.data?.products)
  }

  const {isLoading} = useQuery("all-products", getProducts);


  return (
    <div>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <ul>
          {products.map((product: ProductsType) => (
            <li key={product._id}>{product.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
