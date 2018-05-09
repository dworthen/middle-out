import { registerValidator, getValidators, validate, errorTemplate } from '../src/Validation';

describe('Validation Registration API', () => {
    
    describe('registerValidator', () => {
        
        test('should throw when improperly called', () => {
            expect(() => {
                registerValidator();
            }).toThrow();

            expect(() => {
                registerValidator(5);
            }).toThrow();

            expect(() => {
                registerValidator("test", "hello");
            }).toThrow();

            expect(() => {
                registerValidator<number>("test", () => true)(5);
            }).toThrow();

            expect(() => {
                registerValidator("test", () => true)()();
            }).toThrow();

            expect(() => {
                registerValidator("test", () => true)()({name: "Derek"});
            }).toThrow();

            expect(() => {
                registerValidator("test", () => true)()({name: "Derek"}, 5);
            }).toThrow();

        });

        test("should register validators on an object property", () => {

            let validationFn = (t: any, p: string, config = {min: 5}) => {
                // return t && t[p] && t[p] > min;
                return true;
            };

            let validator1 = registerValidator<{min: number}>("min", validationFn);

            let obj: {[key: string]: any} = {age: 15};
            validator1()(obj, "age");

            let symbols = Object.getOwnPropertySymbols(obj);

            expect(symbols.length).toBe(1);

            let metaData = obj[symbols[0]];
            expect(Array.isArray(metaData.age)).toBeTruthy();
            expect(Array.isArray(metaData.age[0])).toBeTruthy();
            expect(metaData.age[0][0]).toBe("min");
            expect(typeof metaData.age[0][1] === 'function').toBeTruthy();
            
        });

        test('should work with ES7 decorator syntax', () => {
            let validationFn = (t: any, p: string, config = {min: 0}) => {
                let {min} = config;
                return t && t[p] && t[p] > min;
            };

            let validator1 = registerValidator<{min: number}>("min", validationFn);
           
            class Obj {
                @validator1({min: 21})
                age: number = 15;
                constructor() { }
            }

            let obj: any = new Obj();

            let symbols = Object.getOwnPropertySymbols(Object.getPrototypeOf(obj));

            expect(symbols.length).toBe(1);

            let metaData = Object.getPrototypeOf(obj)[symbols[0]];
            expect(Array.isArray(metaData.age)).toBeTruthy();
            expect(Array.isArray(metaData.age[0])).toBeTruthy();
            expect(metaData.age[0][0]).toBe("min");
            expect(typeof metaData.age[0][1] === 'function').toBeTruthy();
            
            metaData = obj[symbols[0]];
            expect(Array.isArray(metaData.age)).toBeTruthy();
            expect(Array.isArray(metaData.age[0])).toBeTruthy();
            expect(metaData.age[0][0]).toBe("min");
            expect(typeof metaData.age[0][1] === 'function').toBeTruthy();

        });

    });

    describe('getValidators', () => {

        test('should throw when improperly called', () => {
            expect(() => {
                getValidators();
            }).toThrow();

            expect(() => {
                getValidators(5);
            }).toThrow();

            expect(() => {
                getValidators({name: "Derek"}, 55);
            }).toThrow();

            expect(() => {
                getValidators({name: "Derek"}, "name", 555);
            }).toThrow();
        });

        test('should return [] for object property with no validators', () => {
            let obj = {name: "Derek"};
            expect(getValidators(obj)).toEqual({});
            expect(getValidators(obj, "name")).toEqual([]);
            expect(getValidators(obj, "age")).toEqual([]);
            expect(getValidators(obj, "age", "displayName")).toBeUndefined();
        });

        test("should retrieve validators on an object", () => {

            let validationFn = (t: any, p: string, config = {min: 5}) => {
                // return t && t[p] && t[p] > min;
                return true;
            };

            let validator1 = registerValidator<{min: number}>("min", validationFn);

            let obj: {[key: string]: any} = {age: 15};
            validator1()(obj, "age");

            let metaData = getValidators(obj);

            expect(Array.isArray(metaData.age)).toBeTruthy();
            expect(Array.isArray(metaData.age[0])).toBeTruthy();
            expect(metaData.age[0][0]).toBe("min");
            expect(typeof metaData.age[0][1] === 'function').toBeTruthy();

            metaData = getValidators(obj, "age");
            expect(Array.isArray(metaData)).toBeTruthy();
            expect(metaData.length).toBe(1);
            expect(Array.isArray(metaData[0])).toBeTruthy();
            expect(metaData[0].length).toBe(2);
            expect(metaData[0][0]).toBe("min");
            expect(typeof metaData[0][1] === 'function').toBeTruthy();

            let results = getValidators(obj, "age", "min");
            expect(typeof results === 'function').toBeTruthy();
            
        });

        test('should work with ES7 decorator syntax', () => {
            let validationFn = (t: any, p: string, config = {min: 0}) => {
                let {min} = config;
                return t && t[p] && t[p] > min;
            };

            let validator1 = registerValidator<{min: number}>("min", validationFn);
           
            class Obj {
                @validator1({min: 21})
                age: number = 15;
                constructor() { }
            }

            let obj: any = new Obj();

            let metaData = getValidators(obj);

            expect(Array.isArray(metaData.age)).toBeTruthy();
            expect(Array.isArray(metaData.age[0])).toBeTruthy();
            expect(metaData.age[0][0]).toBe("min");
            expect(typeof metaData.age[0][1] === 'function').toBeTruthy();

            metaData = getValidators(obj, "age");
            expect(Array.isArray(metaData)).toBeTruthy();
            expect(metaData.length).toBe(1);
            expect(Array.isArray(metaData[0])).toBeTruthy();
            expect(metaData[0].length).toBe(2);
            expect(metaData[0][0]).toBe("min");
            expect(typeof metaData[0][1] === 'function').toBeTruthy();

            let results = getValidators(obj, "age", "min");
            expect(typeof results === 'function').toBeTruthy();

        });

    });

    describe('validate', () => {

        test('should return [true, {}] when valid.', () => {
            let validationFn = (t: any, p: string, config = {min: 5}) => {
                // return t && t[p] && t[p] > min;
                return true;
            };
    
            let validator1 = registerValidator<{min?: number}>("min", validationFn);
    
            let obj: {[key: string]: any} = {age: 15};
            validator1({
                errorMessage: "Error"
            })(obj, "age");
    
            let [isValid, results] = validate(obj);
            expect(isValid).toBeTruthy();
            expect(results).toEqual({});
        });


        test('should return ValidationError with string message', () => {
            let validationFn = (t: any, p: string, config = {min: 5}) => {
                // return t && t[p] && t[p] > min;
                return false;
            };
    
            let validator1 = registerValidator<{min?: number}>("min", validationFn);
    
            let obj: {[key: string]: any} = {age: 15};
            validator1({
                errorMessage: "Error"
            })(obj, "age");
    
            let [isValid, results] = validate(obj);
            expect(isValid).toBeFalsy();
            expect(results).toEqual({
                age: {
                    min: {
                        property: 'age',
                        target: obj,
                        value: 15,
                        message: "Error"
                    }
                }
            });
        });

        test('should return ValidationError with function call', () => {
            let validationFn = (t: any, p: string, config = {min: 5}) => {
                // return t && t[p] && t[p] > min;
                return false;
            };
    
            let validator1 = registerValidator<{min?: number}>("min", validationFn);
    
            let obj: {[key: string]: any} = {age: 15};
            validator1({
                errorMessage: ({displayName, target, property, value}) => `${displayName} failed with ${value}.`
            })(obj, "age");
    
            let [isValid, results] = validate(obj);
            expect(isValid).toBeFalsy();
            expect(results).toEqual({
                age: {
                    min: {
                        property: 'age',
                        target: obj,
                        value: 15,
                        message: "age failed with 15."
                    }
                }
            });
        });

    });

    describe('errorTemplate', () => {
        
        test('should return function for generating error messages', () => {
            let template = errorTemplate`${"displayName"} failed with ${"value"}`;
            let message = template({displayName: "Name", target: {}, property: "name", value: "cool"});
            expect(message).toEqual("Name failed with cool");
        });

    });

});