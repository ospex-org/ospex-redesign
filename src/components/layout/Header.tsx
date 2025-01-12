'use client'

import { Flex, Input, Button, Text, InputGroup, InputLeftElement, Icon, Box } from '@chakra-ui/react'
import PreloadLink from '../common/PreloadLink'
import { SearchIcon } from '@chakra-ui/icons'
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

        <InputGroup maxWidth="600px" width="100%">
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
      </Flex>

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
    </Flex>
  )
}

export default Header
