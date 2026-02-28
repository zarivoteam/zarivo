import { Suspense } from "react";
import SettingsClient from "./SettingsClient";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
      <SettingsClient />
    </Suspense>
  );
}