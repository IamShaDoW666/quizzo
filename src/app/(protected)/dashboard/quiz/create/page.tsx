"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { quizCreateSchema } from "@/schema/formSchema";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { createQuiz } from "@/controllers/quizAction";

const Quiz = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof quizCreateSchema>>({
    resolver: zodResolver(quizCreateSchema),
  });

  function submit(values: z.infer<typeof quizCreateSchema>) {
    startTransition(() => {
      // Todo: make action
      createQuiz(values)
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
                    Create
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
