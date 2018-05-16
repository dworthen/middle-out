import { emailAddress } from '../../src/validators/emailAddress';
import { getValidators } from '../../src/Validation';


describe('emailAddress validator', () => {
    test('should throw when improperly called.', () => {
        expect(() => {
            let obj = {
                email: 55
            };
            emailAddress()(obj, "email");
            let validator = getValidators(obj, "email", "emailAddress");
            validator();
        }).toThrow();

        expect(() => {
            let obj = {
                email: "something@email.com"
            };
            emailAddress({
                allow_display_name: 55
            })(obj, "email");
            let validator = getValidators(obj, "email", "emailAddress");
            validator();
        }).toThrow();

        expect(() => {
            let obj = {
                email: "something@email.com"
            };
            emailAddress({
                require_display_name: 55
            })(obj, "email");
            let validator = getValidators(obj, "email", "emailAddress");
            validator();
        }).toThrow();

        expect(() => {
            let obj = {
                email: "something@email.com"
            };
            emailAddress({
                allow_utf8_local_part: 55
            })(obj, "email");
            let validator = getValidators(obj, "email", "emailAddress");
            validator();
        }).toThrow();

        expect(() => {
            let obj = {
                email: "something@email.com"
            };
            emailAddress({
                require_tld: 55
            })(obj, "email");
            let validator = getValidators(obj, "email", "emailAddress");
            validator();
        }).toThrow();
    });

    test('should return true when property is null or undefined', () => {
        let obj = {
            email: null
        };
        emailAddress()(obj, "email");
        let validator = getValidators(obj, "email", "emailAddress");
        expect(validator()).toBeTruthy();
    });

    test('should enforce email format', () => {
        let obj = {
            email: "testing"
        };
        emailAddress()(obj, "email");
        let validator = getValidators(obj, "email", "emailAddress");
        expect(validator()).toBeFalsy();

        obj = {
            email: "something@email.com"
        };
        emailAddress()(obj, "email");
        validator = getValidators(obj, "email", "emailAddress");
        expect(validator()).toBeTruthy();
    });
});