"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className=" flex flex-col">
        <div className=" font-semibold p-2 text-lg ">数据管理</div>
        <div className=" flex-1"> {children}</div>
      </div>
    </QueryClientProvider>
  );
}
