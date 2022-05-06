'use strict';
//Numbers
//numbers are always represented internally as floating point numbers meaning 23 === 23.0
//Numbers are represented using 64bits. Each number is a pattern of 64 1s and/or 0s. 53 bits are for storing the number and 7bits are for storing the position of the decimal point. With 53bits the largest number available to store is 2**53-1 or
//Number.MAX_SAFE_INTEGER   //9,007,199,254,740,991
//javascript uses base 2 for numbers behind the scenes so you cannot do complex finacial calcs for example in JS
//
//Strings to numbers
// Number('23') can be replaced with +'23' and JS will do type conversion automatically
//
//parsing
/*
Number.parseInt will convert strings to numbers but only if the number is the first thing in the string
Number.parseInt('30px) // 30
and it takes a second argument as the redix for the number's base
//
Number.parseFloat('2.5rem') // 2.5
Number.parseInt('30.5px) // 30
parseFloat allows for decimals
*/
//
//Number.isNaN()
/*
//
//check is value is NaN, if it actually returns NaN
Number.isNaN(20) //false
Number.isNaN('20') //false
Number.isNaN(+'20px') //true
Number.isNaN(23/0) //false
//
//isFinite is the best way of checking if it is a real number
Number.isFinite(20) //true
Number.isFinite('20') //false
Number.isFinite(+'20x') //false
Number.isFinite(23/0) //false
*/
///////////////////////////////////////////////////
//mathematical operations
/*
Math.sqrt(number) //square root function
8 ** (1/3)  //cubic root etc
Math.max(5, 18, 11, '23')  // 23 will do type conversion
Math.max(5, 18, 11, '23', '47px')  // NaN will not parse
Math.min()

Math.PI  //3.14....
Math.PI*10**2 area of circle with radius = 10
Math.random()
Math.trunc()
Math.round() /// rounds to the nearest integer
Math.floor()
Math.ceil()
(number).toFixed()  //returns a string
*/

//remainder operater
//%
///////////////////////////////////////////////////

//numeric seperators
/*
287,460,000,000 can be written in javascript like so
287_460_000_000 
this makes it easier to read

const priceInCents = 345_99       34599¢ = $345.99
const price = 345.99

*/
////////////////////////////////////////////////////
//DATES AND TIME
/*
creating dates
const now = new Date()  //gives the current date and time at that exact moment
new Date('string') //generally used when there is a date string created by javascript that is being pulled
new Date(2037, 10, 19, 15, 23, 5) //Thu Nov 19 2037 15:23:05 .....
the 10 gives us the month of Nov because months are 0 based like arrays
auto corrects the date if needed
//
The time stamp of a day is the number of miliseconds after the inti day which is Thu Jan 01 1970
new Date(0)  //Thu Jan 01 1970
new Date(3*24*60*60*1000) //Sun Jan 04 1970
the second is 3 days after the inti day and has a time stamp of 259200000
//
//
const future = new Date(2037, 10, 19, 15, 23, 5);
future.getFullYear(); //2037
future.getMonth(); //10 zero based month == Nov
future.getDate(); //19 the day of the month
future.getDay(); //4  the day of the week Thu (Sunday is 0, saturday is 6)
future.getHours(); //15
future.getMinutes(); //23
future.getSeconds(); //5
console.log(future.toISOString()); //2037-11-19T21:23:05.000Z
//this is usually what we get from a user interface or API?
console.log(future.getTime()); //2142278585000  gives us the timestamp of the date (number of miliseconds since Thu Jan 01 1970)
console.log(new Date(2142278585000)); //Thu Nov 19 2037 15:23:05 GMT-0600 (Central Standard Time)
console.log(Date.now()); //shortcut to getting the timestamp for right now
//
//
console.log(future); //Thu Nov 19 2037 15:23:05 GMT-0600 (Central Standard Time)
future.setFullYear(2040);
console.log(future); //Mon Nov 19 2040 15:23:05 GMT-0600 (Central Standard Time)
//you can set all the elements of a Date just like you can .get them all

*/

//DATES
const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (24 * 60 * 60 * 1000);
const period1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
// console.log(period1);
const period2 = calcDaysPassed(new Date(2037, 3, 28), new Date(2036, 3, 28));
// console.log(period2);
const period3 = calcDaysPassed(
  new Date(2037, 3, 28),
  new Date(2037, 3, 24, 10, 8)
);
// console.log(period3);
////////////////////////////////////////////////////
//internationalizing dates
/*
const now = new Date();
labelDate.textContent = new Intl.DateTimeFormat('en-UK').format(now);
sets this text content to the international format for the UK (in english) of the date stored in the now variable

labelDate.textContent = new Intl.DateTimeFormat('ar-SY').format(now);
//write it in aribic using the format from Syria
*/

//use an options object as the second argument for your date formating and include in that object all the pieces that you want in your format
const now2 = new Date();
const options2 = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long', //long = feburary, 2-digit = 02, numeric = 2
  year: 'numeric',
  weekday: 'long', //long= Friday, narrow = F, short= Fri
};
const locale2 = navigator.language; //will set this variable equal to whatever language you have in your browser (en-US) or (en-GB) or (ar-SY)
//then you can use this as your first argument

// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now2);
////////////////////////////////////////////////////
//formating numbers
const num = 38854318.656;
const options3 = {
  style: 'unit',
  unit: 'celsius', // or miles-per-hour
};
const options4 = {
  style: 'percent',
};
const options5 = {
  style: 'currency',
  currency: 'EUR', //not defined by the locale
};
// console.log('USA', new Intl.NumberFormat('en-US', options4).format(num));
// console.log('UK', new Intl.NumberFormat('en-UK', options5).format(num));
// console.log('germany', new Intl.NumberFormat('de-DE', options5).format(num));
// console.log('syria', new Intl.NumberFormat('ar-SY').format(num));
// console.log(
//   'Browser',
//   new Intl.NumberFormat(navigator.language, options4).format(num)
// );

setTimeout(() => console.log(`Here is your pizza`), 3000);
console.log(`Waiting...`);
//
// setInterval(function () {
//   let now = new Date();
//   console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
// }, 30_000);
