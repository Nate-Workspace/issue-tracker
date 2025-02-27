'use client'

import {QueryClient, QueryClientProvider as ReactQCP} from '@tanstack/react-query'
import { PropsWithChildren } from 'react'


const queryClient= new QueryClient()     //THIS contains a catch for storing data wer get from the backend

const QueryClientProvider = ({children}: PropsWithChildren ) => {
  return (
    <ReactQCP client={queryClient}>{children}</ReactQCP>
  )
}

export default QueryClientProvider