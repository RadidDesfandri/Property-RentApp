"use client";
import Image from "next/image";
import React from "react";

interface ProfileProps {
  avatar: string | File | null;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const ProfilePreview: React.FC<ProfileProps> = ({ avatar, setFieldValue }) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (avatar) {
      const objectUrl = URL.createObjectURL(avatar as File);
      setImageUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImageUrl(null);
    }
  }, [avatar]);

  if (!imageUrl) return null;

  return (
    <div>
      <Image
        src={imageUrl}
        alt="Profile Preview"
        width={100}
        height={100}
        className="h-28 w-28 rounded-full object-cover"
      />
    </div>
  );
};

export default ProfilePreview;
