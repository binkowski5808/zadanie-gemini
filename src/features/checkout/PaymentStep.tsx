import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { useDispatch } from "react-redux";
import { pay, prevStep } from "./checkoutSlice";

const PaymentStep = () => {
  const dispatch = useDispatch();
  return (
    <Flex flexDir="column" align="center">
      <div>coś wrzuciłem</div>
      <Button onClick={() => dispatch(prevStep())}>Wróć</Button>
      <Button onClick={() => dispatch(pay())}>Zapłać</Button>
    </Flex>
  );
};

export default PaymentStep;
