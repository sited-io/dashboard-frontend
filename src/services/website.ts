import { PartialMessage, toPlainMessage } from "@bufbuild/protobuf";
import { createPromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import _ from "lodash";

import { PageService } from "./sited_io/websites/v1/page_connect";
import {
  GetPageRequest,
  ListPagesRequest,
  ListPagesResponse,
  PageResponse,
} from "./sited_io/websites/v1/page_pb";
import { WebsiteService } from "./sited_io/websites/v1/website_connect";
import {
  GetWebsiteRequest,
  ListWebsitesRequest,
  WebsiteResponse,
} from "./sited_io/websites/v1/website_pb";

const baseUrl = import.meta.env.VITE_SERIVCE_APIS_URL;

const websiteClient = createPromiseClient(
  WebsiteService,
  createGrpcWebTransport({ baseUrl })
);

export const websiteService = {
  async getWebiste(request: PartialMessage<GetWebsiteRequest>) {
    "use server";
    const { website } = await websiteClient.getWebsite(request);
    if (_.isNil(website)) {
      throw new Error("[websiteService]: response was empty");
    }
    return toPlainMessage(website) as WebsiteResponse;
  },
  async listWebsites(request: PartialMessage<ListWebsitesRequest>) {
    try {
      const { webistes } = await websiteClient.listWebsites(request);
      if (_.isNil(webistes)) {
        throw new Error("[websiteService]: response was nil");
      }
      return webistes.map((w) => toPlainMessage(w)) as WebsiteResponse[];
    } catch (err) {
      console.error(err);
      return [];
    }
  },
};

const pageClient = createPromiseClient(
  PageService,
  createGrpcWebTransport({ baseUrl })
);

export const pageService = {
  async getPage(request: PartialMessage<GetPageRequest>) {
    "use server";
    const { page } = await pageClient.getPage(request);
    if (_.isNil(page)) {
      throw new Error("[pageService.getPage]: response was empty");
    }
    return toPlainMessage(page) as PageResponse;
  },
  async listPages(request: PartialMessage<ListPagesRequest>) {
    "use server";
    const { pages, pagination } = await pageClient.listPages(request);
    return {
      pages: pages.map((p) => toPlainMessage(p)),
      pagination: pagination && toPlainMessage(pagination),
    } as ListPagesResponse;
  },
};
