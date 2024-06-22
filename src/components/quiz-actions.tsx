"use client";
import React from "react";
import { Button } from "./ui/button";
import Swal from "sweetalert2";
import { deleteQuiz } from "@/controllers/quizAction";
import { Quiz } from "@prisma/client";
import Link from "next/link";

const QuizActions = ({ quiz }: { quiz: Quiz }) => {
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      showDenyButton: true,
      confirmButtonText: "Cancel",
      denyButtonText: `Delete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.close();
      } else if (result.isDenied) {
        const res = await deleteQuiz({ id: quiz.id });
        if (res.success) {
          Swal.fire({ title: res.success, icon: "success", timer: 1500 }).then(
            () => {
              window.location.reload();
            }
          );
        }
      }
    });
  };
  return (
    <div className="flex gap-x-4 items-center justify-end">
      <Link legacyBehavior href={`/dashboard/quiz/create/${quiz.id}`}>
        <Button variant={"secondary"}>Edit</Button>
      </Link>
      <Button onClick={handleDelete} variant={"destructive"}>
        Delete
      </Button>
    </div>
  );
};

export default QuizActions;
