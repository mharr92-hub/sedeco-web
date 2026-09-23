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

/**
 * Two crops, one download on a phone: the desktop file is lazy and only
 * preloaded when the viewport is at least 768px.
 */
export function ResponsiveHeroPhotos({
  mobile,
  desktop,
}: {
  mobile: AdsPhoto;
  desktop: AdsPhoto;
}) {
  if (mobile.src === desktop.src) {
    return <AdsPhotoFill photo={mobile} priority sizes="100vw" />;
  }
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={mobile.src}
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={desktop.src}
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <Image
        src={mobile.src}
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="object-cover md:hidden"
      />
      <Image
        src={desktop.src}
        alt=""
        fill
        sizes="100vw"
        loading="lazy"
        fetchPriority="low"
        className="hidden object-cover md:block"
      />
    </>
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
