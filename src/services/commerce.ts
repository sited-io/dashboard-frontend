import { PartialMessage, toPlainMessage } from "@bufbuild/protobuf";
import { createPromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import _ from "lodash";

import { OfferService } from "./sited_io/commerce/v1/offer_connect";
import {
  GetOfferRequest,
  ListOffersRequest,
  OfferResponse,
} from "./sited_io/commerce/v1/offer_pb";
import { ShopService } from "./sited_io/commerce/v1/shop_connect";
import { GetShopRequest, ShopResponse } from "./sited_io/commerce/v1/shop_pb";

const baseUrl = import.meta.env.VITE_SERIVCE_APIS_URL;

const shopClient = createPromiseClient(
  ShopService,
  createGrpcWebTransport({ baseUrl })
);

export const shopService = {
  getShop: async (request: PartialMessage<GetShopRequest>) => {
    "use server";
    const { shop } = await shopClient.getShop(request);
    if (_.isNil(shop)) {
      throw new Error("[shopService.getShop]: response was empty");
    }
    return toPlainMessage(shop) as ShopResponse;
  },
};

const offerClient = createPromiseClient(
  OfferService,
  createGrpcWebTransport({ baseUrl })
);

export const offerService = {
  getOffer: async (request: PartialMessage<GetOfferRequest>) => {
    "use server";
    const { offer } = await offerClient.getOffer(request);
    if (_.isNil(offer)) {
      throw new Error("[offerService.getOffer]: response was empty");
    }
    return toPlainMessage(offer) as OfferResponse;
  },
  listOffers: async (request: PartialMessage<ListOffersRequest>) => {
    "use server";
    const { offers } = await offerClient.listOffers(request);
    if (_.isNil(offers)) {
      throw new Error(`Could not fetch offers`);
    }
    return offers.map((o) => toPlainMessage(o)) as OfferResponse[];
  },
};
