"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { quizCreateSchema } from "@/schema/formSchema";
import { z } from "zod";

export const createQuiz = async (values: z.infer<typeof quizCreateSchema>) => {
    const validatedFields = quizCreateSchema.safeParse(values);
    const session = await auth()
    const user = await db.user.findFirst({where: {id: session?.user.id}})
    const quiz = await db.quiz.create({data: {
        title: validatedFields.data?.title!,
        description: validatedFields.data?.description!,
        authorId: session?.user?.id,
    }})
    if ((await quiz).id) {
        return {success: "Quiz Created Successfully!"}
    } else {
        return {error: "Internal Server Error!"}
    }
}