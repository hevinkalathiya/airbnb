"use client";

import Image from "next/image";
import React from "react";

type Props = {};

const Avatar = (props: Props) => {
  return (
    <Image
      className="rounded-full"
      alt="avatar"
      height={30}
      width={30}
      src="/images/placeholder.jpg"
      priority={true}
    />
  );
};

export default Avatar;
