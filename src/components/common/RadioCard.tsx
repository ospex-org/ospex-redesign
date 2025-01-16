import { Box, useRadio, UseRadioProps, VStack } from '@chakra-ui/react'
import React from 'react'
import { getBetTypeColor } from '@/constants/teamColors'

interface RadioCardProps extends UseRadioProps {
  label: string
  description?: string
  teamColor?: string
  secondaryColor?: string
}

export const RadioCard = (props: RadioCardProps) => {
  const { getInputProps, getRadioProps, state } = useRadio(props)
  const input = getInputProps()
  const checkbox = getRadioProps()
  const [isHovered, setIsHovered] = React.useState(false)

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

  return (
    <Box 
      as="label" 
      width="100%" 
      onClick={handleClick}
      position="relative"
      transition="all 0.2s"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          borderColor: props.teamColor || getBetTypeColor(props.value as 'away' | 'home' | 'over' | 'under'),
          boxShadow: `0 0 0 1px ${props.teamColor || getBetTypeColor(props.value as 'away' | 'home' | 'over' | 'under')}`
        }}
        _checked={{
          borderColor: props.teamColor || getBetTypeColor(props.value as 'away' | 'home' | 'over' | 'under'),
          boxShadow: `0 0 0 2px ${props.teamColor || getBetTypeColor(props.value as 'away' | 'home' | 'over' | 'under')}`
        }}
      >
        <VStack 
          align="flex-start" 
          spacing={0}
          width="100%"
          overflow="hidden"
          margin="0"
          opacity={isHovered ? 1 :
            (!props.value ? 1 :
              state.isChecked ? 1 : 0.7)}
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