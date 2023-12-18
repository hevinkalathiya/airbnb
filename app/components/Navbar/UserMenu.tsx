"use client";
import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

type Props = {};

const UserMenu = (props: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = useCallback(() => {
    setShowMenu((prev) => !prev);
  }, [showMenu]);

  return (
    <div className="relative  ">
      <div className=" flex flex-row items-center gap-3  ">
        <div className="hidden md:block rounded-full text-sm font-semibold py-3 px-4 hover:bg-neutral-100 transition cursor-pointer ">
          Airbnb Your Home
        </div>

        <div
          onClick={toggleMenu}
          className=" p-4 md:py-1 md:px-2 border border-neutral-300 flex items-centergap-3 rounded-full cursor-pointer hover:shadow-md transition "
        >
          <AiOutlineMenu />
        </div>
        <div className="hidden md:block">
          <Avatar />
        </div>
      </div>
      {showMenu && (
        <div className="absolute rounded-xl shadow-md w-[40px] md:w-3/4 bg-white overflow-hidden top-12 right-0 text-sm ">
          <div className="flex flex-col cursor-pointer">
            <MenuItem label="Login" onClick={()=>{}}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
