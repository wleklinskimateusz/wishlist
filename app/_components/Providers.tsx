"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import TrpcProvider from "../_trpc/TrpcProvider";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TrpcProvider>{children}</TrpcProvider>
    </QueryClientProvider>
  );
}
