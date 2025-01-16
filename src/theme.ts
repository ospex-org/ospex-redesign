import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'white',
      }
    }
  },
  components: {
    Table: {
      baseStyle: {
        th: {
          borderColor: 'gray.800',
        },
        td: {
          borderColor: 'gray.800',
        }
      }
    },
    Badge: {
      baseStyle: {
        bg: 'gray.800',
      }
    },
    NumberInput: {
      baseStyle: {
        stepper: {
          color: 'gray.400',
          _hover: {
            color: 'white'
          }
        }
      }
    }
  }
})

export default theme