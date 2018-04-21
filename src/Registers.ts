// import "reflect-metadata";

const MiddleOutValidatorSymbol = Symbol("MiddleOutValidator");
const MiddleOutMetaDataSymbol = Symbol("MiddleOutMetaData");

export interface ErrorMessageConfig {
    [key: string]: any,
    displayName: string,
    property: string,
    target: any,
    value: any
};

export interface ValidationError {
    [key: string]: any,
    property: string,
    target: any,
    value: any,
    message: string
};

export interface ValidatorConfig {
    errorMessage?: string | ((obj: ErrorMessageConfig) => string);
};

export type Validator<T> = ((target: any, property: string, config: ValidatorConfig & T) => boolean);

export function registerMetaData<T>(name: string): (config: T) => (target: any, property: string) => void {
    return config => {
        return (target, property) => {
            target[MiddleOutMetaDataSymbol] = target[MiddleOutMetaDataSymbol] || {};
            target[MiddleOutMetaDataSymbol][property] =
                (target[MiddleOutMetaDataSymbol][property] || []).concat([
                    [name, config]
                ]);
        }
    }
}

export function getMetaData(target: any, property: string, name?: string): Array<[string, any]> {
    let meta = target[MiddleOutMetaDataSymbol] || {};
    let m = meta[property] || [];
    return name
        ? m.filter((v: Array<any>) => ((v[0] || '') === name))
        : m;
}

export function registerValidator<T>(name: string, validator: Validator<T>): (config?: ValidatorConfig & T) => (target: any, property: string) => void {
    return (config) => {
        return (target, property) => {
            target[MiddleOutValidatorSymbol] = target[MiddleOutValidatorSymbol] || {};
            target[MiddleOutValidatorSymbol][property] =
                (target[MiddleOutValidatorSymbol][property] || []).concat([
                    [name, validator, config || {}]
                ]);
        }
    }
};

export function getValidators(target: any, property: string, name?: string): Array<[string, Function, ValidatorConfig]> {
    let meta = target[MiddleOutValidatorSymbol] || {};
    let m = meta[property] || [];
    return name
        ? m.filter((v: Array<any>) => ((v[0] || '') === name))
        : m;
};

export function validate(target: any): [boolean, {[key: string]: {[key: string]: ValidationError }}] {
    let errors = Object.keys(target[MiddleOutValidatorSymbol] || {}).reduce((acc: {[key: string]: {[key: string]: ValidationError }}, property) => {
        acc[property] = {};
        let validators: Array<[string, Function, ValidatorConfig]> = getValidators(target, property).reverse();
        for(let [name, fn, config] of validators) {
            if(!fn(target, property, config)) {
                let { errorMessage } = Object.assign({errorMessage: `Error. ${property} failed ${name} validation`}, config);
                let [ , displayName = property] = getMetaData(p, property, 'displayName')[0] || [];
                let error = typeof errorMessage === 'function'
                    ? errorMessage({displayName, property, target, value: target[property]})
                    : errorMessage;
                acc[property][name] = {
                    property,
                    target,
                    message: error,
                    value: target[property]
                };
            }
        }
        if(!Object.keys(acc[property]).length) {
            delete acc[property];
        }
        return acc;
    }, {});
    return [!Object.keys(errors).length, errors];
}

export function errorTemplate(strings: TemplateStringsArray, ...keys: string[]): ((reason: ErrorMessageConfig) => string) {
    return ((dict: ErrorMessageConfig) => {
        //var dict = values[values.length - 1] || {};
        let result = [strings[0]];
        keys.forEach(function (key, i) {
            let value = dict[key];
            result.push(value, strings[i + 1]);
        });
        return result.join('');
    });
}

export function toJSON(target: {[key: string] : any}): {} {
    let propKeys = Object.getOwnPropertyNames(target);
    let prototypeKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(target));
    let keys = propKeys.concat(prototypeKeys);

    let keysToIgnore = ['constructor', 'prototype'];

    keys = keys.filter(k => {
        return keysToIgnore.indexOf(k) < 0;
    });

    let newObj: {[key: string]: any} = {};

    for(let key of keys) {
        let [ , converter] = getMetaData(target, key, "toJSON")[0] || [undefined, key];

        if(typeof converter === 'function') {
            let [newKey, newVal] = converter(target, key);
            newObj[newKey] = newVal;
        } else {
            if(prototypeKeys.indexOf(key) < 0) {
                let desc = Object.getOwnPropertyDescriptor(target, key) as PropertyDescriptor;
                if(desc.get) {
                    newObj[converter] = desc.get.call(target);
                } /* else if(typeof desc.value === 'function') {
                    newObj[converter] = desc.value.call(target);
                }*/ else {
                    Object.defineProperty(newObj, converter, desc);
                }
            } else if (converter !== key) {
                let desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(target), key) as PropertyDescriptor;
                if(desc.get) {
                    newObj[converter] = desc.get.call(target);
                } /* else if(typeof desc.value === 'function') {
                    newObj[converter] = desc.value.call(target);
                }*/ else {
                    Object.defineProperty(newObj, converter, desc);
                }
            }
        }
    }

    return newObj;
}

export function fromJSON(target: {[key: string]: any}): void {

}

export const displayName = registerMetaData<string>("displayName");

export const fromJS = registerMetaData<string | ((target: any, property: string) => [string, any])>("fromJson");
export const toJS = registerMetaData<string | ((target: any, property: string) => [string, any])>("toJSON");

export const size = registerValidator<{min?: number, max?: number}>("Size", (target, property, {min = Number.NEGATIVE_INFINITY, max = Infinity}) => {
    // let {min, max} = Object.assign({min: Number.NEGATIVE_INFINITY, max: Infinity}, config);
    let val = target[property];
    if(val === undefined || val === null) return true;
    return val >= min && val <= max;
});

export const required = registerValidator<{}>("Required", (target, property, config) => {
    return target[property] !== undefined && target[property] !== null;
});


// var person: {[key: string]: any} = { age: 10 };

// size()(person, 'age');
// console.log(person[MiddleOutSymbol]['age'][0][1](person, "age", {min: 1000}));

class Person {

    @displayName("Age")
    @toJS((target, property) => {
        return ["Something", target[property] + 100];
    })
    @required()
    @size({
        min: 100,
        errorMessage: errorTemplate`${'displayName'} failed size validation with value ${'value'}!`
        // errorMessage: ({displayName, property, target}) => {
        //     return `${displayName} failed Size validation with value ${target[property]}`;
        // }})
    })
    public age: number = 10;

    constructor() {
    }

}

class P2 extends Person {

    @toJS("MyName")
    public name: string = "Derek";

    constructor() {
        super();
    }

    @toJS("Name2")
    get Name(): string {
        return this.name;
    }

    @size({min: 100})
    get Older(): number {
        return 10000;
    }

    @toJS((t, p) => {
        return ['TESTING', t[p]()]
    })
    public test: () => string = () => {
        return "test";
    }

    @toJS("COOOOL")
    public cool(name: string): string {
        return `cool ${name}`;
    }
}

// let p: {[key: string]: any} = {age: 10};
// size({ min: 100})(p, 'age');
let p = new P2();
let [isValid, errors] = validate(p);
console.log(isValid, errors);

// let [ , value = '' ] = getMetaData(p, 'age', 'displayName')[0] || [];
// console.log(value);

console.log(JSON.stringify(p));
console.log(JSON.stringify(toJSON(p)));

// let [[, fn, config]] = getValidators(p, "age", "Size");
// console.log(fn(p, "age", config));
