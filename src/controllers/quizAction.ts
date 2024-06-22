"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { quizCreateSchema, quizDeleteSchema, quizUpdateSchema } from "@/schema/formSchema";
import { z } from "zod";

export const createQuiz = async (values: z.infer<typeof quizCreateSchema>) => {
    const validatedFields = quizCreateSchema.safeParse(values);
    const session = await auth()
    // const user = await db.user.findFirst({where: {id: session?.user.id}})
    const quiz = await db.quiz.create({data: {
        title: validatedFields.data?.title!,
        description: validatedFields.data?.description!,
        authorId: session?.user?.id,
    }})
    if (quiz.id) {
        return {success: "Quiz Created Successfully!"}
    } else {
        return {error: "Internal Server Error!"}
    }
}

export const updateQuiz = async (values: z.infer<typeof quizUpdateSchema>) => {
    const validatedFields = quizUpdateSchema.safeParse(values);
    const session = await auth()
    // const user = await db.user.findFirst({where: {id: session?.user.id}})
    const quiz = await db.quiz.update({data: {
        title: validatedFields.data?.title!,
        description: validatedFields.data?.description!,
        authorId: session?.user?.id,
    }, where: {id: validatedFields.data?.id}})
    if (quiz.id) {
        return {success: "Quiz Updated Successfully!"}
    } else {
        return {error: "Internal Server Error!"}
    }
}

export const deleteQuiz = async (values: z.infer<typeof quizDeleteSchema>) => {
    const validatedFields = quizDeleteSchema.safeParse(values);
    const quiz = await db.quiz.delete({where: {id: validatedFields.data?.id}})

    if (quiz.id) {
        return {success: "Quiz Deleted Successfully!"}
    } else {
        return {error: "Internal Server Error!"}
    }
}