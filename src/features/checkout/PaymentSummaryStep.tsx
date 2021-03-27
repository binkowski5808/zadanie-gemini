import { Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { useSelector } from "react-redux";
import { selectCreditCardChosen } from "./checkoutSlice";
import Cards from "react-credit-cards";
const PaymentSummaryStep = () => {
  const creditCardChosen = useSelector(selectCreditCardChosen);
  return (
    <Flex flexDir="column" alignItems="center">
      <Text htmlFor="">Wybrana karta do płatności:</Text>
      <Cards
        number={creditCardChosen!.number}
        name={creditCardChosen!.name}
        expiry={creditCardChosen!.expiry}
        cvc={creditCardChosen!.cvc}
      />
    </Flex>
  );
};

export default PaymentSummaryStep;
