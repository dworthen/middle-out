import * as MO from 'middle-out';


const oldEnough = MO.registerValidator("oldEnough", (target, property, config = {min: 0}) => {
    MO.checkTargetAndProperty(target, property);

    if(target[property] === undefined || target[property] === null) {
        return true; //use @required validator to enforce a property exists
    }

    if(typeof target[property] !== 'number') {
        throw new TypeError("oldEnough works with numbers only!!");
    }

    config = Object.assign({
        min: 0
    }, config);

    if(typeof config.min !== "number") {
        throw new TypeError(`Invalid parameter config.min. Expecting number but received ${typeof config.min}`);
    }

    return target[property] >= config.min;
});


class SomeClass {

}

class Person {

    @MO.required()
    @MO.typeOf({dataType: 'string'})
    @MO.stringLength({min: 3, max: 20})
    name = "Derek";
    
    @MO.mobilePhone()
    phone = 5553336543;

    @MO.emailAddress()
    email = "something@awesome.com";
    
    @MO.range({min: 0, max: 150})
    age = 55;

    @oldEnough({min: 21})
    oldEnough = 22;

    @MO.compare({
        comparingProperty: 'age',
        predicate: (mine, parents) => (parents > mine)
    })
    parentsAge = 78;
    
    @MO.creditCard()
    creditCard = "4444333322221111";
    
    @MO.instanceOf({constor: SomeClass})
    someClass = new SomeClass();
    
}

let person = new Person();

let [isValid, errors] = MO.validate(person);

console.log(isValid, errors);