import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/lib/db";
import { Plus } from "lucide-react";
import QuizActions from "@/components/quiz-actions";

const QuizList = async () => {
  const allQuiz = await db.quiz.findMany();
  return (
    <div className="p-12">
      <div className="flex justify-between">
        <h1 className="pb-4 px-4">Quiz</h1>
        <Dialog>
          <DialogTrigger>
            <Plus />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new quiz</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <Table className="my-4">
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allQuiz.map((quiz, idx) => (
            <TableRow>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>{quiz.title}</TableCell>
              <TableCell>
                <QuizActions quiz={quiz} />              
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default QuizList;
