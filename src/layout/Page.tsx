import { useLocation } from "@solidjs/router";
import _ from "lodash";
import { ParentProps, Show } from "solid-js";

import { CreateWebsite } from "~/components/websites/CreateWebsite";
import { useWebsiteContext } from "~/contexts/WebsiteContext";
import { userIndexPath } from "~/routes/user/(user)";
import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "./Page.module.scss";

type Props = {} & ParentProps;

export function Page(props: Props) {
  const location = useLocation();

  const { websites } = useWebsiteContext();

  function isProfilePath() {
    return location.pathname === userIndexPath();
  }

  function hasWebsite() {
    return !_.isEmpty(websites());
  }

  return (
    <>
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
    </>
  );
}
