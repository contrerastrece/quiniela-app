"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useRef, useEffect } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const TansTackProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClientRef = useRef<QueryClient>();

  useEffect(() => {
    getSupabaseBrowserClient().auth.getUser();
  }, []);

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <>
      <QueryClientProvider client={queryClientRef.current}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default TansTackProvider;
