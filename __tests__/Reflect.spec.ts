import { registerMetaData, getMetaData, getAllMetaData } from '../src/Reflect';


describe('Reflect API', () => {

    describe("registerMetaData", () => {

        test("should register meta data on an object property", () => {

            let register = registerMetaData<string>("key");
            let obj: {[k:string]: any} = {name: "Derek"};
            register("value")(obj, "name");

            let symbols = Object.getOwnPropertySymbols(obj);

            expect(symbols.length).toBe(1);

            let metaData = obj[symbols[0]];
            expect(metaData).toEqual({
                name: [ ["key", "value"] ]
            });
            // expect(Array.isArray(metaData.name)).toBe(true);
            // expect(Array.isArray(metaData.name[0])).toBe(true);
            // expect(metaData.name[0]).toEqual(['key', 'value']);

        });

        test("should throw when inproperly called", () => {

            expect(() => {
                registerMetaData();
            }).toThrow();

            expect(() => {
                registerMetaData(5);
            }).toThrow();

            expect(() => {
                let register = registerMetaData<string>("key");
                register();
            }).toThrow();

            expect(() => {
                let register = registerMetaData<string>("key");
                register("value")();
            }).toThrow();

            expect(() => {
                let register = registerMetaData<string>("key");
                register("value")("primitive");
            }).toThrow();

            expect(() => {
                let register = registerMetaData<string>("key");
                let obj: any = {name: "Derek"};
                register("value")(obj);
            }).toThrow();

            expect(() => {
                let register = registerMetaData<string>("key");
                let obj: any = {name: "Derek"};
                register("value")(obj, 5);
            }).toThrow();

        });

        test('should work with ES7 decorator syntax', () => {
            let register = registerMetaData<string>("key");
           
            class Obj {
                @register("value")
                name: string = "Derek";
                constructor() { }
            }

            let obj: any = new Obj();

            let symbols = Object.getOwnPropertySymbols(Object.getPrototypeOf(obj));

            expect(symbols.length).toBe(1);

            let metaData = Object.getPrototypeOf(obj)[symbols[0]];
            expect(metaData).toEqual({
                name: [ ["key", "value"] ]
            });
            
            metaData = obj[symbols[0]];
            expect(metaData).toEqual({
                name: [ ["key", "value"] ]
            });

        });

    });

    describe('getAllMetaData', () => {

        test('should return {} for object with no metadata', () => {
            expect(getAllMetaData({name: "Derek"})).toEqual({});
        });
        
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

        test('should work with ES7 decorator syntax', () => {
            let register1 = registerMetaData<string>("nickname");
            let register2 = registerMetaData<number>("realAge");
           
            class Obj {
                @register1("Dwayne")
                name: string = "Derek";

                @register2(28)
                age: number = 25;

                constructor() { }
            }

            let obj: {[key:string]: any} = new Obj();

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

        test('should throw when improperly called', () => {
    
            expect(() => {
                getAllMetaData()
            }).toThrow();

            expect(() => {
                getAllMetaData(null)
            }).toThrow();

            expect(() => {
                getAllMetaData(5)
            }).toThrow();
            
        });

    });

    describe('getMetaData', () => {

        test('should return [] for object property with no metadata', () => {
            expect(getMetaData({name: "Derek"}, "name")).toEqual([]);
            expect(getMetaData({name: "Derek"}, "age")).toEqual([]);
            expect(getMetaData({name: "Derek"}, "age", "displayName")).toBeUndefined();
        });

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

            expect(metaData).toEqual("Dwayne");

        });

        test('should retrieve metadata for a single object property using ES7 decorators', () => {
            let register1 = registerMetaData<string>("nickname");
            let register2 = registerMetaData<number>("realAge");
            let register3 = registerMetaData<string>("nickname2");
           
            class Obj {
                @register3("DTrain")
                @register1("Dwayne")
                name: string = "Derek";

                @register2(28)
                age: number = 25;

                constructor() { }
            }

            let obj: {[key:string]: any} = new Obj();

            let metaData = getMetaData(obj, "name");

            expect(metaData).toEqual([
                ["nickname", "Dwayne"],
                ["nickname2", "DTrain"]
            ]);
            
        });

        test('should retrieve a single metadata for a single object property using ES7 decorators', () => {
            let register1 = registerMetaData<string>("nickname");
            let register2 = registerMetaData<number>("realAge");
            let register3 = registerMetaData<string>("nickname2");
           
            class Obj {
                @register3("DTrain")
                @register1("Dwayne")
                name: string = "Derek";

                @register2(28)
                age: number = 25;

                constructor() { }
            }

            let obj: {[key:string]: any} = new Obj();

            let metaData = getMetaData(obj, "name", "nickname");

            expect(metaData).toEqual("Dwayne");
            
        });

        test('should throw when improperly called', () => {
    
            expect(() => {
                getMetaData()
            }).toThrow();

            expect(() => {
                getMetaData(5)
            }).toThrow();

            expect(() => {
                getMetaData({name: "Derek"})
            }).toThrow();

            expect(() => {
                getMetaData({name: "Derek"}, 5)
            }).toThrow();
            
            expect(() => {
                getMetaData({name: "Derek"}, "name", 10)
            }).toThrow();

        });

    });

});