/**
 * @module Validators
 */

import { checkTargetAndProperty } from "../Utils";
import { registerValidator, ValidatorConfig } from "../Validation";

export const compare: (
  config?:
    | {
        predicate: (
          target: { [key: string]: any },
          a: string,
          b: string
        ) => boolean;
        comparingProperty: string;
      } & ValidatorConfig
    | undefined
) => (
  target: { [key: string]: any },
  property: string,
  config?: { dataType: string } & ValidatorConfig | undefined
) => void = registerValidator<{
  predicate: (target: { [key: string]: any }, a: string, b: string) => boolean;
  comparingProperty: string;
}>("compare", (target, property, config) => {
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
});
