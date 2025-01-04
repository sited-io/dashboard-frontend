// @generated by protoc-gen-connect-es v1.6.1 with parameter "target=ts"
// @generated from file sited_io/commerce/v1/offer.proto (package sited_io.commerce.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import {
  AddImageToOfferRequest,
  AddImageToOfferResponse,
  CreateOfferRequest,
  CreateOfferResponse,
  DeleteOfferRequest,
  DeleteOfferResponse,
  GetMyOfferRequest,
  GetMyOfferResponse,
  GetOfferRequest,
  GetOfferResponse,
  ListOffersRequest,
  ListOffersResponse,
  PutPriceToOfferRequest,
  PutPriceToOfferResponse,
  RemoveImageFromOfferRequest,
  RemoveImageFromOfferResponse,
  RemovePriceFromOfferRequest,
  RemovePriceFromOfferResponse,
  UpdateOfferRequest,
  UpdateOfferResponse,
} from "./offer_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service sited_io.commerce.v1.OfferService
 */
export const OfferService = {
  typeName: "sited_io.commerce.v1.OfferService",
  methods: {
    /**
     * @generated from rpc sited_io.commerce.v1.OfferService.CreateOffer
     */
    createOffer: {
      name: "CreateOffer",
      I: CreateOfferRequest,
      O: CreateOfferResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.commerce.v1.OfferService.GetOffer
     */
    getOffer: {
      name: "GetOffer",
      I: GetOfferRequest,
      O: GetOfferResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.commerce.v1.OfferService.GetMyOffer
     */
    getMyOffer: {
      name: "GetMyOffer",
      I: GetMyOfferRequest,
      O: GetMyOfferResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.commerce.v1.OfferService.ListOffers
     */
    listOffers: {
      name: "ListOffers",
      I: ListOffersRequest,
      O: ListOffersResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.commerce.v1.OfferService.UpdateOffer
     */
    updateOffer: {
      name: "UpdateOffer",
      I: UpdateOfferRequest,
      O: UpdateOfferResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.commerce.v1.OfferService.DeleteOffer
     */
    deleteOffer: {
      name: "DeleteOffer",
      I: DeleteOfferRequest,
      O: DeleteOfferResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.commerce.v1.OfferService.AddImageToOffer
     */
    addImageToOffer: {
      name: "AddImageToOffer",
      I: AddImageToOfferRequest,
      O: AddImageToOfferResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.commerce.v1.OfferService.RemoveImageFromOffer
     */
    removeImageFromOffer: {
      name: "RemoveImageFromOffer",
      I: RemoveImageFromOfferRequest,
      O: RemoveImageFromOfferResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.commerce.v1.OfferService.PutPriceToOffer
     */
    putPriceToOffer: {
      name: "PutPriceToOffer",
      I: PutPriceToOfferRequest,
      O: PutPriceToOfferResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.commerce.v1.OfferService.RemovePriceFromOffer
     */
    removePriceFromOffer: {
      name: "RemovePriceFromOffer",
      I: RemovePriceFromOfferRequest,
      O: RemovePriceFromOfferResponse,
      kind: MethodKind.Unary,
    },
  },
} as const;
