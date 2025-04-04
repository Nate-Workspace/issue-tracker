import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table, Text } from '@radix-ui/themes'
import NextLink from "next/link";          // it's better if you import it as nextlink
import React from 'react'
import { IssueStatusBadge, Link } from '../components'
import { Issue, Status } from '@prisma/client';

export interface IssueQuery {
    status: Status;
    orderBy: keyof Issue;
    page: string; // All search params are of type string
}

interface Props {
  searchParams: IssueQuery,
  issues: Issue[]
}

const IssueTable = async ({searchParams, issues}: Props) => {
    

      const awaitedParams= await searchParams;

      if(issues.length === 0) return <p className='mt-2 m-auto'> No issues available</p>
  return (
    <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { ...awaitedParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === awaitedParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
  )
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created at",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

export const columnNames= columns.map(column=> column.value)
export default IssueTable