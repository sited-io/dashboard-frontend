import { createResource } from "solid-js";

import { ResourceBoundary } from "~/components/layout/ResourceBoundary";
import { Section } from "~/components/layout/Section";
import { SectionTitle } from "~/components/layout/SectionTitle";
import { UpdateDomainsForm } from "~/components/websites/UpdateDomainsForm";
import { UpdateStripeForm } from "~/components/websites/UpdateStripeForm";
import { useWebsiteContext } from "~/contexts/WebsiteContext";
import { Page } from "~/layout/Page";
import { buildUrl } from "~/lib/env";
import { TKEYS } from "~/locales";
import { shopService } from "~/services/commerce";

export const settingsPath = () => "/settings";
export const settingsUrl = () => buildUrl(settingsPath());

export default function Settings() {
  const { selectedWebsite, refetchSelectedWebsite } = useWebsiteContext();

  const [shop, shopActions] = createResource(
    () => selectedWebsite()?.websiteId,
    async (websiteId: string) => shopService.getShop({ websiteId }),
  );

  async function handleUpdate() {
    await refetchSelectedWebsite();
  }

  async function handleUpdateShop() {
    await shopActions.refetch();
  }

  return (
    <Page>
      <Section>
        <SectionTitle key={TKEYS.navigation.pages.Settings} />

        <ResourceBoundary resource={selectedWebsite}>
          <ResourceBoundary resource={shop}>
            <UpdateStripeForm shop={shop()} onUpdate={handleUpdateShop} />
          </ResourceBoundary>

          <UpdateDomainsForm
            website={selectedWebsite()!}
            onUpdate={handleUpdate}
          />
        </ResourceBoundary>
      </Section>

      {/* <Section>
        <SectionTitle key={TKEYS.form["critical-settings"]} />

        <ResourceBoundary resource={selectedWebsite}>
          <DeleteWebsiteForm
            website={selectedWebsite()!}
            onUpdate={handleUpdateDelete}
          />
        </ResourceBoundary>
      </Section> */}
    </Page>
  );
}
