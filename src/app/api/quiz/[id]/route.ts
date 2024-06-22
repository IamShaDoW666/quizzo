import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  const id = pathname.replace('/api/quiz/', '')
  const res = await db.quiz.findUnique({where: {id}})
  return Response.json(res);
}
