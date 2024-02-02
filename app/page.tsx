"use client";
import React, { useEffect, useState } from "react";
import ListingCard from "./pages/listings/ListingCard";
import Container from "./pages/Container";
import axios from "axios";
import EmptyState from "./pages/EmptyState";
import { useSession } from "next-auth/react";

type Props = {};

const Page = (props: Props) => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/listings");
        setListings(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (listings.length === 0) {
    return <EmptyState showreset />;
  }
  return (
    <Container>
      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
        {listings.map((listing: any) => (
          <ListingCard key={listing.id} listing={listing} currentUser={session} />
        ))}
      </div>
    </Container>
  );
};

export default Page;
