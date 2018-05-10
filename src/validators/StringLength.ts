import { registerValidator, ValidatorConfig } from '../Validation';
import { checkTargetAndProperty } from '../Utils';


export const StringLength: (config?: {min?: number, max?: number } & ValidatorConfig | undefined) => (target: {[key:string]: any}, property: string) => void = 
registerValidator<{min?: number, max?: number}>("StringLength", (target, property, config = {min: 0, max: Infinity}) => { 
    checkTargetAndProperty(target, property);

    if(typeof target[property] !== 'string') {
        throw new TypeError(`StringLength expecting to work with type string but received ${typeof target[property]}.`);
    }

    let {min, max} = config;

    return target[property].length >= min && target[property].length <= max;
 });