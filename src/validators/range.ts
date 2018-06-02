/**
 * @module Validators
 */

 import { checkTargetAndProperty } from '../Utils';
import { registerValidator, ValidatorConfig } from '../Validation';

export const range:
    (config?: { min?: number, max?: number } & ValidatorConfig | undefined) =>
        (target: { [key: string]: any }, property: string) => void =
    registerValidator<{ min?: number, max?: number }>("range", (target, property, config = { min: Number.NEGATIVE_INFINITY, max: Infinity }) => {
        checkTargetAndProperty(target, property);

        if (target[property] === undefined || target[property] === null) {
            return true;
        }

        if (typeof target[property] !== 'number') {
            throw new TypeError(`range expecting to work with type number but received ${typeof target[property]}.`);
        }

        let { min, max } = Object.assign({ min: Number.NEGATIVE_INFINITY, max: Infinity }, config);

        if( typeof min !== 'number') {
            throw new TypeError(`Invalid argument 'config.min'. Expecting number but recieved ${min}`);
        }

        if( typeof max !== 'number') {
            throw new TypeError(`Invalid argument 'config.max'. Expecting number but recieved ${max}`);
        }

        return target[property] >= min && target[property] <= max;
    });

