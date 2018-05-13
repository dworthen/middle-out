import { getValidators } from '../../src/Validation';
import { instanceOf } from '../../src/validators/instanceOf';


describe('instanceOf validator', () => {
    test('should throw when improperly called', () => {
        expect(() => {
            let obj = {
                name: "Derek"
            };
            instanceOf()(obj, "name");
            let validator = getValidators(obj, "name", "instanceOf") || (() => {});
            validator();
        }).toThrow();

        expect(() => {
            let obj = {
                name: "Derek"
            };
            instanceOf({})(obj, "name");
            let validator = getValidators(obj, "name", "instanceOf") || (() => {});
            validator();
        }).toThrow();

        expect(() => {
            let obj = {
                name: "Derek"
            };
            instanceOf({
                dataType: 55
            })(obj, "name");
            let validator = getValidators(obj, "name", "instanceOf") || (() => {});
            validator();
        }).toThrow();
    });

    test('should test for instanceOf', () => {
        let SomeClass = function() {

        };
        let obj = {
            nested: new SomeClass(),
            age: 55,
            another: null
        }
        instanceOf({
            constor: SomeClass
        })(obj, "nested");
        instanceOf({
            constor: SomeClass
        })(obj, "age");
        instanceOf({
            constor: SomeClass
        })(obj, "another");


        let validator = getValidators(obj, "nested", "instanceOf");
        expect(validator()).toBeTruthy();
        validator = getValidators(obj, "age", "instanceOf");
        expect(validator()).toBeFalsy();
        validator = getValidators(obj, "another", "instanceOf");
        expect(validator()).toBeTruthy();
    });
});