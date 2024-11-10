import _ from "lodash";
import {
  Context,
  ParentProps,
  createContext,
  createEffect,
  createResource,
  createSignal,
  useContext,
} from "solid-js";
import { isServer } from "solid-js/web";
import { fetchSession } from "~/services/auth";
import { WebsiteResponse } from "~/services/sited_io/websites/v1/website_pb";
import { websiteService } from "~/services/website";

const SELECTED_WEBSITE_STORAGE_KEY = "selected-website-storage-key";

type WebsiteContextType = ReturnType<typeof initialize>;

const WebsiteContext: Context<WebsiteContextType | undefined> = createContext();

export function WebsiteContextProvider(props: ParentProps) {
  return (
    <WebsiteContext.Provider value={initialize()}>
      {props.children}
    </WebsiteContext.Provider>
  );
}

export function useWebsiteContext() {
  const context = useContext(WebsiteContext);

  if (_.isNil(context)) {
    throw new Error("Must be wrapped in <WebsiteContextProvider>");
  }
  return context;
}

function initialize() {
  const [session] = createResource(fetchSession);
  const [websites, websitesActions] = createResource(
    () => session()?.userId,
    async (userId: string) => websiteService.listWebsites({ userId }),
  );
  const [selectedWebsiteId, _setSelectedWebsiteId] = createSignal<string>();
  const [selectedWebsite, selectedWebsiteActions] = createResource(
    selectedWebsiteId,
    async (websiteId: string) => {
      if (!_.isNil(websiteId) && !_.isEmpty(websiteId)) {
        return websiteService.getWebiste({ websiteId });
      }
    },
  );

  createEffect(() => {
    if (websites.state === "ready") {
      const _websites = websites();

      const foundWebsiteFromStore = getWebsiteFromStore(_websites);

      if (!_.isNil(foundWebsiteFromStore)) {
        setSelectedWebsite(foundWebsiteFromStore);
      } else {
        setSelectedWebsite(_.first(_websites));
      }
    }
  });

  function getWebsiteFromStore(websites: WebsiteResponse[] | undefined) {
    if (!isServer) {
      const storedWebsiteId = localStorage?.getItem(
        SELECTED_WEBSITE_STORAGE_KEY,
      );
      return websites?.find((w) => w.websiteId === storedWebsiteId);
    }
  }

  function setSelectedWebsite(website: WebsiteResponse | undefined) {
    _setSelectedWebsiteId(website?.websiteId);
    if (!isServer) {
      if (_.isNil(website)) {
        localStorage?.removeItem(SELECTED_WEBSITE_STORAGE_KEY);
      } else {
        localStorage?.setItem(SELECTED_WEBSITE_STORAGE_KEY, website.websiteId);
      }
    }
  }

  return {
    websites,
    refetchWebsites: websitesActions.refetch,
    selectedWebsite,
    selectedWebsiteId,
    refetchSelectedWebsite: selectedWebsiteActions.refetch,
    setSelectedWebsite,
  };
}
