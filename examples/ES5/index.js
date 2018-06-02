var MO = require('middle-out');


let obj = {
    name: "Derek",
    age: 55
};

MO.required()(obj, "name");
MO.emailAddress()(obj, "name");
MO.range({min: 0, max: 150})(obj, "age");

var results = MO.validate(obj);

console.log(results);
