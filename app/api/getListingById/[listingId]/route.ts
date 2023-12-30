import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

interface IParams {
  listingId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: params.listingId,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    return NextResponse.json(error);
  }
  if (!params.listingId) {
    return null;
  }
}
