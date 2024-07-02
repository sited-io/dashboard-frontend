import { useTransContext } from "@mbarzda/solid-i18next";
import { useNavigate } from "@solidjs/router";
import _ from "lodash";

import { Font } from "~/components/content/Font";
import { MdButton } from "~/components/form/MdButton";
import { Section } from "~/components/layout/Section";
import { SectionTitle } from "~/components/layout/SectionTitle";
import { TKEYS } from "~/locales";
import { signIn, signOut } from "~/services/auth";

export function SignIn() {
  const navigate = useNavigate();

  const [trans] = useTransContext();

  async function handleSignIn(register: boolean) {
    const clientId = import.meta.env.VITE_AUTH_OAUTH_CLIENT_ID;
    const redirectTo = location.href;
    const prompt = register ? "create" : undefined;
    const signInUrl = await signIn(clientId, redirectTo, prompt);
    if (!_.isNil(signInUrl)) {
      location.href = signInUrl.toString();
    } else {
      const signOutUrl = await signOut();
      if (!_.isNil(signOutUrl)) {
        location.href = signOutUrl.toString();
      } else {
        navigate("/");
      }
    }
  }

  return (
    <>
      <Section>
        <SectionTitle title={trans(TKEYS.user["sign-in-or-register"])} />

        <div>
          <MdButton type="filled" onClick={() => handleSignIn(false)}>
            <Font type="body" key={TKEYS.user["sign-in"]} />
          </MdButton>

          <MdButton type="filled" onClick={() => handleSignIn(true)}>
            <Font type="body" key={TKEYS.user.register} />
          </MdButton>
        </div>
      </Section>
    </>
  );
}
