import { useMutation, useQuery } from "@tanstack/react-query";
import React, {useEffect} from "react";
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
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["product", category],
    queryFn: handleProductsWithCategory,
  });

  const addToCart = (product: ProductsType) => {
    return useAxios.post(
      "/cart/",
      {
        productsInCart: {
          productId: product._id,
        }
      },
      {
        headers: {
          Authorization: `Bearer ${document.cookie}`,
        },
      }
    );
  };
  

  const { mutate } = useMutation({
    mutationFn: addToCart,
  });

  function handleAddToCardClick(product: ProductsType) {
    mutate(product);
  }

  useEffect(() => {
    refetch();
  }, [category]);

  return (
    <>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : isError ? (
        <h1>Error Loading Data...</h1>
      ) : (
        <ul className=" mt-20">
          {products.map((product: ProductsType) => (
            <div
              className="products--container py-6 flex justify-center border-b-2"
              key={product._id}
            >
              <div className="products--wrapper flex items-center gap-6 border-2 rounded-2xl p-5 w-3/4 transition-shadow duration-100 ease-in-out hover:shadow-xl bg-white">
                <div className="product--image rounded-lg h-fit w-72 border-2 p-2">
                  <img
                    src={
                      product.images[0] ||
                      product.images[1] ||
                      product.images[2]
                    }
                    className=" rounded-lg w-full h-full"
                  />
                </div>
                <div className="flex justify-evenly items-center w-full">
                  <div className="products--heading-description my-4 w-2/3 h-full flex flex-col gap-3  ">
                    <div className="product--title font-bold text-2xl">
                      <h1>{product.title}</h1>
                    </div>
                    <div className="project--description text-md w-5/6 mb-5">
                      <h1>{product.description}</h1>
                    </div>
                    <div className="flex gap-3">
                      <div className="cart--button-box">
                        <button
                          className="cart--button bg-primary text-white p-2 w-32 rounded-xl"
                          onClick={() => handleAddToCardClick(product)}
                        >
                          Add a cart
                        </button>
                      </div>
                      <div className="buy--button-box">
                        <button className="buy--button bg-yellow-500 text-black p-2 w-32 rounded-xl">
                          Buy now
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="products--infomation-container">
                    <div className="product--price">
                      <h1>
                        <span className=" font-semibold">Price: $</span>
                        {product.price}
                      </h1>
                    </div>
                    <div className="project--rating">
                      <h1>
                        <span className=" font-semibold">Rating: </span>
                        {product.rating}
                      </h1>
                    </div>
                    <div className="project--stock">
                      <h1>
                        <span className=" font-semibold">Stock: </span>{" "}
                        {product.stock > 0 && product.stock <= 5 ? (
                          <span className=" text-orange-400">
                            Few items left
                          </span>
                        ) : product.stock > 5 ? (
                          <span className=" text-green-500">In Stock</span>
                        ) : (
                          <span className=" text-red-600">Out Of Stock</span>
                        )}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
    </>
  );
};

export default ProductsPage;
