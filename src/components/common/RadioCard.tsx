import { Box, useRadio, UseRadioProps, VStack } from '@chakra-ui/react'
import React from 'react'

interface RadioCardProps extends UseRadioProps {
  label: string
  description?: string
}

export const RadioCard = (props: RadioCardProps) => {
  const { getInputProps, getRadioProps, state } = useRadio(props)
  const input = getInputProps()
  const checkbox = getRadioProps()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent default radio behavior
    console.log('Radio clicked:', props.value)
    console.log('Current state:', state.isChecked)
    
    if (state.isChecked) {
      console.log('Unchecking...')
      props.onChange?.({ target: { value: '' } } as any)
    } else {
      console.log('Checking...')
      props.onChange?.({ target: { value: props.value } } as any)
    }
  }

  const getButtonColor = (value: string) => {
    // For spread and moneyline, use team colors
    if (value.includes('away') || value === 'total_over') {
      return '#4ECDC4'  // turquoise for away team and over
    }
    return '#FF6B6B'    // pink for home team and under
  }

  return (
    <Box 
      as="label" 
      width="100%" 
      onClick={handleClick}
      position="relative"
      transition="all 0.2s"
    >
      <input {...input} style={{ display: 'none' }} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderColor="gray.700"
        borderRadius="md"
        bg="black"
        px={2.5}
        py={1.5}
        minWidth="220px"
        minHeight="52px"
        display="flex"
        alignItems="center"
        transition="all 0.2s"
        _hover={{
          borderColor: props.value === 'away' ? '#4ECDC4' : '#FF6B6B',
          boxShadow: `0 0 0 1px ${props.value === 'away' ? '#4ECDC4' : '#FF6B6B'}`
        }}
        _checked={{
          borderColor: props.value === 'away' ? '#4ECDC4' : '#FF6B6B',
          boxShadow: `0 0 0 2px ${props.value === 'away' ? '#4ECDC4' : '#FF6B6B'}`
        }}
      >
        <VStack 
          align="flex-start" 
          spacing={0}
          width="100%"
          overflow="hidden"
          margin="0"
        >
          <Box 
            fontWeight="bold"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            width="100%"
          >
            {props.label}
          </Box>
          {props.description && (
            <Box 
              fontSize="sm" 
              color="gray.500"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              width="100%"
            >
              {props.description}
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  )
} 