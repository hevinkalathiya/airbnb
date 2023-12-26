"use client";
import React from "react";
import ListingCard from "./pages/listings/ListingCard";
import Container from "./pages/Container";

type Props = {};

const page = (props: Props) => {
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-8">
        <ListingCard />
      </div>
    </Container>
  );
};

export default page;
