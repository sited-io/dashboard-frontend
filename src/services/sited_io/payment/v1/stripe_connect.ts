// @generated by protoc-gen-connect-es v1.6.1 with parameter "target=ts"
// @generated from file sited_io/payment/v1/stripe.proto (package sited_io.payment.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import {
  CancelSubscriptionRequest,
  CancelSubscriptionResponse,
  CreateAccountLinkRequest,
  CreateAccountLinkResponse,
  CreateAccountRequest,
  CreateAccountResponse,
  CreateCheckoutSessionRequest,
  CreateCheckoutSessionResponse,
  GetAccountDetailsRequest,
  GetAccountDetailsResponse,
  GetAccountRequest,
  GetAccountResponse,
  ResumeSubscriptionRequest,
  ResumeSubscriptionResponse,
} from "./stripe_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service sited_io.payment.v1.StripeService
 */
export const StripeService = {
  typeName: "sited_io.payment.v1.StripeService",
  methods: {
    /**
     * @generated from rpc sited_io.payment.v1.StripeService.CreateAccount
     */
    createAccount: {
      name: "CreateAccount",
      I: CreateAccountRequest,
      O: CreateAccountResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.payment.v1.StripeService.CreateAccountLink
     */
    createAccountLink: {
      name: "CreateAccountLink",
      I: CreateAccountLinkRequest,
      O: CreateAccountLinkResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.payment.v1.StripeService.GetAccount
     */
    getAccount: {
      name: "GetAccount",
      I: GetAccountRequest,
      O: GetAccountResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.payment.v1.StripeService.GetAccountDetails
     */
    getAccountDetails: {
      name: "GetAccountDetails",
      I: GetAccountDetailsRequest,
      O: GetAccountDetailsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.payment.v1.StripeService.CreateCheckoutSession
     */
    createCheckoutSession: {
      name: "CreateCheckoutSession",
      I: CreateCheckoutSessionRequest,
      O: CreateCheckoutSessionResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.payment.v1.StripeService.CancelSubscription
     */
    cancelSubscription: {
      name: "CancelSubscription",
      I: CancelSubscriptionRequest,
      O: CancelSubscriptionResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc sited_io.payment.v1.StripeService.ResumeSubscription
     */
    resumeSubscription: {
      name: "ResumeSubscription",
      I: ResumeSubscriptionRequest,
      O: ResumeSubscriptionResponse,
      kind: MethodKind.Unary,
    },
  },
} as const;
