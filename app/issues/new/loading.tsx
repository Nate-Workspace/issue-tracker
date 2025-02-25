import { Box } from '@radix-ui/themes'
import React from 'react'
import {Skeleton}  from '@/app/components'

const LoadingForNew = () => {
  return (
    <Box>
        <Skeleton/>
        <Skeleton height="20rem" />
    </Box>
  )
}

export default LoadingForNew