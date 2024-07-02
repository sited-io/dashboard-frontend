import { PartialMessage, toPlainMessage } from "@bufbuild/protobuf";
import { createPromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import _ from "lodash";

import { withAuthHeader } from "./auth";
import { OfferService } from "./sited_io/commerce/v1/offer_connect";
import {
  AddImageToOfferRequest,
  CreateOfferRequest,
  DeleteOfferRequest,
  GetOfferRequest,
  ListOffersRequest,
  OfferResponse,
  PutPriceToOfferRequest,
  RemoveImageFromOfferRequest,
  RemovePriceFromOfferRequest,
  UpdateOfferRequest,
} from "./sited_io/commerce/v1/offer_pb";
import { ShippingRateService } from "./sited_io/commerce/v1/shipping_rate_connect";
import {
  DeleteShippingRateRequest,
  GetShippingRateRequest,
  PutShippingRateRequest,
  ShippingRateResponse,
} from "./sited_io/commerce/v1/shipping_rate_pb";
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
    const headers = await withAuthHeader();
    const { shop } = await shopClient.getShop(request, { headers });
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
  createOffer: async (request: PartialMessage<CreateOfferRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    const { offer } = await offerClient.createOffer(request, { headers });
    if (_.isNil(offer)) {
      throw new Error("[offerService.createOffer]: response was empty");
    }
    return toPlainMessage(offer) as OfferResponse;
  },
  getOffer: async (request: PartialMessage<GetOfferRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    const { offer } = await offerClient.getOffer(request, { headers });
    if (_.isNil(offer)) {
      throw new Error("[offerService.getOffer]: response was empty");
    }
    return toPlainMessage(offer) as OfferResponse;
  },
  listOffers: async (request: PartialMessage<ListOffersRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    const { offers } = await offerClient.listOffers(request, { headers });
    if (_.isNil(offers)) {
      throw new Error(`[offerService.listOffers]: response was empty`);
    }
    return offers.map((o) => toPlainMessage(o)) as OfferResponse[];
  },
  updateOffer: async (request: PartialMessage<UpdateOfferRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    const { offer } = await offerClient.updateOffer(request, { headers });
    if (_.isNil(offer)) {
      throw new Error("[offerService.updateOffer]: response was empty");
    }
    return toPlainMessage(offer) as OfferResponse;
  },
  addImageToOffer: async (request: PartialMessage<AddImageToOfferRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await offerClient.addImageToOffer(request, { headers });
  },
  removeImageFromOffer: async (
    request: PartialMessage<RemoveImageFromOfferRequest>
  ) => {
    "use server";
    const headers = await withAuthHeader();
    await offerClient.removeImageFromOffer(request, { headers });
  },
  putPriceToOffer: async (request: PartialMessage<PutPriceToOfferRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await offerClient.putPriceToOffer(request, { headers });
  },
  removePriceFromOffer: async (
    request: PartialMessage<RemovePriceFromOfferRequest>
  ) => {
    "use server";
    const headers = await withAuthHeader();
    await offerClient.removePriceFromOffer(request, { headers });
  },
  deleteOffer: async (request: PartialMessage<DeleteOfferRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await offerClient.deleteOffer(request, { headers });
  },
};

const shippingRateClient = createPromiseClient(
  ShippingRateService,
  createGrpcWebTransport({ baseUrl })
);

export const shippingRateService = {
  putShippingRate: async (request: PartialMessage<PutShippingRateRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await shippingRateClient.putShippingRate(request, {
      headers,
    });
  },
  getShippingRate: async (request: PartialMessage<GetShippingRateRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    const { shippingRate } = await shippingRateClient.getShippingRate(request, {
      headers,
    });
    if (_.isNil(shippingRate)) {
      throw new Error(
        "[shippingRateService.getShippingRate]: response was empty"
      );
    }
    return toPlainMessage(shippingRate) as ShippingRateResponse;
  },
  deleteShippingRate: async (
    request: PartialMessage<DeleteShippingRateRequest>
  ) => {
    "use server";
    const headers = await withAuthHeader();
    await shippingRateClient.deleteShippingRate(request, { headers });
  },
};
