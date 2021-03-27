import { Flex } from "@chakra-ui/layout";
import React from "react";
import BasketSummaryStep from "./BasketSummaryStep";
import PaymentStep from "./PaymentStep";
import PaymentSummaryStep from "./PaymentSummaryStep";

const Checkout = () => {
  const steps = [
    {
      title: "Koszyk",
      content: <BasketSummaryStep />,
    },
    {
      title: "Karta płatnicza",
      content: <PaymentStep />,
    },
    {
      title: "Podsumowanie płatności",
      content: <PaymentSummaryStep />,
    },
  ];

  return <Flex flex="1 1 100%">Podsumowanie</Flex>;
};

export default Checkout;
