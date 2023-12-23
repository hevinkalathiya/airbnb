"use client";

import Image from "next/image";
import React, { FC } from "react";

type Props = {
  src?: string | null | undefined;
};

const Avatar: FC<Props> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      alt="avatar"
      height={30}
      width={30}
      src={src || "/images/placeholder.jpg"}
      priority={true}
    />
  );
};

export default Avatar;
