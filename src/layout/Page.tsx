import { useLocation } from "@solidjs/router";
import _ from "lodash";
import { ParentProps, Show } from "solid-js";

import { CreateWebsite } from "~/components/websites/CreateWebsite";
import { useWebsiteContext } from "~/contexts/WebsiteContext";
import { userIndexPath } from "~/routes/user/(user)";
import { Footer } from "./Footer";
import { Header } from "./Header";

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

      <main class="w-full bg-slate-100 text-slate-900">
        <div class="max-w-screen-lg min-h-screen my-0 mx-auto pt-14 box-border">
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
