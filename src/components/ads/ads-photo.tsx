import Image from "next/image";
import type { AdsPhoto } from "@/lib/data/ads-visuals";
import { cn } from "@/lib/utils";

export function AdsPhotoFill({
  photo,
  priority = false,
  className,
  sizes = "100vw",
}: {
  photo: AdsPhoto;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", className)}
    />
  );
}

export function AdsPhotoImg({
  photo,
  priority = false,
  className,
  sizes,
}: {
  photo: AdsPhoto;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      priority={priority}
      sizes={sizes}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
