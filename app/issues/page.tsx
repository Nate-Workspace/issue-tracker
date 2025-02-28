import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge,Link } from "../components";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";

interface Props{
  searchParams : {status: Status}
}

const IssuesPage = async ({searchParams}: Props) => {
  // Validating the query:
  const awaitedSearchParams= await searchParams;

  const statuses= Object.values(Status)           // Gives all the possible values of "Status"
  console.log(statuses)
  const status= statuses.includes(awaitedSearchParams.status) ? awaitedSearchParams.status : undefined;
  // Getting the status query
  const issues= await prisma.issue.findMany({
    where:{
      status  // or we can say status: status        // If we send undefined to prisma, it will not use that status as part of filtering
    }
  }) // issue is the table name
  return (
    <div>
      <IssueActions/>
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
