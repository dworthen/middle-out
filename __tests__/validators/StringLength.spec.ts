import { stringLength } from '../../src/validators/stringLength';
import { getValidators } from '../../src/Validation';


describe('StringLength Validator', () => {
    test('should throw when improperly called', () => {
        expect(() => {
            let obj = {name: 55};
            stringLength()(obj, "name");
            let validator = getValidators(obj, "name", "StringLength");
            validator();
        }).toThrow();
    });

    test('should enforce string length', () => {
        let obj = {
            name: "Derek"
        };

        stringLength({max: 3})(obj, "name");
        let validator = getValidators(obj, "name", "StringLength");
        expect(validator()).toBeFalsy();

        obj = {
            name: "Derek"
        };
        stringLength({min: 30})(obj, "name");
        validator = getValidators(obj, "name", "StringLength");
        expect(validator()).toBeFalsy();

        obj = {
            name: "Derek"
        };
        stringLength({min: 3, max: 10})(obj, "name");
        validator = getValidators(obj, "name", "StringLength");
        expect(validator()).toBeTruthy();

    });
});