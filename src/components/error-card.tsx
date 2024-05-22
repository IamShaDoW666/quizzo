import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";

const ErrorCard = () => {
  return (
    <Card className="w-[600px] shadow-md mx-auto">
      <CardHeader>
        <div className="items-center flex w-full gap-x-2 justify-center">
          <span className="text-2xl">Oops! Something went wrong! </span>
          <TriangleAlert className="w-10 h-10 text-destructive" />
        </div>
      </CardHeader>
      <CardFooter className="justify-center">
        <Link href="/auth/login">
          <Button>Back to Login</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
