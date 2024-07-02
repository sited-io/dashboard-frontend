import { createPromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { PartialMessage, toPlainMessage } from "@bufbuild/protobuf";
import _ from "lodash";

import { StripeService } from "./sited_io/payment/v1/stripe_connect";
import {
  CreateAccountLinkRequest,
  CreateAccountRequest,
  CreateCheckoutSessionRequest,
  GetAccountDetailsRequest,
  GetAccountRequest,
  StripeAccount,
  StripeAccountDetails,
} from "./sited_io/payment/v1/stripe_pb";
import { withAuthHeader } from "./auth";

const baseUrl = import.meta.env.VITE_SERIVCE_APIS_URL;

const stripeClient = createPromiseClient(
  StripeService,
  createGrpcWebTransport({ baseUrl })
);

export const stripeService = {
  createAccount: async (request: PartialMessage<CreateAccountRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    const { account } = await stripeClient.createAccount(request, { headers });
    if (_.isNil(account)) {
      throw new Error("[stripeService.createAccount]: response was empty");
    }
    return toPlainMessage(account) as StripeAccount;
  },
  createAccountLink: async (
    request: PartialMessage<CreateAccountLinkRequest>
  ) => {
    "use server";
    const headers = await withAuthHeader();
    const { link } = await stripeClient.createAccountLink(request, { headers });
    if (_.isNil(link)) {
      throw new Error("[stripeService.createAccountLink]: response was empty");
    }
    return link;
  },
  getAccount: async (request: PartialMessage<GetAccountRequest>) => {
    const { account } = await stripeClient.getAccount(request);
    if (_.isNil(account)) {
      throw new Error("[stripeService.getAccount]: response was empty");
    }
    return toPlainMessage(account) as StripeAccount;
  },
  getAccountDetails: async (
    request: PartialMessage<GetAccountDetailsRequest>
  ) => {
    "use server";
    const headers = await withAuthHeader();
    const { account, details } = await stripeClient.getAccountDetails(request, {
      headers,
    });
    if (_.isNil(account) || _.isNil(details)) {
      throw new Error("[stripeService.getAccountDetails]: response was empty");
    }
    return {
      account: toPlainMessage(account) as StripeAccount,
      details: toPlainMessage(details) as StripeAccountDetails,
    };
  },
  createCheckoutSession: async (
    request: PartialMessage<CreateCheckoutSessionRequest>
  ) => {
    const { link } = await stripeClient.createCheckoutSession(request);
    if (_.isNil(link)) {
      throw new Error(
        "[stripeService.createCheckoutSession]: response was empty"
      );
    }
    return link;
  },
};
