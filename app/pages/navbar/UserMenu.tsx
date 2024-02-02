"use client";
import { useLoginModal } from "@/app/hooks/useLoginModel";
import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { useRentModal } from "@/app/hooks/useRentModel";

import { User } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import React, { FC, useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

type Props = {};

const UserMenu: FC<Props> = ({}) => {
  const registerModal = useRegisterModal();
  const loginModel = useLoginModal();
  const rentModel = useRentModal();
  const [showMenu, setShowMenu] = useState(false);

  const { data: session } = useSession();

  const toggleMenu = useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  const onRent = useCallback(() => {
    if (!session) {
      return loginModel.onOpen();
    }
    rentModel.onOpen();
  }, [session, loginModel, rentModel]);
  return (
    <div className="relative">
      <div className=" flex flex-row items-center gap-3  ">
        <div
          onClick={onRent}
          className="hidden md:block rounded-full text-sm font-semibold py-3 px-4 hover:bg-neutral-100 transition cursor-pointer "
        >
          Airbnb Your Home
        </div>

        <div
          onClick={toggleMenu}
          className=" p-4 md:py-1 md:px-2 border border-neutral-300 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={session?.user?.image} />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="absolute rounded-xl shadow-md w-[160px] md:w-3/4 z-50 bg-white overflow-hidden top-12 right-0 text-sm ">
          <div className="flex flex-col cursor-pointer">
            {session ? (
              <>
                <MenuItem label="My Trips" onClick={() => {}} />
                <MenuItem label="My favourites" onClick={() => {}} />
                <MenuItem label="My Reservation" onClick={() => {}} />
                <MenuItem label="My Properties" onClick={() => {}} />
                <MenuItem label="Airbnb my home" onClick={rentModel.onOpen} />
                <MenuItem
                  label="LogOut"
                  onClick={() => {
                    signOut();
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModel.onOpen} />
                <MenuItem label="Sign-up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
