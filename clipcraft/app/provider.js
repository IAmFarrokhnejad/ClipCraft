"use client";
import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useEffect } from "react";

function Provider({ children }) {
  const { isLoaded, user } = useUser();
  console.log("before: " + user);
  const checkAndInsertUser = async () => {
    if (!user) return;

    try {
      const result = await db.select().from(Users).where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
      console.log("Query Result:", result);

      if (!result[0]) {
        await db.insert(Users).values({
          name: user.fullName || "",
          email: user?.primaryEmailAddress?.emailAddress,
          imageUrl: user?.imageUrl,
        });
        console.log("User inserted:", user.fullName);
      }
    } catch (error) {
      console.error("Database error:", error);
    }
  };


  useEffect(() => {
    if (isLoaded && user) {
    console.log(user);
    checkAndInsertUser();
  }
  }, [isLoaded, user]);

  return <div>{children}</div>;
}

export default Provider;