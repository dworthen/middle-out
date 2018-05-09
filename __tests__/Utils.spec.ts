import { checkTargetAndProperty } from '../src/Utils';

describe('Utils', () => {

    describe('checkTargetAndProperty', () => {
        test('should throw when improperly called.', () => {
            
            expect(() => {
                checkTargetAndProperty();
            }).toThrow();

            expect(() => {
                checkTargetAndProperty(55);
            }).toThrow();

            expect(() => {
                checkTargetAndProperty({});
            }).toThrow();

            expect(() => {
                checkTargetAndProperty("Hello");
            }).toThrow();

            expect(() => {
                checkTargetAndProperty({}, 55);
            }).toThrow();

        });        
    });
    
});