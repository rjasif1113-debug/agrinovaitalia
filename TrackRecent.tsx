"use client";

import { useEffect } from "react";
import { useStore } from "./store";

export function TrackRecent({ slug }: { slug: string }) {
  const { addRecent } = useStore();
  useEffect(() => {
    addRecent(slug);
  }, [slug, addRecent]);
  return null;
}
