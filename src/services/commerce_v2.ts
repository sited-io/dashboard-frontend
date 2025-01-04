import { createClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import _ from "lodash";

import { withAuthHeader } from "./auth";
import { CommerceService } from "./sited_io/commerce/v2/commerce_service_connect";
import {
  AddFileToOfferRequest,
  AddImageToOfferRequest,
  CreateOfferRequest,
  CreateShopRequest,
  DeleteOfferRequest,
  DownloadFileRequest,
  GetOfferRequest,
  GetShopRequest,
  InitiateMultipartUploadRequest,
  ListOffersRequest,
  PutPriceToOfferRequest,
  PutShippingRateToOfferRequest,
  RemoveFileFromOfferRequest,
  RemoveImageFromOfferRequest,
  RemovePriceFromOfferRequest,
  RemoveShippingRateFromOfferRequest,
  UpdateFileOrderingRequest,
  UpdateImageOrderingRequest,
  UpdateOfferRequest,
  CompleteMultipartUploadRequest,
  PutMultipartChunkRequest,
  DeleteShopRequest,
  AddOfferToShopRequest,
  RemoveOfferFromShopRequest,
  GetOrderRequest,
  ListOrdersRequest,
  CreateStripeAccountRequest,
  GetStripeAccountRequest,
  BuyOfferRequest,
  BuyOfferResponse,
  CancelSubscriptionRequest,
  ResumeSubscriptionRequest,
} from "./sited_io/commerce/v2/commerce_service_pb";
import { Offer } from "./sited_io/commerce/v2/offer_pb";
import { Shop } from "./sited_io/commerce/v2/shop_pb";
import { Order } from "./sited_io/commerce/v2/order_pb";
import { StripeAccount } from "./sited_io/commerce/v2/stripe_pb";

const baseUrl = import.meta.env.VITE_SERVICE_APIS_URL;

const commerceV2Client = createClient(
  CommerceService,
  createGrpcWebTransport({ baseUrl }),
);

export const commerceV2Service = {
  createOffer: async (request: Partial<CreateOfferRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    const { offer } = await commerceV2Client.createOffer(request, { headers });
    if (_.isNil(offer)) {
      throw new Error("[commerceV2Service.createOffer]: response was empty");
    }
    return _.toPlainObject(offer) as Offer;
  },
  getOffer: async (request: Partial<GetOfferRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    const { offer } = await commerceV2Client.getOffer(request, { headers });
    if (_.isNil(offer)) {
      throw new Error("[offerService.getOffer]: response was empty");
    }
    return _.toPlainObject(offer) as Offer;
  },
  listOffers: async (request: Partial<ListOffersRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    const { offers } = await commerceV2Client.listOffers(request, { headers });
    if (_.isNil(offers)) {
      throw new Error(`[offerService.listOffers]: response was empty`);
    }
    return offers.map((o) => _.toPlainObject(o)) as Offer[];
  },
  updateOffer: async (request: Partial<UpdateOfferRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    const { offer } = await commerceV2Client.updateOffer(request, { headers });
    if (_.isNil(offer)) {
      throw new Error("[offerService.updateOffer]: response was empty");
    }
    return _.toPlainObject(offer) as Offer;
  },
  deleteOffer: async (request: Partial<DeleteOfferRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.deleteOffer(request, { headers });
  },
  putPriceToOffer: async (request: Partial<PutPriceToOfferRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.putPriceToOffer(request, { headers });
  },
  removePriceFromOffer: async (
    request: Partial<RemovePriceFromOfferRequest>,
  ) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.removePriceFromOffer(request, { headers });
  },
  putShippingRateToOffer: async (
    request: Partial<PutShippingRateToOfferRequest>,
  ) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.putShippingRateToOffer(request, { headers });
  },
  removeShippingRateFromOffer: async (
    request: Partial<RemoveShippingRateFromOfferRequest>,
  ) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.removeShippingRateFromOffer(request, { headers });
  },
  addImageToOffer: async (request: Partial<AddImageToOfferRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.addImageToOffer(request, { headers });
  },
  updateImageOrdering: async (request: Partial<UpdateImageOrderingRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.updateImageOrdering(request, { headers });
  },
  removeImageFromOffer: async (
    request: Partial<RemoveImageFromOfferRequest>,
  ) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.removeImageFromOffer(request, { headers });
  },
  addFileToOffer: async (request: Partial<AddFileToOfferRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.addFileToOffer(request, { headers });
  },
  initiateMultipartUpload: async (
    request: Partial<InitiateMultipartUploadRequest>,
  ) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.initiateMultipartUpload(request, { headers });
  },
  putMultipartChunk: async (request: Partial<PutMultipartChunkRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.putMultipartChunk(request, { headers });
  },
  completeMultipartUpload: async (
    request: Partial<CompleteMultipartUploadRequest>,
  ) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.completeMultipartUpload(request, { headers });
  },
  downloadFile: async (request: Partial<DownloadFileRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.downloadFile(request, { headers });
  },
  updateFileOrdering: async (request: Partial<UpdateFileOrderingRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.updateFileOrdering(request, { headers });
  },
  removeFileFromOffer: async (request: Partial<RemoveFileFromOfferRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.removeFileFromOffer(request, { headers });
  },
  createShop: async (request: Partial<CreateShopRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.createShop(request, { headers });
  },
  getShop: async (request: Partial<GetShopRequest>) => {
    const { shop } = await commerceV2Client.getShop(request);
    if (_.isNil(shop)) {
      throw new Error("[commerceV2Service.getShop]: response was empty");
    }
    return _.toPlainObject(shop) as Shop;
  },
  deleteShop: async (request: Partial<DeleteShopRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.deleteShop(request, { headers });
  },
  addOfferToShop: async (request: Partial<AddOfferToShopRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.addOfferToShop(request, { headers });
  },
  removeOfferFromShop: async (request: Partial<RemoveOfferFromShopRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.removeOfferFromShop(request, { headers });
  },
  getOrder: async (request: Partial<GetOrderRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    const { order } = await commerceV2Client.getOrder(request, { headers });
    if (_.isNil(order)) {
      throw new Error("[commerceV2Service.getOrder]: response was empty");
    }
    return _.toPlainObject(order) as Order;
  },
  listOrders: async (request: Partial<ListOrdersRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    const { orders } = await commerceV2Client.listOrders(request, {
      headers,
    });
    return orders.map((o) => _.toPlainObject(o)) as Order[];
  },
  createStripeAccount: async (request: Partial<CreateStripeAccountRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.createStripeAccount(request, { headers });
  },
  getStripeAccount: async (request: Partial<GetStripeAccountRequest>) => {
    "use server";
    const { stripeAccount } = await commerceV2Client.getStripeAccount(request);
    if (_.isNil(stripeAccount)) {
      throw new Error(
        "[commerceV2Service.getStripeAccount]: response was empty",
      );
    }
    return _.toPlainObject(stripeAccount) as StripeAccount;
  },
  buyOffer: async (request: Partial<BuyOfferRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    const res = await commerceV2Client.buyOffer(request, { headers });
    if (_.isNil(res)) {
      throw new Error("[commerceV2Service.buyOffer]: response was empty");
    }
    return _.toPlainObject(res) as BuyOfferResponse;
  },
  cancelSubscription: async (request: Partial<CancelSubscriptionRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.cancelSubscription(request, { headers });
  },
  resumeSubscription: async (request: Partial<ResumeSubscriptionRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await commerceV2Client.resumeSubscription(request, { headers });
  },
};
