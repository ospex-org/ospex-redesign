import { Spinner, Progress, Skeleton, Box, Stack } from '@chakra-ui/react'

export const SpinnerLoader = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="200px">
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      size="xl"
    />
  </Box>
)

export const ProgressBar = () => (
  <Progress size="xs" isIndeterminate />
)

export const TableSkeleton = () => (
  <Box pt={2} boxShadow='lg'>
    <Stack>
      <Skeleton height='45px' width="100%" startColor='gray.700' endColor='gray.900' fadeDuration={2} mb={2} />
      <Skeleton height='45px' width="100%" startColor='gray.700' endColor='gray.900' fadeDuration={2} mb={2} />
      <Skeleton height='45px' width="100%" startColor='gray.700' endColor='gray.900' fadeDuration={2} mb={2} />
    </Stack>
  </Box>
)