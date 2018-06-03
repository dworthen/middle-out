/**
 * @module Validators
 */

import { checkTargetAndProperty } from "../Utils";
import { registerValidator, ValidatorConfig } from "../Validation";
import isCreditCard from "validator/lib/isCreditCard";

const _creditCard = registerValidator(
  "creditCard",
  (target, property, config) => {
    checkTargetAndProperty(target, property);

    if (target[property] === undefined || target[property] === null) {
      return true;
    }

    if (typeof target[property] !== "string") {
      throw new TypeError(
        `creditCard expecting to work with type string but received ${typeof target[
          property
        ]}.`
      );
    }

    return isCreditCard(target[property]);
  }
);

export function creditCard(config?: ValidatorConfig) {
  return _creditCard(config);
}
