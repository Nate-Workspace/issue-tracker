import { prisma } from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  // Validating the query:
  const awaitedSearchParams = await searchParams;
  console.log(awaitedSearchParams);

  // Creating a columns array to map for the headers of the table
  

  //Checking if status and orderBy are valid or not----------
  const statuses = Object.values(Status); // Gives all the possible values of "Status"

  const status = statuses.includes(awaitedSearchParams.status)
    ? awaitedSearchParams.status
    : undefined; //Undefined means: "no filtering using this parameter"
  
  const where= { status }   // or we can say status: status 
  

  const orderBy = columnNames.includes(searchParams.orderBy)
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
    <Flex direction="column" gap='5'>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues}/>
      <Pagination currentPage={page} pageSize={pageSize} itemCount={issueCount}/>
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
