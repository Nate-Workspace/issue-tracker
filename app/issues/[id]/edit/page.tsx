import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import IssueEditClient from './IssueEditClient'; // ✅ Import the new client component

const IssueEditPage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!issue) notFound();

  return <IssueEditClient issue={issue} />; // ✅ Pass data to the client component
};

export default IssueEditPage;
