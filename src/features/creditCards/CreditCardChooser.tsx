import { Flex, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  choseCreditCard,
  selectCreditCardChosen,
  selectDirection,
} from "../checkout/checkoutSlice";
import {
  selectCreditCards,
  selectGetCreditCardsStatus,
} from "./creditCardsSlice";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { IconButton } from "@chakra-ui/button";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import {
  swipeAnimation,
  swipeConfidenceThreshold,
  swipePower,
} from "../../app/helpers";

const CreditCardChooser = () => {
  const dispatch = useDispatch();
  const creditCards = useSelector(selectCreditCards);
  const getCreditCardsStatus = useSelector(selectGetCreditCardsStatus);
  const creditCardChosen = useSelector(selectCreditCardChosen);
  const direction = useSelector(selectDirection);

  const getCreditCardChosenIndex = () => {
    if (creditCardChosen) {
      const index = creditCards.findIndex(
        (creditCard) => creditCard.number === creditCardChosen.number
      );
      if (index === -1) return 0;
      return index;
    }
    return 0;
  };
  const [creditCardIndex, setCreditCardIndex] = useState(
    getCreditCardChosenIndex()
  );
  useEffect(() => {
    setCreditCardIndex(getCreditCardChosenIndex());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creditCardChosen]);

  useEffect(() => {
    //Initial choice for credit card depended on status of api call
    getCreditCardsStatus === "success" &&
      dispatch(choseCreditCard(creditCards[creditCardIndex]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCreditCardsStatus]);

  const paginate = (newDirection: number) => {
    dispatch(choseCreditCard(creditCards[creditCardIndex + newDirection]));
  };
  return (
    <>
      {getCreditCardsStatus === "error" ? (
        <Text colorScheme="red">Błąd podczas pobierania kart kredytowych</Text>
      ) : (
        <Skeleton isLoaded={getCreditCardsStatus === "success"}>
          <AnimatePresence initial={false} custom={direction}>
            <Flex
              position="relative"
              overflowX="hidden"
              mt={5}
              align="center"
              justify="center"
              flexDir={["column", "row"]}
            >
              <IconButton
                aria-label="Poprzednia karta"
                d="flex"
                borderRadius="full"
                width="40px"
                height="40px"
                justifyContent="center"
                alignItems="center"
                fontWeight="bold"
                fontSize="1.25rem"
                zIndex="2"
                mb={{ base: 2, sm: 0 }}
                disabled={creditCardIndex === 0}
                onClick={() => paginate(-1)}
                mr={{ base: 0, sm: 3 }}
                icon={<BiSkipPrevious />}
              />
              <motion.div
                key={creditCardIndex}
                custom={direction}
                variants={swipeAnimation}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (
                    swipe < -swipeConfidenceThreshold &&
                    creditCardIndex < creditCards.length - 1
                  ) {
                    paginate(1);
                  } else if (
                    swipe > swipeConfidenceThreshold &&
                    creditCardIndex > 0
                  ) {
                    paginate(-1);
                  }
                }}
              >
                <Cards
                  key={creditCards[creditCardIndex]?.id || ""}
                  cvc={creditCards[creditCardIndex]?.cvc || ""}
                  expiry={creditCards[creditCardIndex]?.expiry || ""}
                  name={creditCards[creditCardIndex]?.name || ""}
                  number={creditCards[creditCardIndex]?.number || ""}
                />
              </motion.div>
              <IconButton
                aria-label="Następna karta"
                mt={{ base: 2, sm: 0 }}
                icon={<BiSkipNext />}
                borderRadius="full"
                width="40px"
                height="40px"
                justifyContent="center"
                alignItems="center"
                fontWeight="bold"
                fontSize="1.25rem"
                zIndex="2"
                disabled={
                  creditCardIndex === creditCards.length - 1 ||
                  creditCards.length === 0
                }
                onClick={() => paginate(1)}
                ml={{ base: 0, sm: 3 }}
              />
            </Flex>
          </AnimatePresence>
        </Skeleton>
      )}
    </>
  );
};

export default CreditCardChooser;
