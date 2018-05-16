import { creditCard } from '../../src/validators/creditCard';
import { getValidators } from '../../src/Validation';


describe('creditCard Validator', () => {
    test('should throw when improperly called', () => {
        expect(() => {
            let obj = {card: 55};
            creditCard()(obj, "card");
            let validator = getValidators(obj, "card", "creditCard");
            validator();
        }).toThrow();
    });

    test('should enforce string is credit card', () => {
        let obj = {
            card: "Derek"
        };

        creditCard()(obj, "card");
        let validator = getValidators(obj, "card", "creditCard");
        expect(validator()).toBeFalsy();

        obj = {
            card: "4929026559968511"
        };
        creditCard()(obj, "card");
        validator = getValidators(obj, "card", "creditCard");
        expect(validator()).toBeTruthy();

        obj = {
            card: "4929-0265-5996-8511"
        };
        creditCard()(obj, "card");
        validator = getValidators(obj, "card", "creditCard");
        expect(validator()).toBeTruthy();

        obj = {
            card: "1234567890123498"
        };
        creditCard()(obj, "card");
        validator = getValidators(obj, "card", "creditCard");
        expect(validator()).toBeFalsy();

    });
});