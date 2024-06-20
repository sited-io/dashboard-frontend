import { useNavigate } from "@solidjs/router";
import _ from "lodash";

import { Font } from "~/components/content/Font";
import { MdButton } from "~/components/form/MdButton";
import { Section } from "~/components/layout/Section";
import { TKEYS } from "~/locales";
import { signIn, signOut } from "~/services/auth";

export function SignIn() {
  const navigate = useNavigate();

  async function handleSignIn() {
    const clientId = import.meta.env.VITE_AUTH_OAUTH_CLIENT_ID;
    const redirectTo = location.href;
    const signInUrl = await signIn(clientId, redirectTo);
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
      <Section centered padded>
        <div>
          <p>Please Login or Register</p>
        </div>

        <div>
          <MdButton type="filled" onClick={handleSignIn}>
            <Font type="body" key={TKEYS.user["sign-in"]} />
          </MdButton>
        </div>
      </Section>
    </>
  );
}
