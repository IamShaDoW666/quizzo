import CreateQuestionModal from "@/components/create-question-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import React from "react";
const Questions = async () => {
  const allQuiz = await (await db.quiz.findMany({ include: { questions: true } }))
  return (
    <div className="p-12">
      <h1 className="pb-4 px-4">Questions</h1>
      <div className="grid grid-cols-3 gap-8 py-12">
        {allQuiz.map((quiz) => {
            const totalMarks = quiz.questions.reduce((acc, curr) => acc + curr.marks, 0);
          return (
            <Card key={quiz.id}>
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="py-4">
                  <p>Number of questions: {quiz.questions.length}</p>
                  <p>Total Marks: {totalMarks}</p>
                </div>
                <CreateQuestionModal quiz={quiz} />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Questions;
