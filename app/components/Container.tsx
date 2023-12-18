"use client";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const Container: FC<Props> = ({ children }: Props) => {
  return (
    <div className="max-w-[2520px] mx-auto cl:px-20 md:px-10 sm:px-10 sm::px-2">
      {children}
    </div>
  );
};

export default Container;
