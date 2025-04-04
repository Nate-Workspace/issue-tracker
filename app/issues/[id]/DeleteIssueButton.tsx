'use client'

import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router= useRouter()
    const [error, setError]= useState(false)
    const [isDeleting, setDeleting]= useState(false)

    const DeleteIssue= async ()=>{
        try {
            setDeleting(true)
            // throw new Error()
            await axios.delete(`/api/issues/${issueId}`)
            router.push('/issues')
            router.refresh()
        } catch (error) {
            setDeleting(false)
            console.error("Error occured while deleting")
            setError(true)
        }
    }
  return (
    <>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" disabled={isDeleting}>Delete Issue {isDeleting && <Spinner/>}</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Comfirm Deletioin</AlertDialog.Title>
        <AlertDialog.Description>Are you sure you want to delete this issue? This can't be undone.</AlertDialog.Description>
        <Flex mt="4" gap="3">
        <AlertDialog.Cancel>
            <Button color="gray">Cancel</Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
            <Button color="red" onClick={DeleteIssue}>Delete Issue</Button>
        </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
    <AlertDialog.Root open={error}>
        <AlertDialog.Content>
            <AlertDialog.Title>Error</AlertDialog.Title>
            <AlertDialog.Description>This issue can't be deleted</AlertDialog.Description>
            <Button mt='3'color="gray" variant="soft" onClick={()=> setError(false)}>OK</Button>
        </AlertDialog.Content>
    </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
