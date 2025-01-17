'use client'

import { 
  Flex, 
  Input, 
  Button, 
  Text, 
  InputGroup, 
  InputLeftElement, 
  Icon, 
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Show,
  Hide
} from '@chakra-ui/react'
import PreloadLink from '../common/PreloadLink'
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons'
import { FaUsers, FaGamepad, FaTrophy } from 'react-icons/fa'

const Header = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      width="100%"
      borderBottom="1px solid"
      borderColor="gray.600"
      bg="black"
    >
      <Flex align="center" flex="1">
        <PreloadLink href="/" props={{}}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            mr={8}
            color="white"
            cursor="pointer"
            _hover={{ color: 'gray.300' }}
          >
            ospex.org
          </Text>
        </PreloadLink>

        <Hide below="420px">
          <InputGroup maxWidth="600px" width="100%" mr={8}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search"
              size="md"
              bg="gray.800"
              borderColor="gray.600"
              _hover={{ borderColor: 'gray.500' }}
              _focus={{ borderColor: 'gray.400', boxShadow: '0 0 0 1px gray.400' }}
            />
          </InputGroup>
        </Hide>
      </Flex>

      {/* Desktop Navigation */}
      <Hide below="650px">
        <Flex align="center">
          <PreloadLink href="/u" props={{}}>
            <Flex 
              flexDirection="column" 
              alignItems="center" 
              mr={6}
              cursor="pointer"
              _hover={{ '& > *': { color: 'white' } }}
            >
              <Icon
                as={FaUsers}
                w={6}
                h={6}
                color="gray.400"
              />
              <Text 
                fontSize="xs" 
                color="gray.400" 
                mt={1}
              >
                Users
              </Text>
            </Flex>
          </PreloadLink>

          <PreloadLink href="/l" props={{}}>
            <Flex 
              flexDirection="column" 
              alignItems="center" 
              mr={6}
              cursor="pointer"
              _hover={{ '& > *': { color: 'white' } }}
            >
              <Icon
                as={FaTrophy}
                w={6}
                h={6}
                color="gray.400"
              />
              <Text 
                fontSize="xs" 
                color="gray.400" 
                mt={1}
              >
                Leaderboards
              </Text>
            </Flex>
          </PreloadLink>

          <PreloadLink href="/create" props={{}}>
            <Flex 
              flexDirection="column" 
              alignItems="center" 
              mr={6}
              cursor="pointer"
              _hover={{ '& > *': { color: 'white' } }}
            >
              <Icon
                as={FaGamepad}
                w={6}
                h={6}
                color="gray.400"
              />
              <Text 
                fontSize="xs" 
                color="gray.400" 
                mt={1}
              >
                Create
              </Text>
            </Flex>
          </PreloadLink>

          <Button
            bg="gray.700"
            color="white"
            _hover={{ bg: 'gray.600' }}
            _active={{ bg: 'gray.500' }}
            ml={4}
            letterSpacing="0.05em"
          >
            Connect
          </Button>
        </Flex>
      </Hide>

      {/* Mobile Navigation */}
      <Show below="650px">
        <Flex align="center">
          <Button
            bg="gray.700"
            color="white"
            _hover={{ bg: 'gray.600' }}
            _active={{ bg: 'gray.500' }}
            mr={4}
            letterSpacing="0.05em"
            size="sm"
          >
            Connect
          </Button>

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              color="gray.400"
              size="sm"
              _hover={{ color: 'white', borderColor: 'white' }}
            />
            <MenuList bg="gray.800" borderColor="gray.600">
              <MenuItem 
                as={PreloadLink} 
                href="/u" 
                props={{}}
                icon={<FaUsers />}
                _hover={{ bg: 'gray.700' }}
              >
                Users
              </MenuItem>
              <MenuItem 
                as={PreloadLink} 
                href="/l" 
                props={{}}
                icon={<FaTrophy />}
                _hover={{ bg: 'gray.700' }}
              >
                Leaderboards
              </MenuItem>
              <MenuItem 
                as={PreloadLink} 
                href="/create" 
                props={{}}
                icon={<FaGamepad />}
                _hover={{ bg: 'gray.700' }}
              >
                Create
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Show>
    </Flex>
  )
}

export default Header
