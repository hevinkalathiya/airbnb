// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../auth/[...nextauth]/option";
// import prisma from "@/app/lib/prismadb";
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user?.email) {
//       return NextResponse.error();
//     }

//     const currentUser = await prisma.user.findUnique({
//       where: {
//         email: session?.user?.email as string,
//       },
//     });
      
//     if (!currentUser) {
//       console.error("User not found");
//       return NextResponse.error();
//     }
//     return NextResponse.json(currentUser);
//   } catch (error) {
//     console.error(error, "Error getting current user");
//     return null;
//   }
// }
