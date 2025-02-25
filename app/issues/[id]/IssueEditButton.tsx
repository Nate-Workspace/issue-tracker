import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssueEditButton = ({issueId}: {issueId: number}) => {
  return (
    <Button>
          <Pencil2Icon/>
          <Link href={`${issueId}/edit`}>
          Edit Issue
          </Link>
        </Button>
  )
}

export default IssueEditButton