"use client";
import { Listing, Reservation, User } from "@prisma/client";
import { Session } from "next-auth";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, useMemo } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Heartbutton from "../Heartbutton";
import useCountries from "@/app/hooks/useCountries";

type ListingCardProps = {
  listing: Listing;
  currentUser: Session | null;
  onAction?: (listing: any) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  reservation?: Reservation;
};

const ListingCard: FC<ListingCardProps> = ({
  listing,
  currentUser,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  reservation,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(listing.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [actionId, disabled, onAction]
  );
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return listing.price;
  }, [reservation, listing.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${listing.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={listing.imageSrc}
            alt="Listing"
          />
          <div className="absolute top-3 right-3 "
          >
            <Heartbutton listingId={listing.id} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || listing.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            onClick={handleCancel}
            text={actionLabel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
