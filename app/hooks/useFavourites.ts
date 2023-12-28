import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { useSession } from "next-auth/react";
import { useLoginModal } from "./useLoginModel";
import { getCurrentUser } from "../actions/getCurrentUser";

interface IUseFavorite {
  listingId: string;
}

const useFavorite = ({ listingId }: IUseFavorite) => {
  const router = useRouter();

  const { data: session } = useSession();

  const loginModal = useLoginModal();

  // const currentUser = useCallback(async () => {
  //   const currentUser = await getCurrentUser();
  //   return currentUser;
  // }, []);

  console.log(session);

  const hasFavorited = useMemo(() => {
    const list = [""];

    return list.includes(listingId);
  }, [listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!session) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [session, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
