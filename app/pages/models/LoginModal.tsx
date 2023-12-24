"use client";

import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import { FcGoogle } from "react-icons/fc";
import { GithubIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLoginModal } from "@/app/hooks/useLoginModel";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type Props = {};

const LoginModal = (props: Props) => {
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false })
      .then((response) => {
        setIsLoading(false);
        if (response?.ok) {
          toast.success("Logged In");
          router.refresh();
          loginModal.onClose();
        }
        if (response?.error) {
          toast.error(response.error);
        }
      })
      .catch((error) => {
        console.error(error, "catcgh");
        toast.error(error);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4 ">
      <Heading title="Welcome Back" subtitle="Login To your accound" />
      <Input
        id="email"
        label="Email"
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
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={FooterContent}
    />
  );
};

export default LoginModal;
