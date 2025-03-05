import { prisma } from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

const statuses = {
  open: await prisma.issue.count({ where: { status: "OPEN" } }),
  closed: await prisma.issue.count({ where: { status: "CLOSED" } }),
  inProgress: await prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
};

export default async function Home() {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap='5'>
      <Flex direction="column" gap='5'>
        <IssueSummary
          open={statuses.open}
          closed={statuses.closed}
          inProgress={statuses.inProgress}
        />
        <IssueChart
          open={statuses.open}
          closed={statuses.closed}
          inProgress={statuses.inProgress}
        />
      </Flex>
      <LatestIssues/>
    </Grid>
  );
}
