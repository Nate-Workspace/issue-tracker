import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import IssueEditClient from './IssueEditClient';

// Define the correct type for the page props
interface PageProps {
  params: Promise<{ id: string }>;
}

const IssueEditPage: React.FC<PageProps> = async ({ params }) => {
  // Await the params to get the actual values
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id, 10) } // Ensure id is parsed correctly
  });

  if (!issue) notFound();

  return <IssueEditClient issue={issue} />;
};

export default IssueEditPage;