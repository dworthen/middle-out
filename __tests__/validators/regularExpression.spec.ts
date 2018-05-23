import { regularExpression } from '../../src/validators/regularExpression';
import { getValidators } from '../../src/Validation';


describe('regularExpression validator', () => {
    test('should throw when improperly called', () => {
        expect(() => {
            let obj = {
                name: "Derek"
            };
            regularExpression()(obj, "nam");
            let validator = getValidators(obj, "name", "regularExpression");
            validator();
        }).toThrow();

        expect(() => {
            let obj = {
                name: "Derek"
            };
            regularExpression({
                regex: "hello"
            })(obj, "name");
            let validator = getValidators(obj, "name", "regularExpression");
            validator();
        }).toThrow();

        expect(() => {
            let obj = {
                name: 55
            };
            regularExpression({
                regex: /Derek/
            })(obj, "name");
            let validator = getValidators(obj, "name", "regularExpression");
            validator();
        }).toThrow();
    });


    test('should return true for null or undefined properties', () => {
        let obj = {
            name: null
        };
        regularExpression({
            regex: /Derek/
        })(obj, "name");
        let validator = getValidators(obj, "name", "regularExpression");
        expect(validator()).toBeTruthy();
    });

    test('should enforce regex', () => {
        let obj = {
            name: "Derek"
        };
        regularExpression({
            regex: /Derek/
        })(obj, "name");
        let validator = getValidators(obj, "name", "regularExpression");
        expect(validator()).toBeTruthy();

        obj = {
            name: "derek"
        };
        regularExpression({
            regex: /Derek/
        })(obj, "name");
        validator = getValidators(obj, "name", "regularExpression");
        expect(validator()).toBeFalsy();
    });

});