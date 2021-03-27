import { Button, IconButton } from "@chakra-ui/button";
import { LightMode } from "@chakra-ui/color-mode";
import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Badge, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { useSelector } from "react-redux";
import Drawer from "../../ui/Drawer";
import Checkout from "../checkout/Checkout";
import {
  selectBasketStatus,
  selectNumberOfProductsInBasket,
} from "./basketSlice";

const Basket = () => {
  const basketStatus = useSelector(selectBasketStatus);
  const numberOfProducts = useSelector(selectNumberOfProductsInBasket);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button
        isLoading={basketStatus === "loading"}
        aria-label="Otwórz koszyk"
        position="relative"
        size="lg"
        p={2}
        d="flex"
        flexDir="column"
        onClick={onOpen}
      >
        <Icon fontSize="xl" as={FaShoppingBasket} />
        <Text fontSize="md">Koszyk</Text>
        {numberOfProducts > 0 && (
          <LightMode>
            <Badge
              position="absolute"
              colorScheme="red"
              right={4}
              borderRadius="full"
            >
              {numberOfProducts}
            </Badge>
          </LightMode>
        )}
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        headerText="Finalizacja zamówienia"
      >
        <Checkout />
      </Drawer>
    </>
  );
};

export default Basket;
