"use client"

import { Button, TextArea, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const newIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
        <TextField.Root placeholder="Title" />
        <SimpleMDE placeholder="write a description"/>
        <Button>Add an issue</Button>
    </div>
  )
}

export default newIssuePage