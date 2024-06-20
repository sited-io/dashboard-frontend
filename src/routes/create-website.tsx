import { Section } from "~/components/layout/Section";
import { buildUrl } from "~/lib/env";

export const createWebsitePath = "create-website";
export const createWebsiteUrl = buildUrl(createWebsitePath);

export default function CreateWebsite() {
  return (
    <>
      <Section>
        <h1>Create a new Website</h1>
      </Section>
    </>
  );
}
