import { describe, expect, test } from "vitest";

import {
  base64ToUtf8,
  centsToDecimal,
  encodeArrayBufferToBase64Url,
  getInitials,
  parseJwtPayload,
  utf8ToBase64,
} from "./string-manipulation";
import { expectNoError } from "./testing";

describe("string-manipulation", () => {
  describe("encodeArrayBufferToBase64Url", () => {
    test("encode empty ArrayBuffer : ok", () => {
      const buffer = new ArrayBuffer(0);
      let res;
      try {
        res = encodeArrayBufferToBase64Url(buffer);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toEqual("");
    });
  });

  describe("base64ToUtf8", () => {
    test("decode symbols : ok", () => {
      const base64 = "YSDEgCDwkICAIOaWhyDwn6aE";
      let res;
      try {
        res = base64ToUtf8(base64);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toEqual("a Ā 𐀀 文 🦄");
    });
  });

  describe("utf8ToBase64", () => {
    test("encode symbols : ok", () => {
      const utf8 = "a Ā 𐀀 文 🦄";
      let res;
      try {
        res = utf8ToBase64(utf8);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toEqual("YSDEgCDwkICAIOaWhyDwn6aE");
    });
  });

  describe("parseJwtPayload", () => {
    test("encode JWT payload : ok", () => {
      const payload =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
      let res;
      try {
        res = parseJwtPayload(payload);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toHaveProperty("sub");
      expect(res).toHaveProperty("name");
      expect(res).toHaveProperty("iat");
    });
  });

  describe("getInitials", () => {
    test("Get initials for single name : ok", () => {
      const name = "Name";
      let res;
      try {
        res = getInitials(0, name);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toEqual("N");
      try {
        res = getInitials(1, name);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toEqual("N");
      try {
        res = getInitials(2, name);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toEqual("N");
    });

    test("Get initials for two names : ok", () => {
      const name = "Name Last";
      let res;
      try {
        res = getInitials(0, name);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toEqual("N");
      try {
        res = getInitials(1, name);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toEqual("N");
      try {
        res = getInitials(2, name);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toEqual("NL");
    });
  });

  describe("centsToDecimal", () => {
    test("0 : ok", () => {
      expect(centsToDecimal(0, ",")).toEqual("0,00");
      expect(centsToDecimal(0, ".")).toEqual("0.00");
    });
    test("-0 : ok", () => {
      expect(centsToDecimal(-0, ",")).toEqual("0,00");
      expect(centsToDecimal(-0, ".")).toEqual("0.00");
    });
    test("5 : ok", () => {
      expect(centsToDecimal(5, ",")).toEqual("0,05");
      expect(centsToDecimal(5, ".")).toEqual("0.05");
    });
    test("-5 : ok", () => {
      expect(centsToDecimal(-5, ",")).toEqual("-0,05");
      expect(centsToDecimal(-5, ".")).toEqual("-0.05");
    });
    test("50 : ok", () => {
      expect(centsToDecimal(50, ",")).toEqual("0,50");
      expect(centsToDecimal(50, ".")).toEqual("0.50");
    });
    test("-50 : ok", () => {
      expect(centsToDecimal(-50, ",")).toEqual("-0,50");
      expect(centsToDecimal(-50, ".")).toEqual("-0.50");
    });
    test("55 : ok", () => {
      expect(centsToDecimal(55, ",")).toEqual("0,55");
      expect(centsToDecimal(55, ".")).toEqual("0.55");
    });
    test("500 : ok", () => {
      expect(centsToDecimal(500, ",")).toEqual("5,00");
      expect(centsToDecimal(500, ".")).toEqual("5.00");
    });
    test("505 : ok", () => {
      expect(centsToDecimal(505, ",")).toEqual("5,05");
      expect(centsToDecimal(505, ".")).toEqual("5.05");
    });
    test("550 : ok", () => {
      expect(centsToDecimal(550, ",")).toEqual("5,50");
      expect(centsToDecimal(550, ".")).toEqual("5.50");
    });
    test("555 : ok", () => {
      expect(centsToDecimal(555, ",")).toEqual("5,55");
      expect(centsToDecimal(555, ".")).toEqual("5.55");
    });
  });
});
