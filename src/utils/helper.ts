import moment from 'moment';
import web3 from 'web3';
import BigNumber from 'bignumber.js';

const SECONDS_IN_A_DAY = 60 * 60 * 24;
/**
 * ==============================================================================
 * ====================================STRING====================================
 * ==============================================================================
 */

/**
 * Capitalizes the first letter of a string.
 * Example: capitalize('fooBar');       // 'FooBar'
 *          capitalize('fooBar', true); // 'Foobar'
 */
export const capitalize = ([first, ...rest]: string, lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

export function compareAddresses(add1: string, add2: string) {
  return add1.length == add2.length && add1.toLowerCase() == add2.toLowerCase();
}

export function getCurrentTimeInt(): number {
  return +(moment().valueOf() / 1000).toFixed();
}

/**
 * Capitalizes the first letter of a string.
 * Example: capitalize('fooBar');       // 'FooBar'
 *          capitalize('fooBar', true); // 'Foobar'
 */
export const isNumberPhoneVN = (phone: string) => {
  if (!phone) return false;
  if (phone.length != 10) return false;
  const regex = /((03|04|05|07|08|09)+([0-9]{8})\b)/g;
  return regex.test(phone);
};

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
// function difference(object, base) {
// 	function changes(object, base) {
// 		return _.transform(object, function(result, value, key) {
// 			if (!_.isEqual(value, base[key])) {
// 				result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
// 			}
// 		});
// 	}
// 	return changes(object, base);
// }

/**
 * Capitalizes the first letter of every word in a string.
 * Example: capitalizeEveryWord('hello world!'); // 'Hello World!'
 */
export const capitalizeEveryWord = (str: string) =>
  str.replace(/\b[a-z]/g, (char) => char.toUpperCase());

/**
 * Converts a string to camelcase.
 * Example: toCamelCase('some_database_field_name');                              // 'someDatabaseFieldName'
 *          toCamelCase('Some label that needs to be camelized');                 // 'someLabelThatNeedsToBeCamelized'
 *          toCamelCase('some-javascript-property');                              // 'someJavascriptProperty'
 *          toCamelCase('some-mixed_string with spaces_underscores-and-hyphens'); // 'someMixedStringWithSpacesUnderscoresAndHyphens
 */
export const toCamelCase = (str: string) => {
  let s =
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
      )
      .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

/**
 * Replaces all but the last num of characters with the specified mask character.
 * Example: mask(1234567890);           // '******7890'
 *          mask(1234567890, 3);        // '*******890'
 *          mask(1234567890, -4, '$');  // '$$$$567890'
 */
export const mask = (cc: string, num = 4, mask = '*') =>
  `${cc}`.slice(-num).padStart(`${cc}`.length, mask);

/**
 * Format number to VND.
 * Example: formatVND(10000);           // '10.000'
 */
export function formatVND(num: number) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

/**
 * Format number to VND.
 * Example: randomString(6);           // 'bmakcn'
 * Example: randomString(7);           // 'kjskcnd'
 */
export const randomString = (length: number) =>
  Math.random().toString(36).substring(0, length);

/**
 * ==============================================================================
 * ====================================OBJECT====================================
 * ==============================================================================
 */

/**
 * Check if object if empty
 * Example: isEmptyObject({})      // true
 *          isEmptyObject({a: 1})  // false
 */
export function isEmptyObject(object: Object): boolean {
  if (typeof object !== 'object') return false;
  if (!object) return false;
  return !!Object.keys(object).length;
}

export function sortObject(o: any) {
  const sorted = {};
  let a = [];

  for (let key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (let key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }

  return sorted;
}

export function paginate(array: any[], limit: number = 0, page: number = 1) {
  if (!limit) return array;
  return array.slice((page - 1) * limit, page * limit);
}

/**
 * Picks the key-value pairs corresponding to the given keys from an object.
 * Example: pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }
 */
const pick = (obj: any, arr: string[]) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

/**
 * ==============================================================================
 * ====================================TIME====================================
 * ==============================================================================
 */
export function getCurrentDateDDMMYY(): string {
  return moment().format('DDMMYY');
}

export function getCurrentDateDD_MM_YYYY(format: string = '/'): string {
  return moment().format(`DD${format}MM${format}YYYY`);
}

export function getCurrentInSeconds(): number {
  return +(moment().valueOf() / 1000).toFixed();
}

export function getMonthInterval(date: Date) {
  let start = moment(date).startOf('months');
  let end = start.clone().add(1, 'months');
  return {
    start: start.valueOf() / 1000,
    end: end.valueOf() / 1000,
  };
}

export function convertFullDateToInt(date: Date): {
  start: number;
  end: number;
} {
  let time = +(date.getTime() / 1000).toFixed();
  let start = Math.round(time / SECONDS_IN_A_DAY) * SECONDS_IN_A_DAY;
  return {
    start,
    end: start + SECONDS_IN_A_DAY,
  };
}

export function convertIntToDDMMYY(int: number): string {
  return moment(int * 1000).format('DD/MM/YYYY');
}

export function convertIntToMMYY(int: number): string {
  return moment(int * 1000).format('MM/YYYY');
}

/**
 * Convert timestamp to Thứ, ngày tháng năm
 * @param int timestamp
 */
export function convertIntToddddDDMMYY(int: number): string {
  return moment(int * 1000)
    .locale('vi')
    .format('dddd, DD/MM/YYYY');
}

export function convertDateToInt(date: Date): number {
  let time = +(date.getTime() / 1000).toFixed();
  return (time * SECONDS_IN_A_DAY) / SECONDS_IN_A_DAY;
}

export function getMomentByDate(date: Date = new Date()): moment.Moment {
  return moment(date);
}

export function getMomentToday(): moment.Moment {
  return moment().startOf('day');
}

export function getIntervalOfTimestamp(second: number) {
  let start = moment(second * 1000).startOf('day');
  let end = start.clone().add(1, 'days');
  return {
    start: start.valueOf() / 1000,
    end: end.valueOf() / 1000,
  };
}

export function getTodayInterval(): { start: number; end: number } {
  let start = moment().startOf('day');
  let end = start.clone().add(1, 'days');
  return {
    start: start.valueOf() / 1000,
    end: end.valueOf() / 1000,
  };
}

export function getYesterdayInterval(): { start: number; end: number } {
  let start = moment().subtract(1, 'days').startOf('day');
  let end = start.clone().add(1, 'days');
  return {
    start: start.valueOf() / 1000,
    end: end.valueOf() / 1000,
  };
}

export function getThisHourInterval(): { start: number; end: number } {
  let start = moment().startOf('hour');
  let end = start.clone().add(1, 'hour');
  return {
    start: start.valueOf() / 1000,
    end: end.valueOf() / 1000,
  };
}

export function getLastInterval(): { start: number; end: number } {
  let start = moment().startOf('day');
  let end = start.clone().add(1, 'days');
  return {
    start: start.valueOf() / 1000,
    end: end.valueOf() / 1000,
  };
}

export function getThisWeekInterval(): { start: number; end: number } {
  let start = moment().startOf('isoWeeks');
  let end = start.clone().add(1, 'weeks');
  return {
    start: start.valueOf() / 1000,
    end: end.valueOf() / 1000,
  };
}

export function getDateInterval(date: any): { start: number; end: number } {
  let start = moment(date).startOf('day');
  let end = start.clone().add(1, 'days');
  return {
    start: start.valueOf() / 1000,
    end: end.valueOf() / 1000,
  };
}

export function getDateIntInterval(date: any): { start: number; end: number } {
  let start = moment(date * 1000).startOf('day');
  let end = start.clone().add(1, 'days');
  return {
    start: start.valueOf() / 1000,
    end: end.valueOf() / 1000,
  };
}

export function getThisMonthInterval(): { start: number; end: number } {
  let start = moment().startOf('months');
  let end = start.clone().add(1, 'months');
  return {
    start: start.valueOf() / 1000,
    end: end.valueOf() / 1000,
  };
}

export function getMomentBySecond(second: number): moment.Moment {
  return moment(second * 1000);
}

export function getMomentByMiliSecond(miliSecond: number): moment.Moment {
  return moment(miliSecond);
}

export function getWeekOfMonth(date: moment.Moment) {
  return date.isoWeek() - moment(date).startOf('month').isoWeek() + 1;
}

export function getFromToDate(from: Date = null, to: Date = null) {
  let { start, end } = getThisMonthInterval();
  if (from && to) {
    const dateFrom = convertFullDateToInt(from);
    start = dateFrom.start;
    const dateTo = convertFullDateToInt(to);
    end = dateTo.end;
  }
  return { start, end };
}

/**
 * ==============================================================================
 * ====================================NUMBER====================================
 * ==============================================================================
 */

/**
 * Getting a random integer between two values
 * Example: getRandomIntInclusive(0, 10);                              // 9
 */
export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export function roundToThousand(value: number) {
  return (value / 1000) * 1000;
}

/**
 * ==============================================================================
 * ====================================UTILITY====================================
 * ==============================================================================
 */

/**
 * Use to add prefix of table in db
 * @param table table name in db
 */

/**
 * Pads the current string with 0
 * Example: leftPad(10, 6);                              // 000010
 */
export function leftPad(number: number, maxLength: number) {
  return `${number}`.padStart(maxLength, '0');
}

/**
 * Logging follow format, easy to see
 * Example: logSection('production mode');
 */
export function logSection(text: string) {
  text = text.toUpperCase();
  console.log(
    '..........................................................................................',
  );
  console.log(
    `......................................${text}......................................`,
  );
  console.log(
    '..........................................................................................',
  );
}

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function chunk(array: any[], size: number) {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
}

export function isZeroAddress(address: string) {
  return (
    address === '0x0000000000000000000000000000000000000000' ||
    address === '0x0' ||
    address === '0x' ||
    address ===
      '0x0000000000000000000000000000000000000000000000000000000000000000'
  );
}

export function abiDecode(type: string, value: any): any {
  return new web3().eth.abi.decodeParameter(type, value);
}

export function abiDecodeMulti(types: string[], value: any): any {
  return new web3().eth.abi.decodeParameters(types, value);
}

export function getCurrent() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

export function roundLastDigit(value: number, digit: number = 3) {
  return value - (value % 10 ** digit);
}

export function toBigNumber(number: any) {
  return new BigNumber(number);
}

export function convertToEther(number: string, decimal = 18) {
  return (+new BigNumber(+number)
    .dividedBy(new BigNumber(10).pow(decimal))
    .toString()).toFixed(5);
}

export const sortedArray = (data, sortField, page, sortDirection, limit) => {
  return data
    ? data
        .sort((a, b) => {
          if (a && b) {
            return a[sortField] > b[sortField]
              ? (sortDirection === 1 ? 1 : -1) * 1
              : (sortDirection === 1 ? 1 : -1) * -1;
          }
          return -1;
        })
        .slice((page - 1) * limit, (page - 1) * limit + limit)
    : [];
};
