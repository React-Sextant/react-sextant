/**
 * Check whether a given value is an iterable or not.
 * @param {any} x The value to check.
 * @returns {boolean} `true` if the value is an iterable.
 * **/
export function isIterable(x) {
    return typeof x[Symbol.iterator] === "function" //eslint-disable-line no-restricted-syntax
}

/**
 * Check whether a given value is an object or not.
 * @param {any} x The value to check.
 * @returns {boolean} `true` if the value is an object.
 */
export function isObject(x) {
    return x !== null && typeof x === "object" //eslint-disable-line no-restricted-syntax
}
