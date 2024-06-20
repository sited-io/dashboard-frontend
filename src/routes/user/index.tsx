import { A, useNavigate } from "@solidjs/router";
import _ from "lodash";
import { createResource } from "solid-js";

import { Font } from "~/components/content/Font";
import { MdButton } from "~/components/form/MdButton";
import { Section } from "~/components/layout/Section";
import { buildUrl } from "~/lib/env";
import { TKEYS } from "~/locales";
import { fetchSession, signOut } from "~/services/auth";
import { createWebsitePath } from "../create-website";

export const userIndexPath = "/user";
export const userIndexUrl = () => buildUrl(userIndexPath);

export default function UserIndex() {
  const navigate = useNavigate();

  const [session] = createResource(fetchSession);

  async function handleSignOut() {
    const signOutUrl = await signOut();
    if (!_.isNil(signOutUrl)) {
      location.href = signOutUrl.toString();
    } else {
      navigate("/");
    }
  }

  return (
    <>
      <Section>User: {session()?.userId}</Section>

      <Section centered>
        <MdButton type="filled" href={createWebsitePath}>
          Create a new Website
        </MdButton>
      </Section>

      <Section centered>
        <MdButton type="outlined" square onClick={handleSignOut}>
          <Font type="body" key={TKEYS.user["sign-out"]} />
        </MdButton>
      </Section>
    </>
  );
}
