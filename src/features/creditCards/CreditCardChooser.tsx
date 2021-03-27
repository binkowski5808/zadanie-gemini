import { Flex, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  choseCreditCard,
  selectCreditCardChosen,
} from "../checkout/checkoutSlice";
import {
  selectCreditCards,
  selectGetCreditCardsStatus,
} from "./creditCardsSlice";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { CreditCard } from "../../sagas/requests/creditCardsRequests";
import { IconButton } from "@chakra-ui/button";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";

const getCreditCardChosenIndex = (
  creditCardChosen: CreditCard | undefined,
  creditCards: CreditCard[]
) => {
  if (creditCardChosen) {
    const index = creditCards.findIndex(
      (creditCard) => creditCard.number === creditCardChosen.number
    );
    if (index === -1) return 0;
    return index;
  }
  return 0;
};

const CreditCardChooser = () => {
  const dispatch = useDispatch();
  const creditCards = useSelector(selectCreditCards);
  const getCreditCardsStatus = useSelector(selectGetCreditCardsStatus);
  const creditCardChosen = useSelector(selectCreditCardChosen);

  const [creditCardIndex, setCreditCardIndex] = useState(
    getCreditCardChosenIndex(creditCardChosen, creditCards)
  );

  useEffect(() => {
    setCreditCardIndex(getCreditCardChosenIndex(creditCardChosen, creditCards));
  }, [creditCardChosen, creditCards]);

  useEffect(() => {
    //Initial choice for credit card
    dispatch(choseCreditCard(creditCards[creditCardIndex]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paginate = (newDirection: number) => {
    dispatch(choseCreditCard(creditCards[creditCardIndex + newDirection]));
  };
  return (
    <>
      {getCreditCardsStatus === "error" ? (
        <Text colorScheme="red">Błąd podczas pobierania kart kredytowych</Text>
      ) : (
        <Skeleton isLoaded={getCreditCardsStatus === "success"}>
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
            <Cards
              key={creditCards[creditCardIndex]?.id || ""}
              cvc={creditCards[creditCardIndex]?.cvc || ""}
              expiry={creditCards[creditCardIndex]?.expiry || ""}
              name={creditCards[creditCardIndex]?.name || ""}
              number={creditCards[creditCardIndex]?.number || ""}
            />
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
        </Skeleton>
      )}
    </>
  );
};

export default CreditCardChooser;
