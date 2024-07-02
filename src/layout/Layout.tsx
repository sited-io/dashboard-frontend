import {
  ParentProps,
  Show,
  Suspense,
  createEffect,
  createResource,
} from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import _ from "lodash";

import { userIndexPath } from "~/routes/user/(user)";
import { fetchSession } from "~/services/auth";
import { websiteService } from "~/services/website";
import { CreateWebsite } from "../components/websites/CreateWebsite";
import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "./Layout.module.scss";
import { SignIn } from "./SignIn";
import { useWebsiteContext } from "~/contexts/WebsiteContext";
import { Title } from "@solidjs/meta";
import { ResourceBoundary } from "~/components/layout/ResourceBoundary";

export function Layout(props: ParentProps) {
  const location = useLocation();
  const navigate = useNavigate();

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
