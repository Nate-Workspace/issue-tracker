import { prisma } from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import { ReactNode } from "react";

const IssuesPage = async () => {
  const issues= await prisma.issue.findMany()
  return (
    <div>
      <div className="mb-5">
      <Button>
        <Link href="/issues/new">Add an issue</Link>
      </Button>
      </div>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created At</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue=>(
          <Table.Row key={issue.id}>
            <Table.Cell>{issue.title}
              <div className="block md:hidden">{issue.status}</div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">{issue.status}</Table.Cell>
            <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
