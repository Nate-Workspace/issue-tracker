import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "../components";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string; // All search params are of type string
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  // Validating the query:
  const awaitedSearchParams = await searchParams;
  console.log(awaitedSearchParams);

  // Creating a columns array to map for the headers of the table
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created at",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  //Checking if status and orderBy are valid or not----------
  const statuses = Object.values(Status); // Gives all the possible values of "Status"

  const status = statuses.includes(awaitedSearchParams.status)
    ? awaitedSearchParams.status
    : undefined; //Undefined means: "no filtering using this parameter"
  
  const where= { status }   // or we can say status: status 
  

  const orderBy = columns.some(
    (column) => column.value === awaitedSearchParams.orderBy
  )
    ? { [awaitedSearchParams.orderBy]: "asc" }
    : undefined;


    const page= parseInt(awaitedSearchParams.page) || 1;
    const pageSize= 10;
  // Fetching the issues and getting the status query---------
  const issues = await prisma.issue.findMany({
    where,   // where: where,
    orderBy,
    skip: (page-1) * pageSize,
    take: pageSize,
  });

  //Getting the number of issues---
  const issueCount = await prisma.issue.count({
    where,
  })

  return (
    <div>
      <IssueActions />
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
                    query: { ...awaitedSearchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === awaitedSearchParams.orderBy && (
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
      <Pagination currentPage={page} pageSize={pageSize} itemCount={issueCount}/>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
