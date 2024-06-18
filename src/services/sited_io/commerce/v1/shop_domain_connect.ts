// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts"
// @generated from file sited_io/commerce/v1/shop_domain.proto (package sited_io.commerce.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { AddDomainToShopRequest, AddDomainToShopResponse, GetClientIdForDomainRequest, GetClientIdForDomainResponse, GetDomainStatusRequest, GetDomainStatusResponse, RemoveDomainFromShopRequest, RemoveDomainFromShopResponse, UpdateDomainStatusRequest, UpdateDomainStatusResponse } from "./shop_domain_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service sited_io.commerce.v1.ShopDomainService
 */
export const ShopDomainService = {
  typeName: "sited_io.commerce.v1.ShopDomainService",
  methods: {
    /**
     * @generated from rpc sited_io.commerce.v1.ShopDomainService.AddDomainToShop
     */
    addDomainToShop: {
      name: "AddDomainToShop",
      I: AddDomainToShopRequest,
      O: AddDomainToShopResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.commerce.v1.ShopDomainService.GetDomainStatus
     */
    getDomainStatus: {
      name: "GetDomainStatus",
      I: GetDomainStatusRequest,
      O: GetDomainStatusResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.commerce.v1.ShopDomainService.GetClientIdForDomain
     */
    getClientIdForDomain: {
      name: "GetClientIdForDomain",
      I: GetClientIdForDomainRequest,
      O: GetClientIdForDomainResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.commerce.v1.ShopDomainService.UpdateDomainStatus
     */
    updateDomainStatus: {
      name: "UpdateDomainStatus",
      I: UpdateDomainStatusRequest,
      O: UpdateDomainStatusResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.commerce.v1.ShopDomainService.RemoveDomainFromShop
     */
    removeDomainFromShop: {
      name: "RemoveDomainFromShop",
      I: RemoveDomainFromShopRequest,
      O: RemoveDomainFromShopResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

