// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file sited_io/commerce/v2/offer.proto (package sited_io.commerce.v2, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type {
  BinaryReadOptions,
  FieldList,
  JsonReadOptions,
  JsonValue,
  PartialMessage,
  PlainMessage,
} from "@bufbuild/protobuf";
import { Message, proto3, protoInt64 } from "@bufbuild/protobuf";
import { CurrencyCode } from "../../types/currency/v1/currency_pb.js";
import { CountryCode } from "../../types/country/v1/country_pb.js";

/**
 * @generated from message sited_io.commerce.v2.Offer
 */
export class Offer extends Message<Offer> {
  /**
   * @generated from field: string offer_id = 1;
   */
  offerId = "";

  /**
   * @generated from field: string owner = 2;
   */
  owner = "";

  /**
   * @generated from field: int64 created_at = 3;
   */
  createdAt = protoInt64.zero;

  /**
   * @generated from field: int64 updated_at = 4;
   */
  updatedAt = protoInt64.zero;

  /**
   * @generated from field: sited_io.commerce.v2.Offer.Details details = 5;
   */
  details?: Offer_Details;

  /**
   * @generated from field: sited_io.commerce.v2.OfferType offer_type = 6;
   */
  offerType?: OfferType;

  /**
   * @generated from field: optional sited_io.commerce.v2.OfferPrice price = 7;
   */
  price?: OfferPrice;

  /**
   * @generated from field: optional sited_io.commerce.v2.ShippingRate shipping_rate = 8;
   */
  shippingRate?: ShippingRate;

  /**
   * @generated from field: repeated sited_io.commerce.v2.OfferImage images = 9;
   */
  images: OfferImage[] = [];

  /**
   * @generated from field: repeated sited_io.commerce.v2.OfferFile files = 10;
   */
  files: OfferFile[] = [];

  constructor(data?: PartialMessage<Offer>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "sited_io.commerce.v2.Offer";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "offer_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "created_at", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 4, name: "updated_at", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 5, name: "details", kind: "message", T: Offer_Details },
    { no: 6, name: "offer_type", kind: "message", T: OfferType },
    { no: 7, name: "price", kind: "message", T: OfferPrice, opt: true },
    {
      no: 8,
      name: "shipping_rate",
      kind: "message",
      T: ShippingRate,
      opt: true,
    },
    { no: 9, name: "images", kind: "message", T: OfferImage, repeated: true },
    { no: 10, name: "files", kind: "message", T: OfferFile, repeated: true },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): Offer {
    return new Offer().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): Offer {
    return new Offer().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): Offer {
    return new Offer().fromJsonString(jsonString, options);
  }

  static equals(
    a: Offer | PlainMessage<Offer> | undefined,
    b: Offer | PlainMessage<Offer> | undefined,
  ): boolean {
    return proto3.util.equals(Offer, a, b);
  }
}

/**
 * @generated from message sited_io.commerce.v2.Offer.Details
 */
export class Offer_Details extends Message<Offer_Details> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: optional string description = 2;
   */
  description?: string;

  constructor(data?: PartialMessage<Offer_Details>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "sited_io.commerce.v2.Offer.Details";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    {
      no: 2,
      name: "description",
      kind: "scalar",
      T: 9 /* ScalarType.STRING */,
      opt: true,
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): Offer_Details {
    return new Offer_Details().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): Offer_Details {
    return new Offer_Details().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): Offer_Details {
    return new Offer_Details().fromJsonString(jsonString, options);
  }

  static equals(
    a: Offer_Details | PlainMessage<Offer_Details> | undefined,
    b: Offer_Details | PlainMessage<Offer_Details> | undefined,
  ): boolean {
    return proto3.util.equals(Offer_Details, a, b);
  }
}

/**
 * @generated from message sited_io.commerce.v2.OfferType
 */
export class OfferType extends Message<OfferType> {
  /**
   * @generated from oneof sited_io.commerce.v2.OfferType.offer_type_kind
   */
  offerTypeKind:
    | {
        /**
         * @generated from field: sited_io.commerce.v2.OfferType.Physical physical = 1;
         */
        value: OfferType_Physical;
        case: "physical";
      }
    | {
        /**
         * @generated from field: sited_io.commerce.v2.OfferType.Digital digital = 2;
         */
        value: OfferType_Digital;
        case: "digital";
      }
    | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<OfferType>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "sited_io.commerce.v2.OfferType";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: "physical",
      kind: "message",
      T: OfferType_Physical,
      oneof: "offer_type_kind",
    },
    {
      no: 2,
      name: "digital",
      kind: "message",
      T: OfferType_Digital,
      oneof: "offer_type_kind",
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): OfferType {
    return new OfferType().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): OfferType {
    return new OfferType().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): OfferType {
    return new OfferType().fromJsonString(jsonString, options);
  }

  static equals(
    a: OfferType | PlainMessage<OfferType> | undefined,
    b: OfferType | PlainMessage<OfferType> | undefined,
  ): boolean {
    return proto3.util.equals(OfferType, a, b);
  }
}

/**
 * @generated from message sited_io.commerce.v2.OfferType.Physical
 */
export class OfferType_Physical extends Message<OfferType_Physical> {
  constructor(data?: PartialMessage<OfferType_Physical>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "sited_io.commerce.v2.OfferType.Physical";
  static readonly fields: FieldList = proto3.util.newFieldList(() => []);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): OfferType_Physical {
    return new OfferType_Physical().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): OfferType_Physical {
    return new OfferType_Physical().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): OfferType_Physical {
    return new OfferType_Physical().fromJsonString(jsonString, options);
  }

  static equals(
    a: OfferType_Physical | PlainMessage<OfferType_Physical> | undefined,
    b: OfferType_Physical | PlainMessage<OfferType_Physical> | undefined,
  ): boolean {
    return proto3.util.equals(OfferType_Physical, a, b);
  }
}

/**
 * @generated from message sited_io.commerce.v2.OfferType.Digital
 */
export class OfferType_Digital extends Message<OfferType_Digital> {
  constructor(data?: PartialMessage<OfferType_Digital>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "sited_io.commerce.v2.OfferType.Digital";
  static readonly fields: FieldList = proto3.util.newFieldList(() => []);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): OfferType_Digital {
    return new OfferType_Digital().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): OfferType_Digital {
    return new OfferType_Digital().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): OfferType_Digital {
    return new OfferType_Digital().fromJsonString(jsonString, options);
  }

  static equals(
    a: OfferType_Digital | PlainMessage<OfferType_Digital> | undefined,
    b: OfferType_Digital | PlainMessage<OfferType_Digital> | undefined,
  ): boolean {
    return proto3.util.equals(OfferType_Digital, a, b);
  }
}

/**
 * @generated from message sited_io.commerce.v2.OfferPrice
 */
export class OfferPrice extends Message<OfferPrice> {
  /**
   * @generated from field: uint32 unit_amount = 1;
   */
  unitAmount = 0;

  /**
   * @generated from field: sited_io.types.currency.v1.CurrencyCode currency = 2;
   */
  currency = CurrencyCode.UNSPECIFIED;

  /**
   * @generated from field: sited_io.commerce.v2.PriceType price_type = 3;
   */
  priceType?: PriceType;

  constructor(data?: PartialMessage<OfferPrice>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "sited_io.commerce.v2.OfferPrice";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: "unit_amount",
      kind: "scalar",
      T: 13 /* ScalarType.UINT32 */,
    },
    {
      no: 2,
      name: "currency",
      kind: "enum",
      T: proto3.getEnumType(CurrencyCode),
    },
    { no: 3, name: "price_type", kind: "message", T: PriceType },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): OfferPrice {
    return new OfferPrice().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): OfferPrice {
    return new OfferPrice().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): OfferPrice {
    return new OfferPrice().fromJsonString(jsonString, options);
  }

  static equals(
    a: OfferPrice | PlainMessage<OfferPrice> | undefined,
    b: OfferPrice | PlainMessage<OfferPrice> | undefined,
  ): boolean {
    return proto3.util.equals(OfferPrice, a, b);
  }
}

/**
 * @generated from message sited_io.commerce.v2.PriceType
 */
export class PriceType extends Message<PriceType> {
  /**
   * @generated from oneof sited_io.commerce.v2.PriceType.price_type_kind
   */
  priceTypeKind:
    | {
        /**
         * @generated from field: sited_io.commerce.v2.PriceType.OneTime one_time = 1;
         */
        value: PriceType_OneTime;
        case: "oneTime";
      }
    | {
        /**
         * @generated from field: sited_io.commerce.v2.PriceType.Recurring recurring = 2;
         */
        value: PriceType_Recurring;
        case: "recurring";
      }
    | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<PriceType>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "sited_io.commerce.v2.PriceType";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: "one_time",
      kind: "message",
      T: PriceType_OneTime,
      oneof: "price_type_kind",
    },
    {
      no: 2,
      name: "recurring",
      kind: "message",
      T: PriceType_Recurring,
      oneof: "price_type_kind",
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): PriceType {
    return new PriceType().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): PriceType {
    return new PriceType().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): PriceType {
    return new PriceType().fromJsonString(jsonString, options);
  }

  static equals(
    a: PriceType | PlainMessage<PriceType> | undefined,
    b: PriceType | PlainMessage<PriceType> | undefined,
  ): boolean {
    return proto3.util.equals(PriceType, a, b);
  }
}

/**
 * @generated from message sited_io.commerce.v2.PriceType.OneTime
 */
export class PriceType_OneTime extends Message<PriceType_OneTime> {
  constructor(data?: PartialMessage<PriceType_OneTime>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "sited_io.commerce.v2.PriceType.OneTime";
  static readonly fields: FieldList = proto3.util.newFieldList(() => []);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): PriceType_OneTime {
    return new PriceType_OneTime().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): PriceType_OneTime {
    return new PriceType_OneTime().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): PriceType_OneTime {
    return new PriceType_OneTime().fromJsonString(jsonString, options);
  }

  static equals(
    a: PriceType_OneTime | PlainMessage<PriceType_OneTime> | undefined,
    b: PriceType_OneTime | PlainMessage<PriceType_OneTime> | undefined,
  ): boolean {
    return proto3.util.equals(PriceType_OneTime, a, b);
  }
}

/**
 * @generated from message sited_io.commerce.v2.PriceType.Recurring
 */
export class PriceType_Recurring extends Message<PriceType_Recurring> {
  /**
   * @generated from field: sited_io.commerce.v2.PriceType.Recurring.Interval interval = 1;
   */
  interval = PriceType_Recurring_Interval.UNSPECIFIED;

  /**
   * @generated from field: uint32 interval_count = 2;
   */
  intervalCount = 0;

  /**
   * @generated from field: optional uint32 trial_period_days = 3;
   */
  trialPeriodDays?: number;

  constructor(data?: PartialMessage<PriceType_Recurring>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "sited_io.commerce.v2.PriceType.Recurring";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: "interval",
      kind: "enum",
      T: proto3.getEnumType(PriceType_Recurring_Interval),
    },
    {
      no: 2,
      name: "interval_count",
      kind: "scalar",
      T: 13 /* ScalarType.UINT32 */,
    },
    {
      no: 3,
      name: "trial_period_days",
      kind: "scalar",
      T: 13 /* ScalarType.UINT32 */,
      opt: true,
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): PriceType_Recurring {
    return new PriceType_Recurring().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): PriceType_Recurring {
    return new PriceType_Recurring().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): PriceType_Recurring {
    return new PriceType_Recurring().fromJsonString(jsonString, options);
  }

  static equals(
    a: PriceType_Recurring | PlainMessage<PriceType_Recurring> | undefined,
    b: PriceType_Recurring | PlainMessage<PriceType_Recurring> | undefined,
  ): boolean {
    return proto3.util.equals(PriceType_Recurring, a, b);
  }
}

/**
 * @generated from enum sited_io.commerce.v2.PriceType.Recurring.Interval
 */
export enum PriceType_Recurring_Interval {
  /**
   * @generated from enum value: INTERVAL_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: INTERVAL_DAY = 1;
   */
  DAY = 1,

  /**
   * @generated from enum value: INTERVAL_WEEK = 2;
   */
  WEEK = 2,

  /**
   * @generated from enum value: INTERVAL_MONTH = 3;
   */
  MONTH = 3,

  /**
   * @generated from enum value: INTERVAL_YEAR = 4;
   */
  YEAR = 4,
}
// Retrieve enum metadata with: proto3.getEnumType(PriceType_Recurring_Interval)
proto3.util.setEnumType(
  PriceType_Recurring_Interval,
  "sited_io.commerce.v2.PriceType.Recurring.Interval",
  [
    { no: 0, name: "INTERVAL_UNSPECIFIED" },
    { no: 1, name: "INTERVAL_DAY" },
    { no: 2, name: "INTERVAL_WEEK" },
    { no: 3, name: "INTERVAL_MONTH" },
    { no: 4, name: "INTERVAL_YEAR" },
  ],
);

/**
 * @generated from message sited_io.commerce.v2.ShippingRate
 */
export class ShippingRate extends Message<ShippingRate> {
  /**
   * @generated from field: uint32 unit_amount = 3;
   */
  unitAmount = 0;

  /**
   * @generated from field: sited_io.types.currency.v1.CurrencyCode currency = 4;
   */
  currency = CurrencyCode.UNSPECIFIED;

  /**
   * @generated from field: bool all_countries = 5;
   */
  allCountries = false;

  /**
   * @generated from field: repeated sited_io.types.country.v1.CountryCode specific_countries = 6;
   */
  specificCountries: CountryCode[] = [];

  constructor(data?: PartialMessage<ShippingRate>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "sited_io.commerce.v2.ShippingRate";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 3,
      name: "unit_amount",
      kind: "scalar",
      T: 13 /* ScalarType.UINT32 */,
    },
    {
      no: 4,
      name: "currency",
      kind: "enum",
      T: proto3.getEnumType(CurrencyCode),
    },
    {
      no: 5,
      name: "all_countries",
      kind: "scalar",
      T: 8 /* ScalarType.BOOL */,
    },
    {
      no: 6,
      name: "specific_countries",
      kind: "enum",
      T: proto3.getEnumType(CountryCode),
      repeated: true,
    },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): ShippingRate {
    return new ShippingRate().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): ShippingRate {
    return new ShippingRate().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): ShippingRate {
    return new ShippingRate().fromJsonString(jsonString, options);
  }

  static equals(
    a: ShippingRate | PlainMessage<ShippingRate> | undefined,
    b: ShippingRate | PlainMessage<ShippingRate> | undefined,
  ): boolean {
    return proto3.util.equals(ShippingRate, a, b);
  }
}

/**
 * @generated from message sited_io.commerce.v2.OfferImage
 */
export class OfferImage extends Message<OfferImage> {
  /**
   * @generated from field: string offer_image_id = 1;
   */
  offerImageId = "";

  /**
   * @generated from field: string owner = 2;
   */
  owner = "";

  /**
   * @generated from field: string image_url = 3;
   */
  imageUrl = "";

  /**
   * @generated from field: int32 ordering = 4;
   */
  ordering = 0;

  constructor(data?: PartialMessage<OfferImage>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "sited_io.commerce.v2.OfferImage";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: "offer_image_id",
      kind: "scalar",
      T: 9 /* ScalarType.STRING */,
    },
    { no: 2, name: "owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "image_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "ordering", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): OfferImage {
    return new OfferImage().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): OfferImage {
    return new OfferImage().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): OfferImage {
    return new OfferImage().fromJsonString(jsonString, options);
  }

  static equals(
    a: OfferImage | PlainMessage<OfferImage> | undefined,
    b: OfferImage | PlainMessage<OfferImage> | undefined,
  ): boolean {
    return proto3.util.equals(OfferImage, a, b);
  }
}

/**
 * @generated from message sited_io.commerce.v2.OfferFile
 */
export class OfferFile extends Message<OfferFile> {
  /**
   * @generated from field: string offer_file_id = 1;
   */
  offerFileId = "";

  /**
   * @generated from field: string offer_id = 2;
   */
  offerId = "";

  /**
   * @generated from field: string owner = 3;
   */
  owner = "";

  /**
   * @generated from field: string file_name = 4;
   */
  fileName = "";

  /**
   * @generated from field: optional string content_type = 5;
   */
  contentType?: string;

  /**
   * @generated from field: uint64 total_size_bytes = 6;
   */
  totalSizeBytes = protoInt64.zero;

  /**
   * @generated from field: uint64 uploaded_size_bytes = 7;
   */
  uploadedSizeBytes = protoInt64.zero;

  /**
   * @generated from field: int32 ordering = 8;
   */
  ordering = 0;

  /**
   * @generated from field: string file_url = 9;
   */
  fileUrl = "";

  constructor(data?: PartialMessage<OfferFile>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "sited_io.commerce.v2.OfferFile";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    {
      no: 1,
      name: "offer_file_id",
      kind: "scalar",
      T: 9 /* ScalarType.STRING */,
    },
    { no: 2, name: "offer_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "owner", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "file_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    {
      no: 5,
      name: "content_type",
      kind: "scalar",
      T: 9 /* ScalarType.STRING */,
      opt: true,
    },
    {
      no: 6,
      name: "total_size_bytes",
      kind: "scalar",
      T: 4 /* ScalarType.UINT64 */,
    },
    {
      no: 7,
      name: "uploaded_size_bytes",
      kind: "scalar",
      T: 4 /* ScalarType.UINT64 */,
    },
    { no: 8, name: "ordering", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 9, name: "file_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): OfferFile {
    return new OfferFile().fromBinary(bytes, options);
  }

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): OfferFile {
    return new OfferFile().fromJson(jsonValue, options);
  }

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): OfferFile {
    return new OfferFile().fromJsonString(jsonString, options);
  }

  static equals(
    a: OfferFile | PlainMessage<OfferFile> | undefined,
    b: OfferFile | PlainMessage<OfferFile> | undefined,
  ): boolean {
    return proto3.util.equals(OfferFile, a, b);
  }
}
