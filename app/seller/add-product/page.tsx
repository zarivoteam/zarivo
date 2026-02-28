import { Suspense } from "react";
import AddProductClient from "./AddProductClient";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 16 }}>Loading...</div>}>
      <AddProductClient />
    </Suspense>
  );
}