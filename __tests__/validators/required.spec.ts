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

        const name = getValidators(obj, "name", "required") as Function;
        const lastName = getValidators(obj, "lastName", "required") as Function;
        const age = getValidators(obj, "age", "required") as Function;

        expect(name()).toBeTruthy();
        expect(lastName()).toBeFalsy();
        expect(age()).toBeFalsy();

    });

    test('should work with ES7 decorators', () => {
        class Person {
            @required()
            public name: string = "Derek";
            @required()
            public age?: number = undefined;
        }

        let person = new Person();
        const name = getValidators(person, "name", "required") as Function;
        const age = getValidators(person, "age", "required") as Function;

        expect(name()).toBeTruthy();
        expect(age()).toBeFalsy();
    });
    
});