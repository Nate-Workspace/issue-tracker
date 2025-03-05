import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueDetails from "./IssueDetails";
import IssueEditButton from "./IssueEditButton";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { Metadata } from "next";
import { title } from "process";
import { cache } from "react";

type Props = {
  params: { id: string };
};

// const fetchIssue= cache((issueId: number)=> prisma.issue.findUnique({where: {id: issueId}}))

const IssueDetailsPage = async ({ params }: Props) => {
  // const { id } = await Promise.resolve(params);
  // if(typeof id!== 'string') notFound()

  //Checking if there is a logged in user----------------
  // const session = await fetchIssue(parseInt(params.id));
  const session = await prisma.issue.findUnique({where: {id: parseInt(params.id)}});

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue}/>
            <IssueEditButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

// generating a dynamic metadata-------
export async function generateMetadata({params}: Props){
  // const issue= await fetchIssue(parseInt(params.id))
  
  const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}});

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id
  }
}

export default IssueDetailsPage;
