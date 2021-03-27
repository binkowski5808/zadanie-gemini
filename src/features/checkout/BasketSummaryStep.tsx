import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { useDispatch } from "react-redux";
import { nextStep } from "./checkoutSlice";

const BasketSummaryStep = () => {
  const dispatch = useDispatch();
  return (
    <Flex flexDir="column" align="center">
      <div>coś wrzuciłem</div>
      <Button onClick={() => dispatch(nextStep())}>Przejdź do płatności</Button>
    </Flex>
  );
};

export default BasketSummaryStep;
