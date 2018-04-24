import { registerMetaData, getMetaData, getAllMetaData } from '../src/Reflect';


describe('Reflect API', () => {

    describe("registerMetaData", () => {

        test("should register meta data on an object property", () => {

            let register = registerMetaData<string>("key");
            let obj: {[key: string]: any} = {name: "Derek"};
            register("value")(obj, "name");

            console.log(obj);
            let symbols = Object.getOwnPropertySymbols(obj);

            expect(symbols.length).toBe(1);

            let metaData = obj[symbols[0]];
            expect(metaData).toHaveProperty("name");
            expect(metaData.name).toEqual([
                ["key", "value"]
            ]);
            // expect(Array.isArray(metaData.name)).toBe(true);
            // expect(Array.isArray(metaData.name[0])).toBe(true);
            // expect(metaData.name[0]).toEqual(['key', 'value']);

        });

        test('should work with ES7 decorator syntax', () => {
            let register = registerMetaData<string>("key");
           
            class Obj {
                @register("value")
                name: string = "Derek";
                constructor() {

                }
            }

            let obj: {[key:string]: any} = new Obj();

            let symbols = Object.getOwnPropertySymbols(obj);
            console.log(symbols);

            expect(symbols.length).toBe(1);

            let metaData = obj[symbols[0]];
            expect(metaData).toHaveProperty("name");
            expect(metaData.name).toEqual([
                ["key", "value"]
            ]);
        });

    });

    describe('getAllMetaData', () => {
        
        test('should retrieve all metadata for an object', () => {
            let register1 = registerMetaData<string>("nickname");
            let register2 = registerMetaData<number>("realAge");
            let obj: {[key: string]: any} = {name: "Derek", age: 25};
            register1("Dwayne")(obj, "name");
            register2(28)(obj, "age");
        
            let metaData = getAllMetaData(obj);
        
            expect(metaData).toEqual({
                "name": [
                    ["nickname", "Dwayne"]
                ],
                "age": [
                    ["realAge", 28]
                ]
            });
        });

    });

    describe('getMetaData', () => {

        test('should retrieve metadata for a single object property', () => {
            
            let register1 = registerMetaData<string>("nickname");
            let register2 = registerMetaData<number>("realAge");
            let register3 = registerMetaData<string>("nickname2");
            let obj: {[key: string]: any} = {name: "Derek", age: 25};
            register1("Dwayne")(obj, "name");
            register3("DTrain")(obj, "name");
            register2(28)(obj, "age");

            let metaData = getMetaData(obj, "name");

            expect(metaData).toEqual([
                ["nickname", "Dwayne"],
                ["nickname2", "DTrain"]
            ]);

        });

        test('should retrieve a single metadata for a single object property', () => {
            
            let register1 = registerMetaData<string>("nickname");
            let register2 = registerMetaData<number>("realAge");
            let register3 = registerMetaData<string>("nickname2");
            let obj: {[key: string]: any} = {name: "Derek", age: 25};
            register1("Dwayne")(obj, "name");
            register3("DTrain")(obj, "name");
            register2(28)(obj, "age");

            let metaData = getMetaData(obj, "name", "nickname");

            expect(metaData).toEqual([
                ["nickname", "Dwayne"]
            ]);

        });

    });

})