import { mobilePhone } from '../../src/validators/mobilePhone';
import { getValidators } from '../../src/Validation';


describe('mobilePhone validator', () => {
    test('should throw when improperly called', async () => {
        expect(() => {
            let obj = {
                phone: () => {}
            };
            mobilePhone()(obj, "phone");
            let validator = getValidators(obj, "phone", "mobilePhone");
            validator();
        }).toThrow();

        expect(() => {
            let obj = {
                phone: 55
            };
            mobilePhone({
                locale: 55
            })(obj, "phone");
            let validator = getValidators(obj, "phone", "mobilePhone");
            validator();
        }).toThrow();

        expect(() => {
            let obj = {
                phone: 55
            };
            mobilePhone({
                strictMode: 55
            })(obj, "phone");
            let validator = getValidators(obj, "phone", "mobilePhone");
            validator();
        }).toThrow();
    });

    test('should pass when property is null or undefined', async () => {
        let obj = {
            phone: null
        };
        mobilePhone()(obj, "phone");
        let validator = getValidators(obj, "phone", "mobilePhone");
        expect(validator()).toBeTruthy();
    });

    test('should enforce property is a phone number', async () => {
        let obj: any = {
            phone: "fdafd"
        };
        mobilePhone()(obj, "phone");
        let validator = getValidators(obj, "phone", "mobilePhone");
        expect(validator()).toBeFalsy();

        obj = {
            phone: 55
        };
        mobilePhone()(obj, "phone");
        validator = getValidators(obj, "phone", "mobilePhone");
        expect(validator()).toBeFalsy();

        obj = {
            phone: "5555555545"
        };
        mobilePhone()(obj, "phone");
        validator = getValidators(obj, "phone", "mobilePhone");
        expect(validator()).toBeTruthy();

        obj = {
            phone: "+15555555545"
        };
        mobilePhone({
            strictMode: true
        })(obj, "phone");
        validator = getValidators(obj, "phone", "mobilePhone");
        expect(validator()).toBeTruthy();

        obj = {
            phone: 5555555545
        };
        mobilePhone()(obj, "phone");
        validator = getValidators(obj, "phone", "mobilePhone");
        expect(validator()).toBeTruthy();

    });

});