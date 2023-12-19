"use client";

import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { GithubIcon } from "lucide-react";

type Props = {};

const RegisterModal = (props: Props) => {
  const registerModal = useRegisterModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4 ">
      <Heading title="Welcome To Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  const FooterContent = (
    <div className="flex flex-col gap-4 mt-3">
      <Button className="w-full" variant="outline" text="Continue With Google" icon={FcGoogle}/>
      <Button className="w-full" variant="outline" text="Continue With Github" icon={GithubIcon}/>
    </div>
  );

  const isLoading = false; //TODO for now its hardcoded but in the future it will be come from react-query
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={FooterContent}
    />
  );
};

export default RegisterModal;
