'use client'; // ✅ This must be a client component

// import IssueForm from '../../_components/IssueForm';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from '../../_components/IssueFormSkeleton';

const IssueForm= dynamic(()=>import('../../_components/IssueForm'), {ssr:false, loading: ()=> <IssueFormSkeleton/>} )

const IssueEditClient = ({ issue }: { issue: any }) => {
  return <IssueForm issue={issue} />;
};

export default IssueEditClient;
