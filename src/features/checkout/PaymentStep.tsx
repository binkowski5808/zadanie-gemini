import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreditCardChooser from "../creditCards/CreditCardChooser";
import CreditCardForm from "../creditCards/CreditCardForm";
import { pay, prevStep, selectPaymentStatus } from "./checkoutSlice";

const PaymentStep = () => {
  const paymentStatus = useSelector(selectPaymentStatus);
  const dispatch = useDispatch();
  const [openedAddCreditCard, setOpenedAddCreditCard] = useState(false);

  return (
    <Flex flexDir="column" align="center">
      <CreditCardChooser />
      <Button onClick={() => setOpenedAddCreditCard(true)}>
        Dodaj kartę płatniczą
      </Button>
      {openedAddCreditCard && <CreditCardForm />}
      <Button onClick={() => dispatch(prevStep())}>Wróć</Button>
      <Button
        onClick={() => dispatch(pay())}
        isLoading={paymentStatus === "loading"}
      >
        Zapłać
      </Button>
    </Flex>
  );
};

export default PaymentStep;
