'use client'

import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Skeleton} from '@/app/components'

const AssigneeSelect = () => {
    const { data:users , error , isLoading } =useQuery<User[]>({         // The error and isLoading are provided by tanstack Just like we do manually in useState and try catch
        queryKey: ['users'],
        queryFn: ()=> axios.get('/api/users').then(res=>res.data),
        staleTime: 60 * 1000,  // The list of data will be treated as fresh for 60 seconds( Won't get re featched for 60 seconds)
        retry: 3  // If the fetch failed, react will retry the fetch up to 3 additional times( 4 total)
    })

    if(isLoading) return <Skeleton/>
    if(error) return null;
    
  return (
    <Select.Root>
        <Select.Trigger placeholder='Assign...'/>
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                {users?.map(user=> 
                (<Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)
                )}
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect