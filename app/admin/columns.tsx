"use client";

import { Listing } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../pages/ui/ui/badge";
import { ReactNode } from "react";
import { DeleteIcon, Link, MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../pages/ui/ui/dropdown-menu";
import { Button } from "../pages/ui/button";

export const columns: ColumnDef<Listing>[] = [
  {
    accessorKey: "title",
    header: "Title",
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
    accessorKey: "price",
    header: "Price",
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
            <DropdownMenuItem className="flex justify-between text-red-600 hover:text-red-700 font-extrabold  cursor-pointer">
              DELETE <Trash color="red" size={18} />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between  font-extrabold  cursor-pointer">
              EDIT <Pencil size={18}  />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
