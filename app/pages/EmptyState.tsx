"use client";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import Heading from "./Heading";
import { Button } from "./ui/button";

type EmptyStateProps = {
  title?: string;
  subTitle?: string;
  showreset?: boolean;
};

const EmptyState: FC<EmptyStateProps> = ({
  title = "No listings found",
  subTitle = "Try adjusting your search filters to find something",
  showreset ,
}: EmptyStateProps) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subtitle={subTitle} />
      <div className="w-48 mt-4 ">
        {showreset && (
          <Button
            variant="airbnb"
            onClick={() => router.push("/")}
            text="Remove all filters"
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
