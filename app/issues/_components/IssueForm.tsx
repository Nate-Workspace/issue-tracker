"use client";

import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import {z} from "zod"
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";

// Disable SSR for SimpleMDE
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type formType= z.infer<typeof issueSchema>;

const IssueForm = ({issue}: {issue?:Issue}) => {
  const { register, control, handleSubmit, formState: {errors} } = useForm<formType>({
    resolver: zodResolver(issueSchema)
  });
  const [error, setError]= useState('')
  const [submitting,setSubmitting]= useState(false)
  const router= useRouter();

  const submitListener= async (data: formType)=>{
    try {
      setSubmitting(true)
      await axios.post("/api/issues", data)
      router.push("/issues")
    } catch (error) {
      setSubmitting(false)
      console.log(error)
      setError("Un expected error happened")
    }
}

  return (
    <div className="max-w-xl">
      { error &&
      <Callout.Root color="red" className="mb-5">
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>
      }
    <form
      className="space-y-3"
      onSubmit={handleSubmit(submitListener)}
    >
      <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register("title")} />
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller
        name="description"
        control={control}
        defaultValue={issue?.description}
        render={({ field }) => (
          <SimpleMDE placeholder="write a description" {...field} />
        )}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Button disabled={submitting}>Add an issue { submitting && <Spinner/>}</Button>
    </form>
    </div>
  );
};

export default IssueForm;
