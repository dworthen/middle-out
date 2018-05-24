var MO = require('middle-out');


let obj = {
    name: "Derek"
};

MO.required()(obj, "name");
MO.emailAddress()(obj, "name");

var results = MO.validate(obj);

console.log(results);
