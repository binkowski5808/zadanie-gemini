import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Divider,
} from "@chakra-ui/react";
import React from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose(): void;
  headerText: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  headerText,
  children,
}) => {
  return (
    <ChakraDrawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{headerText}</DrawerHeader>
          <Divider />
          <DrawerBody p={2} d="flex">
            {children}
          </DrawerBody>
          <DrawerFooter p={{ base: 0, sm: 3 }}>
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}
              colorScheme="red"
            >
              Anuluj
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </ChakraDrawer>
  );
};

export default Drawer;
