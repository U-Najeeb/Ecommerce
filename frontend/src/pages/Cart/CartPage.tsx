import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../../hooks/useAxios";
import { cartProduct } from "../../types/Cart";

const CartPage = () => {
  const queryClient = useQueryClient();
  async function fetchCartPageData() {
    const response = await useAxios.get("/cart/getusercart");
    return response?.data?.cart;
  }

  const { data } = useQuery({
    queryKey: ["cart-page-data"],
    queryFn: fetchCartPageData,
  });

  const deleteProductFn = async (product: string) => {
    await useAxios.delete(`/cart/deleteproduct/${product}`);
  };

  const { mutate: mutateDeleteProduct } = useMutation({
    mutationKey: ["cart "],
    mutationFn: deleteProductFn,
    onSuccess: () => {
      queryClient.invalidateQueries("cart" as never);
    },
  });

  const handleDeleteProduct = (product: string) => {
    mutateDeleteProduct(product);
  };

  const increaseUpdateProductQuantity = async (product: cartProduct) => {
    await useAxios.patch(`/cart/updateproduct/${product.productId._id}`, {
      operation: "increment",
    });
    return;
  };

  const { mutate: increaseUpdateProduct } = useMutation({
    mutationKey: ["cart"],
    mutationFn: increaseUpdateProductQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries("cart" as never);
    },
  });

  const increaseProductQuantity = (product: cartProduct) => {
    increaseUpdateProduct(product);
  };

  ////Increase Product Quantity
  const decreaseUpdateProductQuantity = async (product: cartProduct) => {
    await useAxios.patch(`/cart/updateproduct/${product.productId._id}`, {
      operation: "decrement",
    });
    return;
  };

  const { mutate: decreaseUpdateProduct } = useMutation({
    mutationKey: ["cart"],
    mutationFn: decreaseUpdateProductQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries("cart" as never);
    },
  });

  const decreaseProductQuantity = (product: cartProduct) => {
    decreaseUpdateProduct(product);
  };

  return (
    <div className="cart--page-container mt-20 border-2 py-2">
      <div className="cart--page-wrapper">
        <h1 className=" font-bold text-2xl px-8 py-2 w-full border-b-2">{`Your Cart (${data?.itemsInCart})`}</h1>
        <div className="cart--page-container flex justify-start items-center ">
          <div className="cart--left-wrapper px-14 py-5 grid grid-cols-3 gap-5 w-full">
            {data?.productsInCart.map((product: cartProduct) => (
              <div
                className="cart--product-card border-2 rounded-md flex w-full p-4 gap-4 relative "
                key={product.productId._id}
              >
                <span
                  className="absolute right-2 top-2 font-bold text-xs cursor-pointer"
                  onClick={() => handleDeleteProduct(product.productId._id)}
                >
                  ❌
                </span>
                <div className="cart--product-image border-2 p-3 rounded-lg flex justify-start items-center">
                  <img
                    src={product.productId.images[0]}
                    width={"300px"}
                    className=" rounded-lg"
                  />
                </div>

                <div className="flex flex-col gap-3 p-2 pl-0  h-fit w-full">
                  <div className="w-full">
                    <h2 className="card--heading font-bold text-xl leading-8 max-h-[38px] overflow-hidden transition-all duration-300 ease-out hover:overflow-visible hover:max-h-[4rem]">
                      {product.productId.title}
                    </h2>
                    <p className=" text-xs text-gray-400">
                      Ref: {product.productId._id}
                    </p>
                  </div>
                  <div className="flex flex-col text-sm gap-2">
                    <span>✅ Home Delivery</span>
                    <span>✅ Cash On Delivery</span>
                  </div>

                  <div className="card--footer py-2 border-t-2 flex flex-col gap-3 justify-between items-start">
                    <div className="quantity--box flex gap-4 items-center">
                      <div>
                        <span>Qty:</span>
                      </div>
                      <div>
                        <div className="border-2 rounded-2xl">
                          <button
                            type="button"
                            className="px-3  font-semibold text-primary h-full border-r-2"
                            onClick={() => decreaseProductQuantity(product)}
                          >
                            -
                          </button>
                          <span className="p-2">
                            {product?.quantityOfProduct}
                          </span>
                          <button
                            type="button"
                            className="px-3 font-semibold text-primary h-full border-l-2"
                            onClick={() => increaseProductQuantity(product)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between h-fit gap-8 items-center w-full">
                      <span className="text-gray-400 text-sm">
                        Total: $
                        {product?.quantityOfProduct * product?.productId.price}
                      </span>
                      <span className=" font-bold text-lg">
                        {" "}
                        <span className=" font-normal text-sm">M.R.P: </span>$
                        {product?.productId.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cart--page--checkout-box mt-3 border-t-2 p-5 flex justify-evenly bg-gray-50 ">
          <div className="w-[60%] border-2 bg-white p-4 rounded-md">
            <p className="leading-8 text-sm">
              <span className=" font-bold">Delivery Information:</span> <br />
              Standard Delivery is 2-4 working days. <br />{" "}
              <span className=" font-bold">Need it faster?</span>
              <br /> You can upgrade to{" "}
              <span className="font-bold">Next Day Delivery</span> during
              Checkout for{" "}
              <span className="font-bold">
                Next Working Day delivery (Order before 10pm)
              </span>
              . Next Day Delivery is not available outside of Srinagar Jammu and
              Kashmir.
              <span className="font-bold">
                {" "}
                Delivery is Monday to Friday, excluding public holidays
              </span>
              . <br /> Any orders placed after 10pm Friday and over the weekend
              will not be dispatched until Monday, excluding Public Holidays.
              <br /> FREE returns to any GoCart Superstore near you.
              <br /> Please note, certain large items such as bikes, doll
              houses, and playhouses may be delivered in their original
              packaging, which could display images or details of the contents.
            </p>
          </div>

          <div className="checkout--box w-1/3 border-2 p-3 rounded-md flex flex-col gap-4">
            <h1 className=" font-bold text-2xl p-2 text-primary border-b-2">
              Summary
            </h1>
            <div className="checkbox---numbers p-2 flex gap-3 flex-col border-b-2">
              <div className="flex justify-between">
                <span>Subtotal </span>
                <span>
                  $
                  {data?.productsInCart.reduce(
                    (acc: number, product: cartProduct) => {
                      return (
                        acc +
                        (product?.productId?.price *
                          product.quantityOfProduct || 0)
                      );
                    },
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GST</span>
                <span>10%</span>
              </div>
            </div>

            <div className="flex justify-between p-2 border-b-2">
              <span className=" text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">
                ${" "}
                {data?.productsInCart
                  .reduce((acc: number, product: cartProduct) => {
                    const totalPriceWithoutGST =
                      (product?.productId?.price || 0) *
                      product.quantityOfProduct;
                    const GSTAmount = totalPriceWithoutGST * (10 / 100);
                    const totalPriceWithGST = totalPriceWithoutGST + GSTAmount;
                    return acc + totalPriceWithGST;
                  }, 0)
                  .toFixed(2)}
              </span>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                className=" uppercase bg-primary text-white w-2/3 rounded-full p-2"
              >
                Checkout
              </button>
            </div>
            <div>
              <p className=" text-xs">
                This site is protected by reCAPTCHA and the Google{" "}
                <span className="text-primary">Privacy Policy</span> and{" "}
                <span className="text-primary">Terms of Service</span> apply
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
