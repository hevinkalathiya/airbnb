"use client";

import React, { FC, useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";

declare global {
  var cloudinary: any;
}

type ImageUploadProps = {
  onChange: (imageSrc: string) => void;
  value: string;
};

const ImageUpload: FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="jloy1x1e"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => {
              open?.();
            }}
            className="relative cursor-pointer hover:opacity-70  transition border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus className="h-12 w-12" />
            <div className="font-semibold text-lg">Click To Upload</div>
            <div className="">
              {value && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    alt="upload "
                    fill
                    style={{ objectFit: "cover" }}
                    src={value}
                  />
                </div>
              )}
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
