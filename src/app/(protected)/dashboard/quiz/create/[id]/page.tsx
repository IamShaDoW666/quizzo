"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { quizUpdateSchema } from "@/schema/formSchema";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Quiz as QuizType } from "@prisma/client";
import { updateQuiz } from "@/controllers/quizAction";

const Quiz = ({ params }: { params: { id: string } }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof quizUpdateSchema>>({
    resolver: zodResolver(quizUpdateSchema),
  });

  const getQuiz = async (id: string) => {
    const res: QuizType  = await (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/${id}`)).json()    
    form.setValue("id", res.id)  
    form.setValue("title", res.title)  
    form.setValue("description", res.description)  
  }

  useEffect(() => {
    getQuiz(params.id)    
  }, [])

  

  function submit(values: z.infer<typeof quizUpdateSchema>) {
    startTransition(() => {
      // Todo: make action
      updateQuiz(values)
        .then((data) => {
          setError(data?.error);
          setSuccess(data?.success);
        })
        .catch((error: { error: string }) => {
          alert(error);
          setError(error.error);
        });
    });
  }

  return (
    <div className="p-12">
      <Card>
        <CardHeader>
          <CardTitle>Quiz Name</CardTitle>
          <CardDescription>Give a unique name for your quiz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submit)}>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Quiz Title"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter description"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="py-4">
                  <Button disabled={isPending} type="submit">
                    Update
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;
