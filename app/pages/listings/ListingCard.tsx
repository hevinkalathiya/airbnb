import React, { useEffect, useState } from "react";
import EmptyState from "../EmptyState";
import axios from "axios";

type Props = {};


const ListingCard = (props: Props) => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  return <div>ListingCard</div>;
};

export default ListingCard;
