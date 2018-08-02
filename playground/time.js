const moment = require("moment");

// dates are just an integer that is milliseconds added to Jan 1st 1970 00:00 am

var dateInt = new Date();
console.log(dateInt.getMonth());

// New object that that represents the current point in time
var date = moment();

date.add(100, "year").subtract(9, "month");

console.log(date.format());

// look on moment display docs for the formatting codes
console.log(date.format("Do MMM, YYYY"));

console.log(date.format("h:mm a"))