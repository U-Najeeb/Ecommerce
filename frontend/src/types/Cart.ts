import { ProductsType } from "./Products";

export type CartTypes = {
  _id: string;
  consumer: string;
  productsInCart: [
    {
      productId: ProductsType;
      quantityOfProduct: number;
    }
  ];
  itemsInCart: number;
};

export type cartProduct = {
  productId: ProductsType;
  quantityOfProduct: number;
};
