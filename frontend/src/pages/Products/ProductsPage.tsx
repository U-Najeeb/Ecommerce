import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import { ProductsType } from "../../types/Products";


const ProductsPage = () => {
  const { category } = useParams();
  const [products, setProducts] = React.useState<ProductsType[]>([]);
  const handleProductsWithCategory = async () => {
    const response = await useAxios.get(
      `/products/productsbycategory/${category}`
    );
    setProducts(response?.data?.products);
    return response?.data?.products;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, isError, data } = useQuery({
    queryKey: ["product-categrory"],
    queryFn: handleProductsWithCategory,
  });
  return (
    <>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : isError ? (
        <h1>Error Loading Data...</h1>
      ) : (
        <ul>
          {products.map((product: ProductsType) => (
            <li key={product._id}>{product.title}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ProductsPage;
