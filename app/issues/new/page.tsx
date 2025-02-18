"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

// Disable SSR for SimpleMDE
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface formType {
  title: string;
  description: string;
}

const newIssuePage = () => {
  const { register, control, handleSubmit } = useForm<formType>();
  const router= useRouter();

  const submitListener= async (data: formType)=>{
    await axios.post("/api/issues", data)
    router.push("/issues")
}

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(submitListener)}
    >
      <TextField.Root placeholder="Title" {...register("title")} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="write a description" {...field} />
        )}
      />
      <Button>Add an issue</Button>
    </form>
  );
};

export default newIssuePage;
