"use client";
import React, { FC, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/pages/ui/dialog";
import { Button } from "../pages/ui/button";
import { Label } from "../pages/ui/label";
import { Input } from "@/app/pages/ui/defaultInput/ui/input";
import axios from "axios";
import { Listing } from "@prisma/client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type EditProfileProps = {
  listingId: string;
};

const EditProfile: FC<EditProfileProps> = ({ listingId }) => {
  const apiUrl = `http://localhost:3000/api/listings/${listingId}`;

  const handleEdit = useCallback(async () => {
    const response = await axios.get<Listing>(apiUrl);
    return {
      title: response.data.title,
      description: response.data.description,
      price: response.data.price,
    };
  }, [apiUrl]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: handleEdit,
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={handleEdit} text="Edit Profile" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-y-4 py-4">
            <div className="">
              <Label htmlFor="name">Title</Label>
              <Input id="title" {...register("title", { required: true })} />
              {errors.name && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="">
              <hr className="border-neutral-200" />
              <Label htmlFor="name">Description</Label>
              <Input
                id="description"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="">
              <hr className="border-neutral-200" />
              <Label htmlFor="name">Price</Label>
              <Input id="price" {...register("price", { required: true })} />
              {errors.price && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" variant="ghost" text="Save changes"></Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
