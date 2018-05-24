import * as MO from 'middle-out';


class Person {

    @MO.required()
    @MO.emailAddress()
    name = "Derek";
}

let person = new Person();

console.log(person.name);

console.log(MO.validate(person));