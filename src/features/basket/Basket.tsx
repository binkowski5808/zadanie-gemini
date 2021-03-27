import { IconButton } from "@chakra-ui/button";
import React from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectBasketStatus } from "./basketSlice";

const Basket = () => {
  const basketStatus = useSelector(selectBasketStatus);

  return (
    <IconButton
      size="lg"
      aria-label="Otwórz koszyk"
      isLoading={basketStatus === "loading"}
      icon={<FaShoppingBasket />}
    />
  );
};

export default Basket;
