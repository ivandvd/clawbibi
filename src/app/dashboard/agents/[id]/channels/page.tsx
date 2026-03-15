"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChannelsRedirect() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    router.replace(`/dashboard/agents/${params.id}`);
  }, [params.id, router]);

  return null;
}
