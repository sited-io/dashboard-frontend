import { buildUrl } from "~/lib/env";

export const offersPath = "/offers";
export const offersUrl = () => buildUrl(offersPath);

export default function Offers() {
  return (
    <>
      <h1>Offers</h1>
    </>
  );
}
