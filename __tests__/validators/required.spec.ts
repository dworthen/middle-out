import { required } from '../../src/validators/required';
import { getValidators } from '../../src/Validation';


describe('Required validator', () => {

    test('should return true if property is present and false otherwise.', () => {
        let obj = {
            name: "Derek",
            age: null
        };
        required()(obj, "name");
        required()(obj, "lastName");
        required()(obj, "age");

        const name = getValidators(obj, "name", "required");
        const lastName = getValidators(obj, "lastName", "required");
        const age = getValidators(obj, "age", "required");

        expect(name()).toBeTruthy();
        expect(lastName()).toBeFalsy();
        expect(age()).toBeFalsy();

    });

    test('should work with ES7 decorators', () => {
        class Person {
            @required()
            public name: string = "Derek";
            @required()
            public age?: number = null;
        }

        let person = new Person();
        const name = getValidators(person, "name", "required");
        const age = getValidators(person, "age", "required");

        let symbols = Object.getOwnPropertySymbols(Object.getPrototypeOf(person));

        expect(symbols.length).toBe(1);

        let metaData = Object.getPrototypeOf(person)[symbols[0]];

        expect(name()).toBeTruthy();
        expect(age()).toBeFalsy();
    });
    
});