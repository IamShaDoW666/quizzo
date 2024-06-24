"use client";
import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { Quiz } from "@prisma/client";
import { useForm } from "react-hook-form";
import { questionCreateSchema } from "@/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { createQuestion } from "@/controllers/questionAction";
const CreateQuestionModal = ({ quiz }: { quiz: Quiz }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof questionCreateSchema>>({
    resolver: zodResolver(questionCreateSchema),
    defaultValues: {
        quizId: quiz.id,
    }
  });

  function create(values: z.infer<typeof questionCreateSchema>) {
    startTransition(() => {
      // Todo: make action
      createQuestion(values)
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
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>Add Question</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a question</DialogTitle>
          <DialogDescription>
            Add a new question to the quiz {quiz.title}
          </DialogDescription>
          <div className="grid gap-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(create)}>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Question"
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
                    name="marks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marks</FormLabel>
                        <FormControl>
                        <Input
                            placeholder="Marks"
                            type="number"                            
                            {...field}
                            onChange={(e) => form.setValue('marks', Number(e.target.value))}
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuestionModal;
