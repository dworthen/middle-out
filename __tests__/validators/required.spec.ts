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

        const name = getValidators(obj, "name", "Required");
        const lastName = getValidators(obj, "lastName", "Required");
        const age = getValidators(obj, "age", "Required");

        expect(name()).toBeTruthy();
        expect(lastName()).toBeFalsy();
        expect(age()).toBeFalsy();

    });
    
});