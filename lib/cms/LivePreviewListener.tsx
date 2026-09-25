"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function LivePreviewListener() {
  const router = useRouter();

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (
        event.data?.type === "payload-live-preview" ||
        event.data?.type === "livePreview"
      ) {
        router.refresh();
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router]);

  return null;
}
