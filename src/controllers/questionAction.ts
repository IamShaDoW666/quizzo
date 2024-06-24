"use server"
import { db } from "@/lib/db";
import { questionCreateSchema } from "@/schema/formSchema";
import { z } from "zod";

export const createQuestion = async (values: z.infer<typeof questionCreateSchema>) => {
    const validatedFields = questionCreateSchema.safeParse(values);
    const question = await db.question.create({data: {
        title: validatedFields.data?.title!,
        marks: validatedFields.data?.marks,
        quizId: validatedFields.data?.quizId!                
    }})
    if (question.id) {
        return {success: "Quiz Created Successfully!"}
    } else {
        return {error: "Internal Server Error!"}
    }
}