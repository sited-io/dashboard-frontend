import _ from "lodash";
import {
  Context,
  ParentProps,
  createContext,
  createSignal,
  useContext,
} from "solid-js";
import { isServer } from "solid-js/web";
import { WebsiteResponse } from "~/services/sited_io/websites/v1/website_pb";

const SELECTED_WEBSITE_STORAGE_KEY = "selected-website-storage-key";

type WebsiteContextType = ReturnType<typeof initialize>;

const WebsiteContext: Context<WebsiteContextType> = createContext(initialize());

export function WebsiteContextProvider(props: ParentProps) {
  return (
    <WebsiteContext.Provider value={useContext(WebsiteContext)}>
      {props.children}
    </WebsiteContext.Provider>
  );
}

export function useWebsiteContext() {
  if (_.isNil(WebsiteContext)) {
    throw new Error("Must be wrapped in <WebsiteContextProvider>");
  }
  return useContext(WebsiteContext);
}

function initialize() {
  const [websites, _setWebsites] = createSignal<WebsiteResponse[]>([]);
  const [selectedWebsite, _setSelectedWebsite] =
    createSignal<WebsiteResponse>();

  function setWebsites(w: WebsiteResponse[] | undefined) {
    if (!_.isNil(w) && !_.isEmpty(w)) {
      _setWebsites(w);
      if (!isServer) {
        const selectedWebsiteId = localStorage?.getItem(
          SELECTED_WEBSITE_STORAGE_KEY
        );
        if (!_.isNil(selectedWebsiteId)) {
          _setSelectedWebsite(w.find((w) => w.websiteId === selectedWebsiteId));
        }
      }
    }
  }

  function setSelectedWebsite(w: WebsiteResponse | undefined) {
    _setSelectedWebsite(w);
    if (!isServer) {
      if (_.isNil(w)) {
        localStorage?.removeItem(SELECTED_WEBSITE_STORAGE_KEY);
      } else {
        localStorage?.setItem(SELECTED_WEBSITE_STORAGE_KEY, w.websiteId);
      }
    }
  }

  return {
    websites,
    setWebsites,
    selectedWebsite,
    setSelectedWebsite,
  };
}
