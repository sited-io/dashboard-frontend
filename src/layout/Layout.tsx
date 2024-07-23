import { Title } from "@solidjs/meta";
import { RouteSectionProps } from "@solidjs/router";
import { Show, createResource } from "solid-js";

import { ResourceBoundary } from "~/components/layout/ResourceBoundary";
import { useWebsiteContext } from "~/contexts/WebsiteContext";
import { fetchSession } from "~/services/auth";
import { SignIn } from "./SignIn";

export function Layout(props: RouteSectionProps<any>) {
  const [session] = createResource(fetchSession);
  const { websites, selectedWebsite } = useWebsiteContext();

  function websiteName() {
    const name = selectedWebsite()?.name;
    return name ? name + " -" : "";
  }

  return (
    <>
      <Title>Dashboard -{websiteName()} sited.io</Title>

      <ResourceBoundary resource={session}>
        <Show when={session()?.isAuthenticated} fallback={<SignIn />}>
          <ResourceBoundary resource={websites}>
            {props.children}
          </ResourceBoundary>
        </Show>
      </ResourceBoundary>
    </>
  );
}
