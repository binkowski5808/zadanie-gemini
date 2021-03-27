import { Button } from "@chakra-ui/button";
import { Divider, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBasketProducts,
  selectNumberOfProductsInBasket,
  selectTotalCostOfProducts,
} from "../basket/basketSlice";
import { nextStep } from "./checkoutSlice";

const BasketSummaryStep = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectBasketProducts);
  const numberOfProducts = useSelector(selectNumberOfProductsInBasket);
  const totalCostOfProducts = useSelector(selectTotalCostOfProducts);

  return (
    <Flex flexDir="column" p={3} borderRadius="md" shadow="md">
      <Divider mt={2} />
      {numberOfProducts > 0 ? (
        products.map((product) => (
          <React.Fragment key={product.id}>
            <Flex justifyContent="space-between" p={5} my={5}>
              <Text>{product.name}</Text>
              <Text>{product.price} PLN</Text>
            </Flex>
            <Divider />
          </React.Fragment>
        ))
      ) : (
        <Flex justifyContent="center" mt={5}>
          <Text>Brak wybranych produktów</Text>
        </Flex>
      )}
      {totalCostOfProducts > 0 && (
        <Flex justifyContent="flex-end" mt={3}>
          <Text>W sumie: {totalCostOfProducts} PLN</Text>
        </Flex>
      )}
      <Flex flexDir="column" align="center" mt={5}>
        <Button
          isDisabled={numberOfProducts === 0}
          onClick={() => dispatch(nextStep())}
        >
          Przejdź do płatności
        </Button>
      </Flex>
    </Flex>
  );
};

export default BasketSummaryStep;
