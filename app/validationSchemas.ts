import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(1, "Title required").max(255),
    description: z.string().min(1, "Description required")
});
