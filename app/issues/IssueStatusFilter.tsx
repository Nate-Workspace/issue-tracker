"use client"

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'


const statuses: {label: string, value?: Status}[]=[      //The type shows "An array of objects"
    {label: "All"},
    {label:'Open', value: 'OPEN'},
    {label: "In Progress", value:"IN_PROGRESS"},
    {label: "Closed", value:"CLOSED"}
]



const IssueStatusFilter = () => {
    const router= useRouter()

  return (
    <Select.Root onValueChange={(status)=>{
        const query= status=== "ALL" ? "" : `?status=${status}`  ;
        router.push(`/issues${query}`)
    }}>
        <Select.Trigger placeholder='Filter by status...' />
        <Select.Content>
            {statuses.map((status, index)=> (
                <Select.Item key={index} value={status.value || "ALL"}>
                    {status.label}
                </Select.Item>
            ))}
        </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter