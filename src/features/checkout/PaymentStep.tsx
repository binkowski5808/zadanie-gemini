import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreditCardChooser from "../creditCards/CreditCardChooser";
import CreditCardForm from "../creditCards/CreditCardForm";
import { pay, prevStep, selectPaymentStatus } from "./checkoutSlice";

const PaymentStep = () => {
  const paymentStatus = useSelector(selectPaymentStatus);
  const dispatch = useDispatch();
  const [openedAddCreditCard, setOpenedAddCreditCard] = useState(false);

  const MotionButton = motion(Button);

  return (
    <Flex flexDir="column" align="center">
      <CreditCardChooser />
      <MotionButton
        mt={3}
        onClick={() =>
          openedAddCreditCard
            ? setOpenedAddCreditCard(false)
            : setOpenedAddCreditCard(true)
        }
        width="xs"
        whileHover={{ scale: 1.2 }}
      >
        {openedAddCreditCard ? "Zamknij" : "Dodaj kartę płatniczą"}
      </MotionButton>
      <AnimatePresence>
        {openedAddCreditCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CreditCardForm
              submitCallback={() => setOpenedAddCreditCard(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Flex justify="center" mt={4} sx={{ gap: "10px" }}>
        <Button onClick={() => dispatch(prevStep())}>Wróć</Button>
        <Button
          onClick={() => dispatch(pay())}
          isLoading={paymentStatus === "loading"}
        >
          Zapłać
        </Button>
      </Flex>
    </Flex>
  );
};

export default PaymentStep;
