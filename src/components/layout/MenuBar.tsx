'use client'

import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import PreloadLink from '../common/PreloadLink'
import { usePathname } from 'next/navigation'

const menuItems = [
  { name: 'All', count: 104 },
  { name: 'NFL', count: 16 },
  { name: 'NBA', count: 0 },
  { name: 'MLB', count: 12 },
  { name: 'NCF', count: 64 },
  { name: 'NHL', count: 0 },
  { name: 'Soccer', count: 6 },
  { name: 'WNBA', count: 6 }
]

const MenuBar = () => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const activeColor = useColorModeValue('white', 'white')

  return (
    <Box 
      as="nav" 
      borderBottom="1px solid" 
      borderColor="gray.600" 
      width="100%"
      bg="black"
      position="relative"
    >
      <Flex 
        align="center" 
        justify="flex-start" 
        wrap="wrap" 
        padding="0.5rem 1rem"
        maxWidth="1200px"
        margin="0 auto"
      >
        {menuItems.map((item) => (
          <PreloadLink 
            href="/" 
            key={item.name}
            props={{}}
          >
            <Text
              mr={4}
              cursor={item.count > 0 ? 'pointer' : 'default'}
              color={(isHomePage && item.name === 'All') || item.count > 0 ? "gray.300" : "gray.600"}
              position="relative"
              padding="0.2rem 0"
              pointerEvents={item.count > 0 ? 'auto' : 'none'}
              _hover={{
                color: (isHomePage && item.name === 'All') || item.count > 0 ? activeColor : 'gray.500',
                '@media screen and (min-width: 390px)': {
                  '&::before, &::after': (isHomePage && item.name === 'All') || item.count > 0 ? {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '1px',
                    backgroundColor: 'white',
                  } : {}
                }
              }}
              sx={{
                '@media screen and (min-width: 390px)': {
                  ...(isHomePage && item.name === 'All' ? {
                    '&::before, &::after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      height: '1px',
                      backgroundColor: 'white',
                    }
                  } : {}),
                },
                ...(isHomePage && item.name === 'All' ? {
                  color: activeColor,
                } : {})
              }}
              _before={{
                '@media screen and (min-width: 390px)': {
                  top: '-9px',
                }
              }}
              _after={{
                '@media screen and (min-width: 390px)': {
                  bottom: '-9px',
                }
              }}
              fontSize={{ base: "xs", md: "md" }}
              whiteSpace="nowrap"
            >
              {item.name}
            </Text>
          </PreloadLink>
        ))}
      </Flex>
    </Box>
  )
}

export default MenuBar