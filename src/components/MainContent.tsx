'use client'

import { Box, Heading, Text, Flex, Switch, FormControl, FormLabel } from '@chakra-ui/react'
import ContestList from './ContestList'
import { useState } from 'react'

const MainContent = () => {
  const [pickersEnabled, setPickersEnabled] = useState(false);

  return (
    <Box maxWidth="1400px" margin="0 auto" padding="1rem" width="calc(100% - 15px)">
      <Box mb={4} pt={4}>
        {/* <Heading as="h1" size="xl" mb={4} color="white">
          Commission-Free Sports Betting using Parimutuel Pools 000
        </Heading> */}
        <Text fontSize="4xl" fontWeight="bold" color="white" mb={4}>
          Commission-Free Sports Betting using Parimutuel Pools
        </Text>
        <Flex justifyContent="space-between" alignItems="center">
          <Text color="gray.300" flex="1">
            Connect with your crypto wallet: no sign-up, no vig, 100 USDC bet limits to be removed post contract-audit.
          </Text>
          <FormControl display="flex" alignItems="center" width="auto" ml={4}>
            {/* Selectors to be utilized in version 2 */}
            {/* <FormLabel htmlFor="pickers-toggle" mb="0" color="gray.300" mr={2}>
              Show Selectors
            </FormLabel>
            <Switch
              id="pickers-toggle"
              isChecked={pickersEnabled}
              onChange={(e) => setPickersEnabled(e.target.checked)}
              sx={{
                '& .chakra-switch__track[data-checked]': {
                  backgroundColor: 'gray.500',
                  // boxShadow: '0 0 5px 2px rgba(160, 174, 192, 0.5)',
                },
                '& .chakra-switch__thumb[data-checked]': {
                  backgroundColor: 'white',
                },
              }}
            /> */}
          </FormControl>
        </Flex>
      </Box>
      <ContestList pickersEnabled={pickersEnabled} />
    </Box>
  )
}

export default MainContent
