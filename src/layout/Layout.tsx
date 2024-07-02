import { useLocation } from "@solidjs/router";
import _ from "lodash";
import { ParentProps, Show, createResource } from "solid-js";

import { Title } from "@solidjs/meta";
import { ResourceBoundary } from "~/components/layout/ResourceBoundary";
import { CreateWebsite } from "~/components/websites/CreateWebsite";
import { useWebsiteContext } from "~/contexts/WebsiteContext";
import { userIndexPath } from "~/routes/user/(user)";
import { fetchSession } from "~/services/auth";
import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "./Layout.module.scss";
import { SignIn } from "./SignIn";

export function Layout(props: ParentProps) {
  const location = useLocation();

  const [session] = createResource(fetchSession);
  const { websites, selectedWebsite } = useWebsiteContext();

  function websiteName() {
    const name = selectedWebsite()?.name;
    return name ? name + " -" : "";
  }

  function isProfilePath() {
    return location.pathname === userIndexPath();
  }

  function hasWebsite() {
    return !_.isEmpty(websites());
  }

  return (
    <>
      <Title>Dashboard -{websiteName()} sited.io</Title>

      <ResourceBoundary resource={session}>
        <Show when={session()?.isAuthenticated} fallback={<SignIn />}>
          <ResourceBoundary resource={websites}>
            <Header hasWebsite={hasWebsite()} />

            <main class={styles.Main}>
              <div class={styles.Content}>
                <Show
                  when={isProfilePath() || hasWebsite()}
                  fallback={<CreateWebsite />}
                >
                  {props.children}
                </Show>
              </div>
            </main>

            <Footer />
          </ResourceBoundary>
        </Show>
      </ResourceBoundary>
    </>
  );
}
