import { registerValidator, ValidatorConfig } from '../Validation';
import { checkTargetAndProperty } from '../Utils';


export const StringLength: (config?: {min?: number, max?: number } & ValidatorConfig | undefined) => (target: {[key:string]: any}, property: string) => void = 
registerValidator<{min?: number, max?: number}>("StringLength", (target, property, config = {min: 0, max: Infinity}) => { 
    checkTargetAndProperty(target, property);

    if(target[property] === undefined || target[property] === null) {
        return true;
    }

    if(typeof target[property] !== 'string') {
        throw new TypeError(`StringLength expecting to work with type string but received ${typeof target[property]}.`);
    }

    let {min, max} = Object.assign({min: 0, max: Infinity}, config);

    return target[property].length >= min && target[property].length <= max;
 });