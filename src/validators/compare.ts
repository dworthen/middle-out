/**
 * @module Validators
 */

import { checkTargetAndProperty } from "../Utils";
import { registerValidator, ValidatorConfig } from "../Validation";

export interface compareOptions extends ValidatorConfig {
  predicate: (target: { [key: string]: any }, a: string, b: string) => boolean;
  comparingProperty: string;
}

const _compare = registerValidator<compareOptions>(
  "compare",
  (target, property, config) => {
    checkTargetAndProperty(target, property);

    let value = target[property];

    if (value === undefined || value === null) {
      return true;
    }

    let { predicate, comparingProperty } = config || {
      predicate: undefined,
      comparingProperty: undefined
    };

    if (typeof predicate !== "function") {
      throw new TypeError(
        `Invalid argument config.predicate. Expecting (a, b) => boolean but received ${typeof predicate}`
      );
    }

    if (typeof comparingProperty !== "string") {
      throw new TypeError(
        `Invalid argument config.comparingProperty. Expecting string but received ${typeof comparingProperty}`
      );
    }

    return predicate(target, property, comparingProperty);
  }
);

export function compare(config?: compareOptions) {
  return _compare(config);
}
