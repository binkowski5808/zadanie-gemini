import { IconButton } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Flex, Heading, Link, Spacer } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { motion } from "framer-motion";
import React from "react";
import Basket from "../features/basket/Basket";

const MotionIconButton = motion(IconButton);

const Header = () => {
  const { toggleColorMode } = useColorMode();
  const colorModeIcon = useColorModeValue(<MoonIcon />, <SunIcon />);

  const [isLargerThan767] = useMediaQuery("(min-width: 767px)");

  return (
    <Flex
      as="header"
      flex="1 1 auto"
      padding={{ base: 2, md: 7 }}
      align="center"
    >
      <Heading
        mr={{ base: 3, md: 8 }}
        fontSize={{ base: "x-large", md: "xxx-large" }}
      >
        ZADANIE
      </Heading>
      {!isLargerThan767 ? (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Menu"
            icon={<HamburgerIcon />}
            size="xs"
            variant="outline"
          />
          <MenuList>
            <MenuItem>Kategorie</MenuItem>
            <MenuItem>coś</MenuItem>
            <MenuItem>Coś</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Flex as="nav" align="center" sx={{ gap: "1rem" }}>
          <Link>Kategorie</Link>
          <Link>Coś</Link>
          <Link>Coś</Link>
        </Flex>
      )}
      <Spacer />
      <MotionIconButton
        whileHover={{ scale: 1.2 }}
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
