"use client";

import { Listing } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../pages/ui/ui/badge";
import { ReactNode } from "react";
import { ArrowUpDown, Link, MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../pages/ui/ui/dropdown-menu";
import { Button } from "../pages/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import EditProfile from "./EditProfile";

export const columns: ColumnDef<Listing>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          text="Title"
          icon={ArrowUpDown}
          iconclassName="ml-2 h-4 w-4"
        />
      );
    },
    cell: ({ row }) => {
      const title = row.getValue("title");
      return (
        <a
          href={`/listings/${row.original.id}`}
          className="text-bold flex gap-3 items-center"
        >
          <Link size={16} /> {title as ReactNode}
        </a>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "locationValue",
    header: "Location",
  },
  {
    header: "Edit",
    cell: ({ row }) => {
      const listingId = row.original.id;
      return <EditProfile listingId={listingId} />;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          text="Price"
          icon={ArrowUpDown}
          iconclassName="ml-2 h-4 w-4"
        />
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return (
        <Badge variant="secondary" className="font-bold">
          {formatted}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-start">Actions</div>,
    cell: ({ row }) => {
      const listing = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      const handleDelete = async () => {
        try {
          await axios.delete(`/api/listings/${listing.id}`);
          toast.success("Listing deleted");
          router.refresh();
        } catch (error) {
          console.error("Error deleting listing:", error);
          toast.error("Error deleting listing");
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              text={"Open menu"}
              icon={MoreHorizontal}
              iconclassName="ml-2"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="gap-y-2">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="flex justify-between text-red-600 hover:text-red-700 font-extrabold cursor-pointer"
              onClick={handleDelete}
            >
              DELETE <Trash color="red" size={18} />
            </DropdownMenuItem>
            {/* <DropdownMenuItem className="flex justify-between  font-extrabold  cursor-pointer">
              EDIT <Pencil size={18} />
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
