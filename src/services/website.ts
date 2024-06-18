import { PartialMessage, toPlainMessage } from "@bufbuild/protobuf";
import { createPromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import _ from "lodash";

import { PageService } from "./sited_io/websites/v1/page_connect";
import { GetPageRequest, PageResponse } from "./sited_io/websites/v1/page_pb";
import { WebsiteService } from "./sited_io/websites/v1/website_connect";
import {
  GetWebsiteRequest,
  WebsiteResponse,
} from "./sited_io/websites/v1/website_pb";

const baseUrl = import.meta.env.VITE_SERIVCE_APIS_URL;

const websiteClient = createPromiseClient(
  WebsiteService,
  createGrpcWebTransport({ baseUrl })
);

export const websiteService = {
  getWebiste: async (request: PartialMessage<GetWebsiteRequest>) => {
    "use server";
    const { website } = await websiteClient.getWebsite(request);
    if (_.isNil(website)) {
      throw new Error("[websiteService]: response was empty");
    }
    return toPlainMessage(website) as WebsiteResponse;
  },
};

const pageClient = createPromiseClient(
  PageService,
  createGrpcWebTransport({ baseUrl })
);

export const pageService = {
  getPage: async (request: PartialMessage<GetPageRequest>) => {
    "use server";
    const { page } = await pageClient.getPage(request);
    if (_.isNil(page)) {
      throw new Error("[pageService.getPage]: response was empty");
    }
    return toPlainMessage(page) as PageResponse;
  },
};
