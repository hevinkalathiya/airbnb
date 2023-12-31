import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    console.log(params);

    const { listingId } = params;

    try {
      const deleteListing = await prisma.listing.delete({
        where: {
          id: listingId,
        },
      });
      return NextResponse.json(deleteListing);
    } catch (error) {
      return NextResponse.json({ Message: "Listing not found", error });
    }
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const { listingId } = params;
    const body = await req.json();

    const {
      category,
      location,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price,
      title,
      description,
    } = body;

    const updatedListing = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        category,
        locationValue: location.value,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        price: parseInt(price, 10),
        title,
        description,
      },
    });
    return NextResponse.json(updatedListing);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function GET(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const { listingId } = params;
    console.log(params);

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });
    return NextResponse.json(listing);
  } catch (error) {
    return NextResponse.json(error);
  }
}
