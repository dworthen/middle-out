/**
 * @module Validators
 */

import { checkTargetAndProperty } from "../Utils";
import { registerValidator, ValidatorConfig } from "../Validation";
import isMobilePhone from "validator/lib/isMobilePhone";

export interface mobilePhoneOptions extends ValidatorConfig {
  locale?: string;
  strictMode?: boolean;
}

const _mobilePhone = registerValidator<{
  locale?: string;
  strictMode?: boolean;
}>("mobilePhone", (target, property, config = {}) => {
  checkTargetAndProperty(target, property);

  let value = target[property];

  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value !== "string" && typeof value !== "number") {
    throw new TypeError(
      `mobilePhone expecting to work with type string|number but received ${typeof value}.`
    );
  }

  if (typeof value === "number") {
    value = "" + value;
  }

  config = Object.assign(
    {
      locale: "en-US",
      strictMode: false
    },
    config
  );

  let { locale, strictMode } = config;

  if (typeof locale !== "string") {
    throw new TypeError(
      `Invalid argument config.locale. Expecting string but received ${typeof locale}`
    );
  }

  if (typeof strictMode !== "boolean") {
    throw new TypeError(
      `Invalid argument config.strictMode. Expecting boolean but received ${typeof strictMode}`
    );
  }

  return isMobilePhone(value, locale as any, config);
});

export function mobilePhone(config?: mobilePhoneOptions) {
  return _mobilePhone(config);
}
