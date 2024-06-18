import { PartialMessage, toPlainMessage } from "@bufbuild/protobuf";
import { createPromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import _ from "lodash";

import { withAuthHeader } from "./auth";
import { MediaService } from "./sited_io/media/v1/media_connect";
import {
  DownloadMediaRequest,
  ListAccessibleMediaRequest,
  MediaResponse,
} from "./sited_io/media/v1/media_pb";
import { MediaSubscriptionService } from "./sited_io/media/v1/media_subscription_connect";
import {
  CancelMediaSubscriptionRequest,
  GetMediaSubscriptionRequest,
  ListMediaSubscriptionsRequest,
  MediaSubscriptionResponse,
  ResumeMediaSubscriptionRequest,
} from "./sited_io/media/v1/media_subscription_pb";
import { PaginationResponse } from "./sited_io/pagination/v1/pagination_pb";

const baseUrl = import.meta.env.VITE_SERIVCE_APIS_URL;

const mediaSubscriptionClient = createPromiseClient(
  MediaSubscriptionService,
  createGrpcWebTransport({ baseUrl })
);

export const mediaSubscriptionService = {
  getMediaSubscription: async (
    request: PartialMessage<GetMediaSubscriptionRequest>
  ) => {
    "use server";
    const headers = await withAuthHeader();
    const { mediaSubscription } =
      await mediaSubscriptionClient.getMediaSubscription(request, {
        headers,
      });
    if (_.isNil(mediaSubscription)) {
      throw new Error(
        "[mediaSubscriptionService.getMediaSubscription]: response was empty"
      );
    }
    return toPlainMessage(mediaSubscription) as MediaSubscriptionResponse;
  },
  listMediaSubscriptions: async (
    request: PartialMessage<ListMediaSubscriptionsRequest>
  ) => {
    "use server";
    const headers = await withAuthHeader();
    const { mediaSubscriptions } =
      await mediaSubscriptionClient.listMediaSubscriptions(request, {
        headers,
      });
    if (_.isNil(mediaSubscriptions)) {
      throw new Error(
        "[mediaSubscriptionService.listMediaSubscriptions]: response was empty"
      );
    }
    return mediaSubscriptions.map((m) =>
      toPlainMessage(m)
    ) as MediaSubscriptionResponse[];
  },
  cancel: async (request: PartialMessage<CancelMediaSubscriptionRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await mediaSubscriptionClient.cancelMediaSubscription(request, { headers });
  },
  resume: async (request: PartialMessage<ResumeMediaSubscriptionRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await mediaSubscriptionClient.resumeMediaSubscription(request, { headers });
  },
};

const mediaClient = createPromiseClient(
  MediaService,
  createGrpcWebTransport({ baseUrl })
);

export const mediaService = {
  listAccessible: async (
    request: PartialMessage<ListAccessibleMediaRequest>
  ) => {
    "use server";
    const headers = await withAuthHeader();
    const res = await mediaClient.listAccessibleMedia(request, {
      headers,
    });
    if (_.isNil(res)) {
      throw new Error("[mediaService.listAccessible]: response was empty");
    }
    return {
      medias: res.medias.map((m) => toPlainMessage(m)) as MediaResponse[],
      pagination:
        res.pagination &&
        (toPlainMessage(res.pagination) as PaginationResponse),
    };
  },
  downloadMedia: async (request: PartialMessage<DownloadMediaRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    const { downloadUrl } = await mediaClient.downloadMedia(request, {
      headers,
    });
    if (_.isNil(downloadUrl)) {
      throw new Error("[mediaService.downloadMedia]: response was empty");
    }
    return downloadUrl;
  },
};
