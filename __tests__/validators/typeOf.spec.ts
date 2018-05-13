import { getValidators } from '../../src/Validation';
import { typeOf } from '../../src/validators/typeOf';


describe('typeOf validator', () => {
    test('should throw when improperly called', () => {
        expect(() => {
            let obj = {
                name: "Derek"
            };
            typeOf()(obj, "name");
            let validator = getValidators(obj, "name", "typeOf") || (() => {});
            validator();
        }).toThrow();

        expect(() => {
            let obj = {
                name: "Derek"
            };
            typeOf({})(obj, "name");
            let validator = getValidators(obj, "name", "typeOf") || (() => {});
            validator();
        }).toThrow();

        expect(() => {
            let obj = {
                name: "Derek"
            };
            typeOf({
                dataType: 55
            })(obj, "name");
            let validator = getValidators(obj, "name", "typeOf") || (() => {});
            validator();
        }).toThrow();
    });

    test('should test for typeof', () => {
        let obj = {
            name: "Derek",
            age: 55,
            cool: false,
            something: null,
            nothing: undefined,
            getName: () => {},
            nested: {},
            lastName: "Test"
        }
        typeOf({
            dataType: "string"
        })(obj, "name");
        typeOf({
            dataType: "number"
        })(obj, "age");
        typeOf({
            dataType: "boolean"
        })(obj, "cool");
        typeOf({
            dataType: "null"
        })(obj, "something");
        typeOf({
            dataType: "undefined"
        })(obj, "nothing");
        typeOf({
            dataType: "function"
        })(obj, "getName");
        typeOf({
            dataType: "object"
        })(obj, "nested");
        typeOf({
            dataType: "number"
        })(obj, "lastName");


        let validator = getValidators(obj, "name", "typeOf");
        expect(validator()).toBeTruthy();
        validator = getValidators(obj, "age", "typeOf");
        expect(validator()).toBeTruthy();
        validator = getValidators(obj, "cool", "typeOf");
        expect(validator()).toBeTruthy();
        validator = getValidators(obj, "something", "typeOf");
        expect(validator()).toBeTruthy();
        validator = getValidators(obj, "nothing", "typeOf");
        expect(validator()).toBeTruthy();
        validator = getValidators(obj, "getName", "typeOf");
        expect(validator()).toBeTruthy();
        validator = getValidators(obj, "nested", "typeOf");
        expect(validator()).toBeTruthy();
        validator = getValidators(obj, "lastName", "typeOf");
        expect(validator()).toBeFalsy();
    });
});