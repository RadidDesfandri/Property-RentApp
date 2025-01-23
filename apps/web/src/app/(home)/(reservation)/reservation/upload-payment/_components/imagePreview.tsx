"use client";
import Image from "next/image";
import React from "react";

interface ProfileProps {
  image: File | null;
}
const ProofPreview: React.FC<ProfileProps> = ({ image }) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setImageUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImageUrl(null);
    }
  }, [image]);
  if (!imageUrl) return null;

  return (
    <div>
      <Image
        src={imageUrl}
        alt="Profile Preview"
        width={100}
        height={100}
        className="lg:h-[200px] lg:w-[500px] rounded-xl object-cover"
      />
    </div>
  );
};

export default ProofPreview;
