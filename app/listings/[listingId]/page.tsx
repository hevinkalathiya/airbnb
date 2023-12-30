"use client";
import EmptyState from "@/app/pages/EmptyState";
import { Listing } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface IParams {
  listingId: string;
}

const Page = ({ params }: { params: IParams }) => {
  const [listing, setListing] = useState<Listing>();
  const [loading, setLoading] = useState(true);

  const fetchData = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/getListingById/${id}`
      );
      setListing(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(params);

  useEffect(() => {
    fetchData(params.listingId);
  }, [params]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (listing === null) {
    <EmptyState title="Listing Not Found" />;
  }

  // return <ListingClient listing={listing} />;
};

export default Page;
