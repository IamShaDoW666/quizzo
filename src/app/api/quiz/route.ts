import { db } from "@/lib/db"

export async function GET() {
    const res = await db.quiz.findMany();
   
    return Response.json(res)
  }