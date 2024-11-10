import { useTransContext } from "@mbarzda/solid-i18next";

import { ResourceBoundary } from "~/components/layout/ResourceBoundary";
import { Section } from "~/components/layout/Section";
import { SectionTitle } from "~/components/layout/SectionTitle";
import { UpdateCustomizationForm } from "~/components/websites/UpdateCustomizationForm";
import { UpdateLogoImageForm } from "~/components/websites/UpdateLogoImageForm";
import { UpdateWebsiteForm } from "~/components/websites/UpdateWebsiteForm";
import { useWebsiteContext } from "~/contexts/WebsiteContext";
import { WebsiteGuard } from "~/guards/WebsiteGuard";
import { Page } from "~/layout/Page";
import { buildUrl } from "~/lib/env";
import { TKEYS } from "~/locales";

export const configurationPath = () => "/configuration";
export const configurationUrl = () => buildUrl(configurationPath());

export default function Configuration() {
  const [trans] = useTransContext();

  const { selectedWebsite, refetchSelectedWebsite } = useWebsiteContext();

  async function handleUpdate() {
    await refetchSelectedWebsite();
  }

  return (
    <Page>
      <WebsiteGuard />
      <Section>
        <SectionTitle title={trans(TKEYS.navigation.pages.Configuration)} />

        <ResourceBoundary resource={selectedWebsite}>
          <UpdateWebsiteForm
            website={selectedWebsite()!}
            onUpdate={handleUpdate}
          />

          <UpdateCustomizationForm
            website={selectedWebsite()!}
            onUpdate={handleUpdate}
          />

          <UpdateLogoImageForm
            website={selectedWebsite()!}
            onUpdate={handleUpdate}
          />
        </ResourceBoundary>
      </Section>
    </Page>
  );
}
