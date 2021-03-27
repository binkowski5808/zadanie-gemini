import { Flex, Heading } from "@chakra-ui/layout";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { swipeAnimation } from "../../app/helpers";
import BasketSummaryStep from "./BasketSummaryStep";
import { selectCurrentStep, selectDirection } from "./checkoutSlice";
import PaymentStep from "./PaymentStep";
import PaymentSummaryStep from "./PaymentSummaryStep";
const MotionFlex = motion(Flex);

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
  const direction = useSelector(selectDirection);

  return (
    <AnimatePresence initial={false} custom={direction}>
      <Flex
        flex="1 1 100%"
        flexDir="column"
        align="center"
        position="relative"
        overflowX="hidden"
      >
        <MotionFlex
          flexDir="column"
          align="center"
          w="full"
          key={currentStep}
          custom={direction}
          variants={swipeAnimation}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          <Heading fontSize="xl" flex="1 1 auto">
            {steps[currentStep].title}
          </Heading>
          <Flex flex="1 1 100%" flexDir="column" mt={3} width="full">
            {steps[currentStep].content}
          </Flex>
        </MotionFlex>
      </Flex>
    </AnimatePresence>
  );
};

export default Checkout;
