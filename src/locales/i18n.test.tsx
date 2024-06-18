import _ from "lodash";
import { assert, describe, expect, test } from "vitest";

import { LANGUAGES, LOCALES, getNextLanguageKey } from ".";
import { errorPrint } from "../lib/testing";
import { TKEYS } from "./keys";

describe("Locales", () => {
  test("Check that no language has TKEYS vaules as value", () => {
    function checkValuesAreNotKeyPath(
      obj: Record<string, any>,
      parentKey: string
    ) {
      for (const [key, value] of _.entries(obj)) {
        assert(_.isString(key));
        assert(_.isString(value) || _.isObject(value));

        const fullPath = _.isEmpty(parentKey) ? key : `${parentKey}.${key}`;

        if (_.isString(value)) {
          assert(value != fullPath, `${value} was equal to ${fullPath}`);
        } else {
          checkValuesAreNotKeyPath(value, fullPath);
        }
      }
    }

    assert(!_.isNil(LOCALES));
    assert(!_.isEmpty(LOCALES));
    assert(_.isObject(LOCALES));

    for (const lang of _.values(LANGUAGES)) {
      const translation = LOCALES[lang].translation;

      assert(!_.isNil(translation));
      assert(!_.isEmpty(translation));
      assert(_.isObject(translation));

      checkValuesAreNotKeyPath(translation, "");
    }
  });

  test("Check that all vaules in TKEYS are the path to their keys respectiveley", () => {
    function checkObjectsValuesMatchKeyPath(
      obj: Record<string, any>,
      parentKey: string
    ) {
      for (const [key, value] of _.entries(obj)) {
        assert(_.isString(key));
        assert(_.isString(value) || _.isObject(value));

        const fullPath = _.isEmpty(parentKey) ? key : `${parentKey}.${key}`;

        if (_.isString(value)) {
          expect(
            value,
            errorPrint(
              `Error in TKEYS. Value of key was not the object path to the key`
            )
          ).toEqual(fullPath);
        } else {
          checkObjectsValuesMatchKeyPath(value, fullPath);
        }
      }
    }

    assert(!_.isNil(TKEYS));
    assert(!_.isEmpty(TKEYS));
    assert(_.isObject(TKEYS));

    checkObjectsValuesMatchKeyPath(TKEYS, "");
  });

  test("Check all languages have same keys", () => {
    const comparisons: Record<string, string[]> = {};

    assert(!_.isNil(LOCALES));
    assert(!_.isEmpty(LOCALES));
    assert(_.isObject(LOCALES));

    for (const lang of _.keys(LOCALES)) {
      const locale = LOCALES[lang];

      assert(!_.isNil(locale));
      assert(!_.isEmpty(locale));
      assert(_.isObject(locale));

      comparisons[lang] = [];

      function handleObject(obj: Record<string, any>, parent: string) {
        for (const [key, value] of _.entries(obj)) {
          assert(_.isString(key));
          assert(_.isString(value) || _.isObject(value));

          const fullPath = `${parent}.${key}`;

          if (_.isString(value)) {
            comparisons[lang].push(fullPath);
          } else {
            handleObject(value, fullPath);
          }
        }
      }

      const translation = locale.translation;

      assert(!_.isNil(translation));
      assert(!_.isEmpty(translation));
      assert(_.isObject(translation));

      handleObject(translation, "");

      comparisons[lang].sort();
    }

    for (const a of _.keys(LOCALES)) {
      for (const b of _.keys(LOCALES)) {
        expect(
          comparisons[a],
          errorPrint(`'${b}' was not equal to '${a}'`)
        ).toEqual(comparisons[b]);
      }
    }
  });

  test("Get next languages key", () => {
    let res;

    try {
      res = getNextLanguageKey("de");
    } catch (err) {
      expect(err).toBeUndefined();
    }

    assert(typeof res === "string");
    assert(res != "dev");

    try {
      res = getNextLanguageKey("en");
    } catch (err) {
      expect(err).toBeUndefined();
    }

    assert(typeof res === "string");
    assert(res != "dev");

    try {
      res = getNextLanguageKey(undefined as any);
    } catch (err) {
      expect(err).toBeUndefined();
    }

    assert(typeof res === "string");
    assert(res != "dev");
  });
});
