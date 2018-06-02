/**
 * @module Validators
 */

import { checkTargetAndProperty } from '../Utils';
import { registerValidator, ValidatorConfig } from '../Validation';

export const instanceOf:
    (config?: { constor: any } & ValidatorConfig | undefined) =>
        (target: { [key: string]: any }, property: string, config?: { constor: any } & ValidatorConfig | undefined) =>
            void =
    registerValidator<{ constor: any }>("instanceOf", (target, property, config) => {
        checkTargetAndProperty(target, property);
        
        if (target[property] === undefined || target[property] === null) {
            return true;
        }

        if (config === undefined || config === null || config.constor === undefined || config.constor === null) {
            throw new TypeError(`Invalid argument 'config'. Expecting {constor: any} but received ${config}.`);
        }


        return target[property] instanceof config.constor;
    });


