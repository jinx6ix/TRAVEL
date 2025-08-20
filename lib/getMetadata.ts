// lib/getMetadata.ts
import { pageKeywords } from "./keywords";
import type { Metadata } from "next";

export function getMetadataFromPath(pathname: string): Metadata {
  const matched = pageKeywords.find(item => item.url === pathname);

  if (!matched) {
    return {
      title: "JaeTravel Expeditions | Premium African Safari Experiences",
      description: "Luxury safari tours and bespoke travel experiences in East Africa. Explore Kenya, Tanzania, Rwanda & Uganda with our expert guides. Book your dream African adventure today.",
    };
  }

  return {
    title: matched.metaTitle,
    description: matched.metaDescription,
  };
}
