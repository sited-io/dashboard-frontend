import { MetaProvider } from "@solidjs/meta";
import { ParentProps, Show, Suspense, createResource } from "solid-js";

import { fetchSession } from "~/services/auth";
import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "./Layout.module.scss";
import { SignIn } from "./SignIn";

export function Layout(props: ParentProps) {
  const [session] = createResource(fetchSession);

  return (
    <MetaProvider>
      <Suspense>
        <Show when={session()?.isAuthenticated} fallback={<SignIn />}>
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
