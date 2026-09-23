import { getImageProps, type ImageProps } from "next/image";
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

function optimizedHero(photo: AdsPhoto) {
  const { props } = getImageProps({
    src: photo.src,
    alt: "",
    width: photo.width,
    height: photo.height,
    sizes: "100vw",
    quality: 75,
  } satisfies ImageProps);
  return props;
}

/**
 * Two crops, one download: a picture chooses the viewport, and the preload
 * points at the optimized /_next/image URL (not the original JPEG).
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
  const mobileImg = optimizedHero(mobile);
  const desktopImg = optimizedHero(desktop);
  return (
    <>
      <link
        rel="preload"
        as="image"
        imageSrcSet={mobileImg.srcSet}
        imageSizes="100vw"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        imageSrcSet={desktopImg.srcSet}
        imageSizes="100vw"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet={desktopImg.srcSet}
          sizes="100vw"
        />
        <img
          alt=""
          width={mobileImg.width}
          height={mobileImg.height}
          src={mobileImg.src}
          srcSet={mobileImg.srcSet}
          sizes="100vw"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
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
