"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { UPLOAD_IMAGE } from "@/graphql/mutation/product";

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  currentImageUrl?: string;
}

export function ImageUploader({
  onUploadSuccess,
  currentImageUrl,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadImage] = useMutation(UPLOAD_IMAGE);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { data } = await uploadImage({
        variables: {
          file: file,
        },
      });

      if (data?.uploadImage?.url) {
        onUploadSuccess(data.uploadImage.url);
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Upload succeeded but no URL was returned.");
      }
    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    onUploadSuccess("");
  };

  if (currentImageUrl) {
    return (
      <div className="relative w-32 h-32">
        <Image
          src={currentImageUrl}
          alt="Uploaded product"
          className="w-full h-full object-cover rounded-md"
          width={128}
          height={128}
        />
        <button
          type="button"
          onClick={removeImage}
          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
      {isUploading ? (
        <p>Uploading...</p>
      ) : (
        <>
          <UploadCloud className="w-8 h-8 text-gray-400" />
          <span className="text-sm text-gray-500">Upload</span>
        </>
      )}
      <input
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
      />
    </label>
  );
}
