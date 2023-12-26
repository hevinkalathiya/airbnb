"use client";

import React, { FC } from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { User } from "@prisma/client";
import Categories from "./Categories";

interface NavbarProops {
}

const Navbar: FC<NavbarProops> = ({  }) => {
  return (
    <div className="fixed w-full shadow-sm bg-white">
      <div className="py-4 border-b">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu  />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
