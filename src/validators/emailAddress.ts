import { registerValidator, ValidatorConfig } from '../Validation';
import { checkTargetAndProperty } from '../Utils';
import isEmail from 'validator/lib/isEmail';

export const emailAddress:
(config?: { 
        allow_display_name?: boolean, 
        require_display_name?: boolean, 
        allow_utf8_local_part?: boolean, 
        require_tld?: boolean 
    } & ValidatorConfig | undefined) =>
        (target: { [key: string]: any }, property: string) => void =
registerValidator<{ 
    allow_display_name?: boolean, 
    require_display_name?: boolean, 
    allow_utf8_local_part?: boolean, 
    require_tld?: boolean 
}>("emailAddress", (target, property, config = {}) => {
    checkTargetAndProperty(target, property);

    if (target[property] === undefined || target[property] === null) {
        return true;
    }

    if (typeof target[property] !== 'string') {
        throw new TypeError(`emailAddress expecting to work with type string but received ${typeof target[property]}.`);
    }

    config = Object.assign(
        { 
            allow_display_name: false, 
            require_display_name: false, 
            allow_utf8_local_part: true, 
            require_tld: true 
        }, config);
    let { allow_display_name, require_display_name, allow_utf8_local_part, require_tld } = config

    if( typeof allow_display_name !== 'boolean') {
        throw new TypeError(`Invalid argument 'config.allow_display_name'. Expecting boolean but recieved ${allow_display_name}`);
    }

    if( typeof require_display_name !== 'boolean') {
        throw new TypeError(`Invalid argument 'config.require_display_name'. Expecting boolean but recieved ${require_display_name}`);
    }

    if( typeof allow_utf8_local_part !== 'boolean') {
        throw new TypeError(`Invalid argument 'config.allow_utf8_local_part'. Expecting boolean but recieved ${allow_utf8_local_part}`);
    }

    if( typeof require_tld !== 'boolean') {
        throw new TypeError(`Invalid argument 'config.require_tld'. Expecting boolean but recieved ${require_tld}`);
    }

    return isEmail(target[property], config);
});