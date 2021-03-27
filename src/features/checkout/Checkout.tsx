import { Flex, Heading } from "@chakra-ui/layout";
import React from "react";
import { useSelector } from "react-redux";
import BasketSummaryStep from "./BasketSummaryStep";
import { selectCurrentStep } from "./checkoutSlice";
import PaymentStep from "./PaymentStep";
import PaymentSummaryStep from "./PaymentSummaryStep";

const Checkout = () => {
  const steps = [
    {
      title: "Podsumowanie zamówienia",
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

  const currentStep = useSelector(selectCurrentStep);

  return (
    <Flex flex="1 1 100%" flexDir="column" align="center">
      <Heading fontSize="x-large" flex="1 1 auto">
        {steps[currentStep].title}
      </Heading>
      <Flex flex="1 1 100%">{steps[currentStep].content}</Flex>
    </Flex>
  );
};

export default Checkout;
