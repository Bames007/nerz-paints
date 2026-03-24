"use client";

import dynamic from "next/dynamic";

const StoreLocator = dynamic(() => import("./StoreLocator"), { ssr: false });

export default function ClientStoreLocator() {
  return <StoreLocator />;
}
