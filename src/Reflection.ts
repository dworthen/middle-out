import {checkTargetAndProperty} from './Utils';

const MiddleOutMetaDataSymbol = Symbol("MiddleOutMetaData");

export function registerMetaData<T>(name: string): (config: T) => (target: {[key:string]: any}, property: string) => void {
    if(name === undefined || name === null || typeof name !== 'string') {
        throw new TypeError(`Invalid argument 'name'. Expecting string but received ${name}.`);
    }

    return config => {
        if(config === undefined || config === null) {
            throw new TypeError(`Invalid argument 'config'. Expecting non-primative type but received ${config}.`);
        }

        return (target, property) => {
            checkTargetAndProperty(target, property);
            
            target[MiddleOutMetaDataSymbol] = target[MiddleOutMetaDataSymbol] || {};
            target[MiddleOutMetaDataSymbol][property] = target[MiddleOutMetaDataSymbol][property] || [];
            // target[MiddleOutMetaDataSymbol][property][name] = config;
            target[MiddleOutMetaDataSymbol][property] =
                (target[MiddleOutMetaDataSymbol][property] || []).concat([
                    [name, config]
                ]);
        }
    }
}

export function getMetaData(target: {[key:string]: any}): {};
export function getMetaData(target: {[key:string]: any}, porperty: string): Array<[string, any]>;
export function getMetaData(target: {[key:string]: any}, porperty: string, name: string): any | undefined;
export function getMetaData(target: {[key:string]: any}, property?: string, name?: string): Array<[string, any]> | any | undefined {
    if(target === undefined || target === null || typeof target !== 'object') {
        throw new TypeError(`Invalid argument 'target'. Expecting non-primative type but received ${target}.`);
    }

    if(property !== undefined && (property === null || typeof property !== 'string')) {
        throw new TypeError(`Invalid argument 'property'. Expecting string but received ${property}.`);
    }

    if(name !== undefined && typeof name !== 'string') {
        throw new TypeError(`Invalid argument 'name'. Expecting string but received ${name}.`);
    }

    let meta = target[MiddleOutMetaDataSymbol] || {};
    
    if(property) {
        meta = meta[property] || [];
        if(name) {
            let [ , value] = meta.filter((v: any[]) => ((v[0] || '') === name))[0] || [undefined, undefined];
            return value;
        }
    }

    return meta;
}