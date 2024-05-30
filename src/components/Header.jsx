import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import SideNav from './SideNav';
import { HStack, Button, WrapItem, Avatar } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { MdDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AlertBox } from './AlertBox';
import {logout} from "../utils/auth"
const Header = () => {
  return (
    <>
      <HStack
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        padding={'1rem'}
        position={'relative'}
        zIndex={'100'}
      >
        <SideNav />

        <HStack>
          <Link to={'/dashboard'}>
            {' '}
            <Button variant="outline" mr={3} gap={'10px'}>
              <MdDashboard /> DashBoard
            </Button>
          </Link>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton isActive={isOpen} rightIcon={<ChevronDownIcon />}>
                  <WrapItem>
                    <Avatar
                      name="Albert Einstein"
                      src="https://bit.ly/dan-abramov"
                    />
                  </WrapItem>
                </MenuButton>
                <MenuList>
                <Link to={'/profile'}>
                    {' '}
                    <MenuItem> Profile</MenuItem>
                  </Link>

                  <Link to={'/logout'} onClick={logout}>
                    {' '}
                    <MenuItem> <AlertBox title="Log Out" funcName="Log Out" btnTitle='Yes'/></MenuItem>
                  </Link>
                </MenuList>
              </>
            )}
          </Menu>

          <ColorModeSwitcher />
        </HStack>
      </HStack>
    </>
  );
};

export default Header;
