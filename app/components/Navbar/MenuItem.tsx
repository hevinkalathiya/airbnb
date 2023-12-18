"use client";
import React, { FC } from "react";

type MenuItemProps = {
  onClick: () => void;
  label: string;
};

const MenuItem: FC<MenuItemProps> = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-2 hover:bg-neutral-100 transition font-semibold
  "
    >
      {label}
    </div>
  );
};

export default MenuItem;
