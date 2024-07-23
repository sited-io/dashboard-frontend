import { useTransContext } from "@mbarzda/solid-i18next";
import { useNavigate } from "@solidjs/router";
import _ from "lodash";
import { createResource, createSignal } from "solid-js";

import { Font } from "~/components/content/Font";
import { MdButton } from "~/components/form/MdButton";
import { Section } from "~/components/layout/Section";
import { SectionTitle } from "~/components/layout/SectionTitle";
import { CreateWebsiteDialog } from "~/components/websites/CreateWebsiteDialog";
import { useWebsiteContext } from "~/contexts/WebsiteContext";
import { buildUrl } from "~/lib/env";
import { TKEYS } from "~/locales";
import { fetchSession, signOut } from "~/services/auth";
import { indexPath } from "..";
import { WebsiteResponse } from "~/services/sited_io/websites/v1/website_pb";
import { Page } from "~/layout/Page";

export const userIndexPath = () => "/user";
export const userIndexUrl = () => buildUrl(userIndexPath());

export default function UserIndex() {
  const navigate = useNavigate();

  const [trans] = useTransContext();

  const [session] = createResource(fetchSession);
  const { refetchWebsites, setSelectedWebsite } = useWebsiteContext();

  const [showCreateWebsite, setShowCreateWebsite] = createSignal(false);

  async function handleSignOut() {
    const signOutUrl = await signOut();
    if (!_.isNil(signOutUrl)) {
      location.href = signOutUrl.toString();
    } else {
      navigate(indexPath());
    }
  }

  function handleOpenCreateWebsite() {
    setShowCreateWebsite(true);
  }

  function handleCloseCreateWebsite() {
    setShowCreateWebsite(false);
  }

  async function handleUpdate(createdWebsite: WebsiteResponse) {
    await refetchWebsites();
    setSelectedWebsite(createdWebsite);
    navigate(indexPath());
  }

  return (
    <Page>
      <Section>
        <SectionTitle title={trans(TKEYS.navigation.pages.Profile)} />
        User ID: {session()?.userId}
      </Section>

      <Section centered>
        <MdButton type="filled" onClick={handleOpenCreateWebsite}>
          Create a new Website
        </MdButton>
      </Section>

      <Section centered>
        <MdButton type="outlined" square onClick={handleSignOut}>
          <Font type="body" key={TKEYS.user["sign-out"]} />
        </MdButton>
      </Section>

      <CreateWebsiteDialog
        show={showCreateWebsite()}
        onClose={handleCloseCreateWebsite}
        onUpdate={handleUpdate}
      />
    </Page>
  );
}
