import { IconButton } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Flex, Heading, Link, Spacer } from "@chakra-ui/layout";
import React from "react";
import Basket from "../features/basket/Basket";

const Header = () => {
  const { toggleColorMode } = useColorMode();
  const colorModeIcon = useColorModeValue(<MoonIcon />, <SunIcon />);

  return (
    <Flex as="header" flex="1 1 auto" padding={7}>
      <Heading mr={8}>ZADANIE</Heading>
      <Flex as="nav" align="center" sx={{ gap: "1rem" }}>
        <Link>Kategorie</Link>
        <Link>Coś</Link>
        <Link>Coś</Link>
      </Flex>
      <Spacer />
      <IconButton
        size="lg"
        mr={4}
        aria-label="Zmiana trybu kolorów"
        icon={colorModeIcon}
        onClick={toggleColorMode}
      />
      <Basket />
    </Flex>
  );
};

export default Header;
