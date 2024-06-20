import { buildUrl } from "~/lib/env";

export const configurationPath = "/configuration";
export const configurationUrl = () => buildUrl(configurationPath);

export default function Configuration() {
  return (
    <>
      <h1>Configuration</h1>

      <h2>Name</h2>
      <h2>Description</h2>
      <h2>Primary Color</h2>
      <h2>Logo</h2>
    </>
  );
}
