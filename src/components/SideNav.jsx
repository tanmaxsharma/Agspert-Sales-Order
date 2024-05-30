import React from 'react';
import {
  Drawer,
  DrawerBody,

  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  VStack,
  HStack,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { HamburgerIcon } from '@chakra-ui/icons';
const SideNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} bg={'brand.500'} onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader textAlign={'center'} fontWeight={'bold'}>
            AgSpert Technologies
          </DrawerHeader>

          <DrawerBody>
            <VStack>
              <HStack>
                <Link onClick={onClose} to={'/'}>
                  {' '}
                  <Button variant={'ghost'} width={'10rem'} gap={'10px'}>
                    {' '}
                    <FaHome /> Home
                  </Button>
                </Link>
              </HStack>
              <HStack>
                <Link onClick={onClose} to={'/about'}>
                  <Button variant={'ghost'} width={'10rem'} gap={'10px'}>
                    <FaUser />
                    About
                  </Button>
                </Link>
              </HStack>
              <HStack>
                <Link onClick={onClose} to={'/salesorder'}>
                  <Button variant={'ghost'} width={'10rem'} gap={'10px'}>
                    <FaUser />
                  Sales Order
                  </Button>
                </Link>
              </HStack>
            </VStack>
          </DrawerBody>

          
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideNav;
