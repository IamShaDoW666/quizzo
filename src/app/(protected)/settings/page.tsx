import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
export default async function Settings() {
  const session = await auth();    
  return (  
    <div className="py-12 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardContent className="py-8">
            <div className="flex gap-x-2">
              <span className="text-md font-semibold">
                This is a protected page!
              </span>
              <Lock />
            </div>
            <p>{JSON.stringify(session)}</p>
            <div className="py-4">
              <form
                action={async () => {
                  "use server";
                  await signOut({redirectTo: "/auth/login"});
                }}
              >
                <Button type="submit">Sign Out</Button>
              </form>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

