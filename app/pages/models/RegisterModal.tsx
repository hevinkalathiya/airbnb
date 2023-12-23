"use client";

import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { GithubIcon } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Heading from "../Heading";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Modal from "./Modal";
import { signIn } from "next-auth/react";

type Props = {};

const RegisterModal = (props: Props) => {
  const registerModal = useRegisterModal();
  const loginModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registered!");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  const FooterContent = (
    <div className="flex flex-col gap-4 mt-3">
      <Button
        className="w-full"
        variant="outline"
        text="Continue With Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
        />
      <Button
        className="w-full"
        variant="outline"
        text="Continue With Github"
        icon={GithubIcon}
        onClick={() => signIn('github')}
      />
    </div>
  );

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
