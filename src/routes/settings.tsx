import { buildUrl } from "~/lib/env";

export const settingsPath = "/settings";
export const settingsUrl = () => buildUrl(settingsPath);

export default function Settings() {
  return (
    <>
      <h1>Settings</h1>

      <h2>Stripe Integration</h2>
      <h2>Contact E-Mail</h2>
      <h2>Domain</h2>

      <h2>Publish / Hide Website</h2>
      <h2>Delete Website</h2>
    </>
  );
}
