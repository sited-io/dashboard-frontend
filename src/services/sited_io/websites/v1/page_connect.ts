// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts"
// @generated from file sited_io/websites/v1/page.proto (package sited_io.websites.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import {
  CreatePageRequest,
  CreatePageResponse,
  DeletePageRequest,
  DeletePageResponse,
  GetPageRequest,
  GetPageResponse,
  ListPagesRequest,
  ListPagesResponse,
  UpdatePageRequest,
  UpdatePageResponse,
} from "./page_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service sited_io.websites.v1.PageService
 */
export const PageService = {
  typeName: "sited_io.websites.v1.PageService",
  methods: {
    /**
     * @generated from rpc sited_io.websites.v1.PageService.CreatePage
     */
    createPage: {
      name: "CreatePage",
      I: CreatePageRequest,
      O: CreatePageResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.websites.v1.PageService.GetPage
     */
    getPage: {
      name: "GetPage",
      I: GetPageRequest,
      O: GetPageResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.websites.v1.PageService.ListPages
     */
    listPages: {
      name: "ListPages",
      I: ListPagesRequest,
      O: ListPagesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.websites.v1.PageService.UpdatePage
     */
    updatePage: {
      name: "UpdatePage",
      I: UpdatePageRequest,
      O: UpdatePageResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.websites.v1.PageService.DeletePage
     */
    deletePage: {
      name: "DeletePage",
      I: DeletePageRequest,
      O: DeletePageResponse,
      kind: MethodKind.Unary,
    },
  },
} as const;
