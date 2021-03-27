import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import Header from "./ui/Header";

function App() {
  return (
    <Flex h="100vh" flexDir="column">
      <Header />
      <Flex
        as="main"
        flex="1 1 100%"
        justify="center"
        align="center"
        flexDir="column"
      >
        <img src={logo} className="App-logo" alt="logo" />
        <Button>Dodaj do koszyka</Button>
      </Flex>
      <Flex as="footer" flex="1 1 auto" justify="center">
        <Text>Zadanie rekrutacyjne Gemini Design 2021</Text>
      </Flex>
    </Flex>
  );
}

export default App;
