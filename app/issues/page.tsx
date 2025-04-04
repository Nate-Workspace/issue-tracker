import { prisma } from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

// Update Props to include searchParams as a Promise
interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage: React.FC<Props> = async ({ searchParams }) => {
  // Await the searchParams to get the actual values
  const awaitedSearchParams = await searchParams;

  // Validating the query:
  const { status, orderBy, page } = awaitedSearchParams;

  // Creating a columns array to map for the headers of the table
  // (Assuming columnNames is already defined in IssueTable)

  // Checking if status and orderBy are valid or not----------
  const statuses = Object.values(Status); // Gives all the possible values of "Status"

  const validStatus = statuses.includes(status) ? status : undefined; // Undefined means: "no filtering using this parameter"
  
  const where = validStatus ? { status: validStatus } : {};

  const validOrderBy = columnNames.includes(orderBy) ? { [orderBy]: "asc" } : undefined; // If undefined, prisma won't consider it for filtering

  const validPage = parseInt(page, 10) || 1;
  const pageSize = 10;

  // Fetching the issues and getting the status query---------
  const issues = await prisma.issue.findMany({
    where,
    orderBy: validOrderBy,
    skip: (validPage - 1) * pageSize,
    take: pageSize,
  });

  // Getting the number of issues---
  const issueCount = await prisma.issue.count({
    where,
  });

  return (
    <Flex direction="column" gap="5">
      <IssueActions />
      <IssueTable searchParams={awaitedSearchParams} issues={issues} />
      <Pagination currentPage={validPage} pageSize={pageSize} itemCount={issueCount} />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "Viewing all the lists of issues in the site supported with sorting, pagination, and filtering",
};

export default IssuesPage;