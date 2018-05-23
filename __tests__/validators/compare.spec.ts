import { compare } from '../../src/validators/compare';
import { getValidators } from '../../src/Validation';


describe('compare Validator', () => {
    test('should throw when improperly called', () => {
        expect(() => {
            let obj = {
                a: 5,
                b: 10
            };
            compare()(obj, "a");
            let validator = getValidators(obj, "a", "compare");
            validator();
        }).toThrow();

        expect(() => {
            let obj = {
                a: 5,
                b: 10
            };
            compare({
                predicate: 55,
                comparingProperty: "b"
            })(obj, "a");
            let validator = getValidators(obj, "a", "compare");
            validator();
        }).toThrow();

        expect(() => {
            let obj = {
                a: 5,
                b: 10
            };
            compare({
                predicate: () => true,
                comparingProperty: 55
            })(obj, "a");
            let validator = getValidators(obj, "a", "compare");
            validator();
        }).toThrow();
    });

    test('should return true for null or undefined properties', () => {
        let obj = {
            a: null,
            b: 10
        };
        compare({
            predicate: () => false,
            comparingProperty: "b"
        })(obj, "a");
        let validator = getValidators(obj, "a", "compare");
        expect(validator()).toBeTruthy();
    });

    test('should enfore comparison', () => {
        let obj = {
            a: 5,
            b: 10
        };
        compare({
            predicate: (t, a, b) => t[a] > t[b],
            comparingProperty: "b"
        })(obj, "a");
        let validator = getValidators(obj, "a", "compare");
        expect(validator()).toBeFalsy();

        obj = {
            a: 50,
            b: 10
        };
        compare({
            predicate: (t, a, b) => t[a] > t[b],
            comparingProperty: "b"
        })(obj, "a");
        validator = getValidators(obj, "a", "compare");
        expect(validator()).toBeTruthy();
    });
});