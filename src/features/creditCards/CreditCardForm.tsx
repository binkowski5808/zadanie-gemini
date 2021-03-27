import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "react-credit-cards";
import { addCreditCard } from "./creditCardsSlice";
import { CreditCard } from "../../sagas/requests/creditCardsRequests";
import { useDispatch } from "react-redux";
import * as yup from "yup";

interface CreditCardFormProps {
  submitCallback(): void;
}

const schema = yup.object().shape({
  number: yup.string().required("Numer karty jest wymagany"),
  name: yup.string().min(8).required("Nazwisko na karcie jest wymagane"),
  expiry: yup.string().required("Data wygaśnięcia jest wymagana"),
  cvc: yup.string().required("Numer CVC jest wymagany"),
});

const CreditCardForm: React.FC<CreditCardFormProps> = () => {
  const dispatch = useDispatch();
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

  //This is function from React-Hook-Forms which makes it possible to getValues from inputs. The cost is that it makes react re-render every time you type sth
  const watchAllFields = watch();

  const onSubmit = (data: CreditCard) => {
    dispatch(addCreditCard(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card
        number={watchAllFields.number || ""}
        name={watchAllFields.name || ""}
        expiry={watchAllFields.expiry || ""}
        cvc={watchAllFields.cvc || ""}
      />
      <FormControl
        isInvalid={!!errors?.number?.message}
        errortext={errors?.number?.message}
        p="4"
        isRequired
      >
        <FormLabel htmlFor="frmCCNum">Numer karty</FormLabel>
        <Input
          id="frmCCNum"
          name="number"
          type="text"
          placeholder="Numer Karty"
          ref={register}
          autocomplete="cc-number"
        />
        <FormErrorMessage>{errors?.number?.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={!!errors?.name?.message}
        errortext={errors?.name?.message}
        p="4"
        isRequired
      >
        <FormLabel htmlFor="frmCCNum">Nazwisko na karcie</FormLabel>
        <Input
          name="name"
          id="frmCCNum"
          type="text"
          placeholder="Name"
          ref={register}
          autocomplete="cc-name"
        />
        <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={!!errors?.expiry?.message}
        errortext={errors?.expiry?.message}
        p="4"
        isRequired
      >
        <FormLabel for="frmCCExp">Wygaśnięcie karty</FormLabel>
        <Input
          name="expiry"
          id="frmCCExp"
          ref={register}
          type="text"
          pattern="\d\d/\d\d"
          placeholder="Valid Thru"
          autocomplete="cc-exp"
        />
        <FormErrorMessage>{errors?.expiry?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={!!errors?.cvc?.message}
        errortext={errors?.cvc?.message}
        p="4"
        isRequired
      >
        <FormLabel for="frmCCCVC">Numer CVC</FormLabel>
        <Input
          id="frmCCCVC"
          name="cvc"
          ref={register}
          component="input"
          pattern="\d{3,4}"
          placeholder="CVC"
          autocomplete="cc-csc"
        />
        <FormErrorMessage>{errors?.cvc?.message}</FormErrorMessage>
      </FormControl>
      <div className="buttons">
        <Button type="submit" isLoading={formState.isSubmitting}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreditCardForm;
