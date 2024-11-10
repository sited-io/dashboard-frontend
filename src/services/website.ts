import { PartialMessage, toPlainMessage } from "@bufbuild/protobuf";
import { createPromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import _ from "lodash";

import { PageService } from "./sited_io/websites/v1/page_connect";
import {
  CreatePageRequest,
  DeletePageRequest,
  GetPageRequest,
  ListPagesRequest,
  ListPagesResponse,
  PageResponse,
  UpdatePageRequest,
} from "./sited_io/websites/v1/page_pb";
import { WebsiteService } from "./sited_io/websites/v1/website_connect";
import {
  CreateWebsiteRequest,
  DeleteWebsiteRequest,
  GetWebsiteRequest,
  ListWebsitesRequest,
  UpdateWebsiteRequest,
  WebsiteResponse,
} from "./sited_io/websites/v1/website_pb";
import { withAuthHeader } from "./auth";
import { CustomizationService } from "./sited_io/websites/v1/customization_connect";
import {
  PutLogoImageRequest,
  RemoveLogoImageRequest,
  UpdateCustomizationRequest,
} from "./sited_io/websites/v1/customization_pb";
import { DomainService } from "./sited_io/websites/v1/domain_connect";
import {
  CheckDomainStatusRequest,
  CreateDomainRequest,
  DeleteDomainRequest,
  DomainResponse,
} from "./sited_io/websites/v1/domain_pb";
import { StaticPageService } from "./sited_io/websites/v1/static_page_connect";
import {
  GetStaticPageRequest,
  StaticPageResponse,
  UpdateStaticPageRequest,
} from "./sited_io/websites/v1/static_page_pb";

const baseUrl = import.meta.env.VITE_SERIVCE_APIS_URL;

const websiteClient = createPromiseClient(
  WebsiteService,
  createGrpcWebTransport({ baseUrl }),
);

export const websiteService = {
  createWebsite: async (request: PartialMessage<CreateWebsiteRequest>) => {
    const headers = await withAuthHeader();
    const { website } = await websiteClient.createWebsite(request, { headers });
    if (_.isNil(website)) {
      throw new Error("[websiteService: response was empty");
    }
    return toPlainMessage(website) as WebsiteResponse;
  },
  getWebiste: async (request: PartialMessage<GetWebsiteRequest>) => {
    const { website } = await websiteClient.getWebsite(request);
    if (_.isNil(website)) {
      throw new Error("[websiteService]: response was empty");
    }
    return toPlainMessage(website) as WebsiteResponse;
  },
  listWebsites: async (request: PartialMessage<ListWebsitesRequest>) => {
    try {
      const { websites } = await websiteClient.listWebsites(request);
      if (_.isNil(websites)) {
        throw new Error("[websiteService]: response was nil");
      }
      return websites.map(toPlainMessage) as WebsiteResponse[];
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  updateWebsite: async (request: PartialMessage<UpdateWebsiteRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await websiteClient.updateWebsite(request, { headers });
  },
  deleteWebsite: async (request: PartialMessage<DeleteWebsiteRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await websiteClient.deleteWebsite(request, { headers });
  },
};

const customizationClient = createPromiseClient(
  CustomizationService,
  createGrpcWebTransport({ baseUrl }),
);

export const customizationService = {
  updateCustomization: async (
    request: PartialMessage<UpdateCustomizationRequest>,
  ) => {
    "use server";
    const headers = await withAuthHeader();
    await customizationClient.updateCustomization(request, { headers });
  },
  putLogoImage: async (request: PartialMessage<PutLogoImageRequest>) => {
    const headers = await withAuthHeader();
    await customizationClient.putLogoImage(request, { headers });
  },
  removeLogoImage: async (request: PartialMessage<RemoveLogoImageRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await customizationClient.removeLogoImage(request, { headers });
  },
};

const pageClient = createPromiseClient(
  PageService,
  createGrpcWebTransport({ baseUrl }),
);

export const pageService = {
  createPage: async (request: PartialMessage<CreatePageRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    const { page } = await pageClient.createPage(request, {
      headers,
    });
    if (_.isNil(page)) {
      throw new Error("[pageService.createPage]: response was empty");
    }
    return toPlainMessage(page) as PageResponse;
  },
  getPage: async (request: PartialMessage<GetPageRequest>) => {
    const { page } = await pageClient.getPage(request);
    if (_.isNil(page)) {
      throw new Error("[pageService.getPage]: response was empty");
    }
    return toPlainMessage(page) as PageResponse;
  },
  listPages: async (request: PartialMessage<ListPagesRequest>) => {
    const { pages, pagination } = await pageClient.listPages(request);
    return {
      pages: pages.map(toPlainMessage),
      pagination: pagination && toPlainMessage(pagination),
    } as ListPagesResponse;
  },
  updatePage: async (request: PartialMessage<UpdatePageRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    const { page } = await pageClient.updatePage(request, { headers });
    if (_.isNil(page)) {
      throw new Error("[pageService.updatePage]: response was empty");
    }
    return toPlainMessage(page) as PageResponse;
  },
  deletePage: async (request: PartialMessage<DeletePageRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await pageClient.deletePage(request, { headers });
  },
};

const domainClient = createPromiseClient(
  DomainService,
  createGrpcWebTransport({ baseUrl }),
);

export const domainService = {
  createDomain: async (request: PartialMessage<CreateDomainRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    const { domain } = await domainClient.createDomain(request, { headers });
    if (_.isNil(domain)) {
      throw new Error("[domainService.createDomain]: response was empty");
    }
    return toPlainMessage(domain) as DomainResponse;
  },
  checkDomainStatus: async (
    request: PartialMessage<CheckDomainStatusRequest>,
  ) => {
    "use server";
    const headers = await withAuthHeader();
    const { domain } = await domainClient.checkDomainStatus(request, {
      headers,
    });
    if (_.isNil(domain)) {
      throw new Error("[domainService.checkDomainStatus]: response was empty");
    }
    return toPlainMessage(domain) as DomainResponse;
  },
  deleteDomain: async (request: PartialMessage<DeleteDomainRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await domainClient.deleteDomain(request, { headers });
  },
};

const staticPageClient = createPromiseClient(
  StaticPageService,
  createGrpcWebTransport({ baseUrl }),
);

export const staticPageService = {
  getStaticPage: async (request: PartialMessage<GetStaticPageRequest>) => {
    const { staticPage } = await staticPageClient.getStaticPage(request);
    if (_.isNil(staticPage)) {
      throw new Error("[staticPageService.getStaticPage]: response was empty");
    }
    return toPlainMessage(staticPage) as StaticPageResponse;
  },
  updateStaticPage: async (
    request: PartialMessage<UpdateStaticPageRequest>,
  ) => {
    "use server";
    const headers = await withAuthHeader();
    await staticPageClient.updateStaticPage(request, { headers });
  },
};
