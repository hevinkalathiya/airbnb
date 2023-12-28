import { getServerSession } from "next-auth/next";

import prisma from "@/app/lib/prismadb";
import { authOptions } from "../api/auth/[...nextauth]/option";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });
    if (!currentUser) {
      console.error("User not found");
      return null;
    }
    return currentUser;
  } catch (error) {
    console.error(error, "Error getting current user");
    return null;
  }
}
