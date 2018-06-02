Middle Out

![Visual Studio Team services](https://img.shields.io/vso/build/derekworthen/28f9ce90-1a76-4c9b-b520-b4a0dd24477d/4.svg) 
![Coveralls github](https://img.shields.io/coveralls/github/dworthen/middle-out.svg) 
![npm](https://img.shields.io/npm/v/middle-out.svg)

Agnostic data validation. 

# Data Validation with ES Classes and Decorators

```JavaScript
import * as MO from 'middle-out';

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

    @MO.compare({
        comparingProperty: 'age',
        predicate: (target, parents, age) => (target[parents] > target[age])
    })
    parentsAge = 78;
    
    @MO.creditCard()
    creditCard = "4444333322221111";    
}

let person = new Person();

let [isValid, errors] = MO.validate(person); 
// true, {}

person.age = -10;

[isValid, errors] = MO.validate(person);
// false, {age: {range: ...}}
```

# Data Validation with ES5/Plain Object

```JavaScript
let obj = {
    name: "Derek",
    age: 55
};

MO.required()(obj, "name");
MO.emailAddress()(obj, "name");
MO.range({min: 0, max: 150})(obj, "age");

var results = MO.validate(obj);
```

# Installation

```shell
npm install middle-out
```

## Usage

### NodeJS/CommmonJS

```JavaScript
var MO = require('middle-out');
```

### ES Modules

```JavaScript
import { required } from 'middle-out/dist/esm/required';
```

> **Note on build tools.** Webpack and rollup use ES modules by default so it is fine to write `import { required } from 'middle-out';`. 

# Custom Validators

```JavaScript
// canDrive.js
const canDrive = MO.registerValidator("canDrive", (target, property, config) => {
    return target[property] >= config.drivingAge;
});

// someOtherFile.js
import { canDrive } from './canDrive';

class Person {
    @canDrive({drivingAge: 16})
    age = 15;
}
```

## Default Config Object

`registerValidator` returns a decorator factory, `(config?) => ((target, property) => void)`, a function that accepts an optional config object and returns a function suitable for decorating an object property. Config is optional, provide a default object and validate.

```JavaScript
const canDrive = MO.registerValidator("canDrive", (target, property, config) => {

    // set default properties for config object
    config = Object.assign({
        permitAge: 15,
        drivingAge: 16
    }, config || {} /* config is optional so it may be undefined */);

    // Validate config. User may have passed in {drivingAge: "Hello"}
    if(typeof config.drivingAge !== "number") {
        throw new TypeError(`Invalid parameter config.drivingAge. Expecting number but received ${typeof config.drivingAge}`);
    }

    if(typeof config.permitAge !== "number") {
        throw new TypeError(`Invalid parameter config.permitAge. Expecting number but received ${typeof config.permitAge}`);
    }

    return target[property] >= config.drivingAge;
});
```

## Target and Property

Validators can be called on plain objects, i.e., `required()(obj, 'age');`. Validators need to ensure target and property exist.

```JavaScript
const canDrive = MO.registerValidator("canDrive", (target, property, config) => {
    if(typeof target !== 'object') {
        throw new TypeError(`Invalid argument 'target'. Expecting object but received ${typeof target}.`);
    }
 
    if(typeof property !== 'string') {
        throw new TypeError(`Invalid argument property. Expecting string but received ${typeof property}.`);
    }
    // or use the utility function MO.checkTargetAndProperty(target, property);

    // Validate the type being validated
    if(typeof target[property] !== 'number') {
        throw new TypeError("candDrive works with numbers only!!");
    }
    ...
}
```

## Compose Validators

Validators should do one thing. 

```JavaScript
const canDrive = MO.registerValidator("canDrive", (target, property, config) => {
    // check target and property exist
    MO.checkTargetAndProperty(target, property);

    // return true if there is nothing to validate
    if(target[property] === undefined || target[property] === null) {
        return true; //use @required validator to enforce a property exists
    }

    // Validate the type being validated
    if(typeof target[property] !== 'number') {
        throw new TypeError("candDrive works with numbers only!!");
    }

    // set default properties for config object
    config = Object.assign({
        permitAge: 15,
        drivingAge: 16
    }, config || {} /* config is optional so it may be undefined */);

    // Validate config. User may have passed in {drivingAge: "Hello"}
    if(typeof config.drivingAge !== "number") {
        throw new TypeError(`Invalid parameter config.drivingAge. Expecting number but received ${typeof config.drivingAge}`);
    }

    if(typeof config.permitAge !== "number") {
        throw new TypeError(`Invalid parameter config.permitAge. Expecting number but received ${typeof config.permitAge}`);
    }

    return target[property] >= config.drivingAge;
});
```