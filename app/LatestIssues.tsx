import { prisma } from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge } from "./components";
import Link from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    // eager loading
    include:{
        assignedToUser: true
    }
    //-----
  });

  return (
    <Card>
        <Heading mb='2' mt='1' size='4'>Latest Cards</Heading>
    <Table.Root>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
                <Flex justify='between'>
                <Flex direction='column' align='start' gap='2'>   {/* By default align is set to stretch for column */}
                    <Link href={`/issue/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status}/>
                </Flex>
                {issue.assignedToUser && <Avatar src={issue.assignedToUser.image!} fallback="?" size="2"  radius="full"/>}
                </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
    </Card>
  );
};

export default LatestIssues;
