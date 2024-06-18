import { MetaProvider } from "@solidjs/meta";
import { ParentProps, Show, Suspense, createResource } from "solid-js";
import { useNavigate } from "@solidjs/router";
import _ from "lodash";

import { Font } from "~/components/content/Font";
import { MdButton } from "~/components/form/MdButton";
import { Section } from "~/components/layout/Section";
import { TKEYS } from "~/locales";
import { fetchSession, signIn, signOut } from "~/services/auth";
import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "./Layout.module.scss";

export function Layout(props: ParentProps) {
  const navigate = useNavigate();

  const [session] = createResource(fetchSession);

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
    <MetaProvider>
      <Suspense>
        <Show
          when={session()?.isAuthenticated}
          fallback={
            <div>
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
            </div>
          }
        >
          <div class="light">
            <Header />

            <main class={styles.Main}>
              <div class={styles.Content}>{props.children}</div>
            </main>

            <Footer />
          </div>
        </Show>
      </Suspense>
    </MetaProvider>
  );
}
