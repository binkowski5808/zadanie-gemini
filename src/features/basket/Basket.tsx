import { Button } from "@chakra-ui/button";
import { LightMode } from "@chakra-ui/color-mode";
import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Badge, Text } from "@chakra-ui/layout";
import { Fade } from "@chakra-ui/transition";
import { motion } from "framer-motion";
import React from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "../../ui/Drawer";
import Checkout from "../checkout/Checkout";
import { selectPaymentStatus, resetCheckout } from "../checkout/checkoutSlice";
import {
  selectBasketStatus,
  selectNumberOfProductsInBasket,
} from "./basketSlice";

const MotionButton = motion(Button);
const MotionBadge = motion(Badge);

const Basket = () => {
  const basketStatus = useSelector(selectBasketStatus);
  const numberOfProducts = useSelector(selectNumberOfProductsInBasket);
  const paymentStatus = useSelector(selectPaymentStatus);
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <MotionButton
        isLoading={basketStatus === "loading"}
        aria-label="Otwórz koszyk"
        position="relative"
        size="lg"
        p={2}
        d="flex"
        flexDir="column"
        onClick={onOpen}
        whileHover={{ scale: 1.2 }}
      >
        <Fade in={basketStatus !== "loading"}>
          <Icon fontSize="xl" as={FaShoppingBasket} />
          <Text fontSize="md">Koszyk</Text>
        </Fade>

        {numberOfProducts > 0 && (
          <LightMode>
            <MotionBadge
              position="absolute"
              colorScheme="red"
              right={4}
              borderRadius="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {numberOfProducts}
            </MotionBadge>
          </LightMode>
        )}
      </MotionButton>
      <Drawer
        isOpen={isOpen}
        onClose={() => {
          onClose();
          paymentStatus === "success" && dispatch(resetCheckout());
        }}
        headerText="Finalizacja zamówienia"
      >
        <Checkout />
      </Drawer>
    </>
  );
};

export default Basket;
