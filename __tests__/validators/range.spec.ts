import { range } from '../../src/validators/range';
import { getValidators } from '../../src/Validation';


describe('range Validator', () => {
    test('should throw when improperly called', () => {
        expect(() => {
            let obj = {name: "cool"};
            range()(obj, "name");
            let validator = getValidators(obj, "name", "range");
            validator();
        }).toThrow();

        expect(() => {
            let obj = {name: 55};
            range({
                min: "a"
            })(obj, "name");
            let validator = getValidators(obj, "name", "range");
            validator();
        }).toThrow();

        expect(() => {
            let obj = {name: 55};
            range({
                max: "a"
            })(obj, "name");
            let validator = getValidators(obj, "name", "range");
            validator();
        }).toThrow();
    });

    test('should enforce string length', () => {
        let obj = {
            age: 18
        };

        range({max: 3})(obj, "age");
        let validator = getValidators(obj, "age", "range");
        expect(validator()).toBeFalsy();

        obj = {
            age: 18
        };
        range({min: 30})(obj, "age");
        validator = getValidators(obj, "age", "range");
        expect(validator()).toBeFalsy();

        obj = {
            age: 18
        };
        range({min: 3, max: 100})(obj, "age");
        validator = getValidators(obj, "age", "range");
        expect(validator()).toBeTruthy();

        obj = {
            age: null
        };
        range({min: 3, max: 10})(obj, "age");
        validator = getValidators(obj, "age", "range");
        expect(validator()).toBeTruthy();

    });
});