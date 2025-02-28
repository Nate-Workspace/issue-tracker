import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge,Link } from "../components";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props{
  searchParams : {status: Status, orderBy: keyof Issue}
}

const IssuesPage = async ({searchParams}: Props) => {
  // Validating the query:
  const awaitedSearchParams= await searchParams;

  const statuses= Object.values(Status)           // Gives all the possible values of "Status"
  const status= statuses.includes(awaitedSearchParams.status) ? awaitedSearchParams.status : undefined;
  // Getting the status query
  const issues= await prisma.issue.findMany({
    where:{
      status  // or we can say status: status        // If we send undefined to prisma, it will not use that status as part of filtering
    }
  }) // issue is the table name

  // Creating a columns array to map for the headers of the table
  const columns: {label: string, value: keyof Issue, className?: string}[]=[
    {label: "Issue", value: "title"},
    {label: "Status", value: "status", className: "hidden md:table-cell" },
    {label: "Created at", value: "createdAt", className: "hidden md:table-cell"},
  ]
  return (
    <div>
      <IssueActions/>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(column=>(
              <Table.ColumnHeaderCell key={column.value} className={column?.className}><NextLink href={{
                query: {...awaitedSearchParams, orderBy: column.value}
              }}>{column.label}</NextLink>
              {column.value === awaitedSearchParams.orderBy && <ArrowUpIcon className="inline"/>}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue=>(
          <Table.Row key={issue.id}>
            <Table.Cell><Link href={`issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden"><IssueStatusBadge status={issue.status}/></div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell"><IssueStatusBadge status={issue.status}/></Table.Cell>
            <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic= 'force-dynamic';

export default IssuesPage;
