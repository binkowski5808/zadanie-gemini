import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Card, { Focused } from "react-credit-cards";
import { addCreditCard, selectAddCreditCardsStatus } from "./creditCardsSlice";
import { CreditCard } from "../../sagas/requests/creditCardsRequests";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Payment from "payment";
import { Flex } from "@chakra-ui/layout";
import { AnimatePresence, motion } from "framer-motion";

interface CreditCardFormProps {
  submitCallback(): void;
}

const schema = yup.object().shape({
  number: yup
    .string()
    .test("isValidNumber", "Numer kart jest niepoprawny", (value, context) =>
      value ? Payment.fns.validateCardNumber(value) : false
    )
    .required("Numer karty jest wymagany"),
  name: yup
    .string()
    .min(5, "Nazwisko musi mieć przynajmniej 5 znaków")
    .required("Nazwisko na karcie jest wymagane"),
  expiry: yup
    .string()
    .test("isValidExpiry", "Data ważności jest niepoprawna", (value, context) =>
      value ? Payment.fns.validateCardExpiry(value) : false
    )
    .required("Data wygaśnięcia jest wymagana"),
  cvc: yup
    .string()
    .test("isValidCVC", "Numer CVC jest niepoprawny", (value, context) =>
      value ? Payment.fns.validateCardCVC(value) : false
    )
    .required("Numer CVC jest wymagany"),
});

const CreditCardForm: React.FC<CreditCardFormProps> = ({ submitCallback }) => {
  const dispatch = useDispatch();
  const addCreditCardStatus = useSelector(selectAddCreditCardsStatus);
  const [fieldFocused, setFieldFocused] = useState<Focused | undefined>(
    undefined
  );
  const {
    handleSubmit,
    errors,
    register,
    watch,
    formState,
  } = useForm<CreditCard>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    addCreditCardStatus === "success" && submitCallback();
  }, [addCreditCardStatus, submitCallback]);

  //This is function from React-Hook-Forms which makes it possible to getValues from inputs. The cost is that it makes react re-render every time you type sth
  const watchAllFields = watch();

  const onSubmit = (data: CreditCard) => {
    dispatch(addCreditCard(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "4px",
      }}
    >
      <Flex
        align="center"
        flexDir={{ base: "column", md: "row" }}
        sx={{ gap: "1rem" }}
        flex="1 1 50%"
      >
        <Card
          number={watchAllFields.number || ""}
          name={watchAllFields.name || ""}
          expiry={watchAllFields.expiry || ""}
          cvc={watchAllFields.cvc || ""}
          focused={fieldFocused}
        />
        <Flex flexDir="column">
          <FormControl
            isInvalid={!!errors?.number?.message}
            errortext={errors?.number?.message}
            p={1}
            isRequired
          >
            <FormLabel htmlFor="frmCCNum">Numer karty</FormLabel>
            <Input
              onFocus={() => setFieldFocused("number")}
              id="frmCCNum"
              name="number"
              type="text"
              placeholder="Numer Karty"
              ref={register}
              autocomplete="cc-number"
            />
            <FormHelperText mt={1}>
              5500 0000 0000 0004 - ten poprawny
            </FormHelperText>
            <FormErrorMessage mt={1}>
              {errors?.number?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!errors?.name?.message}
            errortext={errors?.name?.message}
            p={1}
            isRequired
          >
            <FormLabel htmlFor="frmCCNum">Nazwisko na karcie</FormLabel>
            <Input
              onFocus={() => setFieldFocused("name")}
              name="name"
              id="frmCCNum"
              type="text"
              placeholder="Name"
              ref={register}
              autocomplete="cc-name"
            />
            <FormErrorMessage mt={1}>{errors?.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!errors?.expiry?.message}
            errortext={errors?.expiry?.message}
            p={1}
            isRequired
          >
            <FormLabel for="frmCCExp">Wygaśnięcie karty</FormLabel>
            <Input
              onFocus={() => setFieldFocused("expiry")}
              name="expiry"
              id="frmCCExp"
              ref={register}
              type="text"
              placeholder="Valid Thru"
              autocomplete="cc-exp"
            />
            <FormErrorMessage mt={1}>
              {errors?.expiry?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!errors?.cvc?.message}
            errortext={errors?.cvc?.message}
            p={1}
            isRequired
          >
            <FormLabel for="frmCCCVC">Numer CVC</FormLabel>
            <Input
              onFocus={() => setFieldFocused("cvc")}
              id="frmCCCVC"
              name="cvc"
              ref={register}
              component="input"
              placeholder="CVC"
              autocomplete="cc-csc"
            />
            <FormErrorMessage mt={1}>{errors?.cvc?.message}</FormErrorMessage>
          </FormControl>
        </Flex>
      </Flex>
      <Button
        flex="1 1 auto"
        width="max-content"
        type="submit"
        isLoading={formState.isSubmitting || addCreditCardStatus === "loading"}
      >
        Dodaj kartę
      </Button>
    </form>
  );
};

export default CreditCardForm;
