import { PartialMessage, toPlainMessage } from "@bufbuild/protobuf";
import { createPromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import _ from "lodash";

import { withAuthHeader } from "./auth";
import { MediaService } from "./sited_io/media/v1/media_connect";
import {
  AddMediaToOfferRequest,
  CompleteMultipartUploadRequest,
  CreateMediaRequest,
  DeleteMediaRequest,
  DownloadMediaRequest,
  InitiateMultipartUploadRequest,
  InitiateMultipartUploadResponse,
  ListAccessibleMediaRequest,
  ListMediaRequest,
  ListMediaResponse,
  MediaResponse,
  Part,
  PutMultipartChunkRequest,
  RemoveMediaFromOfferRequest,
  UpdateMediaOfferOrderingRequest,
  UpdateMediaRequest,
} from "./sited_io/media/v1/media_pb";
import { MediaSubscriptionService } from "./sited_io/media/v1/media_subscription_connect";
import {
  CancelMediaSubscriptionRequest,
  GetMediaSubscriptionRequest,
  ListMediaSubscriptionsRequest,
  MediaSubscriptionResponse,
  ResumeMediaSubscriptionRequest,
} from "./sited_io/media/v1/media_subscription_pb";
import { PaginationResponse } from "./sited_io/types/query/v1/query_pb";

const baseUrl = import.meta.env.VITE_SERIVCE_APIS_URL;

const mediaSubscriptionClient = createPromiseClient(
  MediaSubscriptionService,
  createGrpcWebTransport({ baseUrl }),
);

export const mediaSubscriptionService = {
  getMediaSubscription: async (
    request: PartialMessage<GetMediaSubscriptionRequest>,
  ) => {
    "use server";
    const headers = await withAuthHeader();
    const { mediaSubscription } =
      await mediaSubscriptionClient.getMediaSubscription(request, {
        headers,
      });
    if (_.isNil(mediaSubscription)) {
      throw new Error(
        "[mediaSubscriptionService.getMediaSubscription]: response was empty",
      );
    }
    return toPlainMessage(mediaSubscription) as MediaSubscriptionResponse;
  },
  listMediaSubscriptions: async (
    request: PartialMessage<ListMediaSubscriptionsRequest>,
  ) => {
    "use server";
    const headers = await withAuthHeader();
    const { mediaSubscriptions } =
      await mediaSubscriptionClient.listMediaSubscriptions(request, {
        headers,
      });
    if (_.isNil(mediaSubscriptions)) {
      throw new Error(
        "[mediaSubscriptionService.listMediaSubscriptions]: response was empty",
      );
    }
    return mediaSubscriptions.map((m) =>
      toPlainMessage(m),
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
  createGrpcWebTransport({ baseUrl }),
);

export const mediaService = {
  createMedia: async (request: PartialMessage<CreateMediaRequest>) => {
    const headers = await withAuthHeader();
    const { media } = await mediaClient.createMedia(request, { headers });
    if (_.isNil(media)) {
      throw new Error("[mediaService.createMedia]: response was empty");
    }
    return toPlainMessage(media) as MediaResponse;
  },
  initiateMultipartUpload: async (
    request: PartialMessage<InitiateMultipartUploadRequest>,
  ) => {
    const headers = await withAuthHeader();
    const res = await mediaClient.initiateMultipartUpload(request, { headers });
    return toPlainMessage(res) as InitiateMultipartUploadResponse;
  },
  putMultipartChunk: async (
    request: PartialMessage<PutMultipartChunkRequest>,
  ) => {
    const headers = await withAuthHeader();
    const { part } = await mediaClient.putMultipartChunk(request, { headers });
    if (_.isNil(part)) {
      throw new Error("[mediaService.putMultipartChunk]: reaponse was empty");
    }
    return toPlainMessage(part) as Part;
  },
  completeMultipartUpload: async (
    request: PartialMessage<CompleteMultipartUploadRequest>,
  ) => {
    const headers = await withAuthHeader();
    await mediaClient.completeMultipartUpload(request, { headers });
  },
  listMedia: async (request: PartialMessage<ListMediaRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    const { medias, pagination } = await mediaClient.listMedia(request, {
      headers,
    });
    return {
      medias: medias.map((m) => toPlainMessage(m)),
      pagination: pagination && toPlainMessage(pagination),
    } as ListMediaResponse;
  },
  listAccessible: async (
    request: PartialMessage<ListAccessibleMediaRequest>,
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
  updateMedia: async (request: PartialMessage<UpdateMediaRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await mediaClient.updateMedia(request, { headers });
  },
  deleteMedia: async (request: PartialMessage<DeleteMediaRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await mediaClient.deleteMedia(request, { headers });
  },
  addMediaToOffer: async (request: PartialMessage<AddMediaToOfferRequest>) => {
    "use server";
    const headers = await withAuthHeader();
    await mediaClient.addMediaToOffer(request, { headers });
  },
  updateMediaOfferOrdering: async (
    request: PartialMessage<UpdateMediaOfferOrderingRequest>,
  ) => {
    "use server";
    const headers = await withAuthHeader();
    await mediaClient.updateMediaOfferOrdering(request, { headers });
  },
  removeMediaFromOffer: async (
    request: PartialMessage<RemoveMediaFromOfferRequest>,
  ) => {
    "use server";
    const headers = await withAuthHeader();
    await mediaClient.removeMediaFromOffer(request, { headers });
  },
};
