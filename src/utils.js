/**
 * Checks if the provided value is a non-empty array.
 * 
 * @param {Array} array - The array to check.
 * @returns {boolean} True if the array is non-empty, false otherwise.
 */
const approvedArray = (array) => {
    return Array.isArray(array) && array.length > 0;
}

/**
 * Checks if the provided value is a non-empty string.
 * 
 * @param {string} string - The string to check.
 * @returns {boolean} True if the string is non-empty, false otherwise.
 */
const approvedString = (string) => {
    return typeof string === 'string' && string.length > 0;
}

/**
 * Checks if the provided value is a valid number.
 * 
 * @param {number} number - The number to check.
 * @returns {boolean} True if the number is valid, false otherwise.
 */
const approvedNumber = (number) => {
    return typeof number === 'number' && !isNaN(number);
}

/**
 * Checks if the provided value is a non-null object.
 * 
 * @param {Object} object - The object to check.
 * @returns {boolean} True if the object is non-null, false otherwise.
 */
const approvedObject = (object) => {
    return typeof object === 'object' && object !== null;
}

/**
 * Checks if the provided value is a function.
 * 
 * @param {Function} functionToCheck - The function to check.
 * @returns {boolean} True if the value is a function, false otherwise.
 */
const approvedFunction = (functionToCheck) => {
    return typeof functionToCheck === 'function';
}

/**
 * Checks if the provided value is either a non-empty array or a non-null object.
 * 
 * @param {Array|Object} value - The value to check.
 * @returns {boolean} True if the value is a non-empty array or a non-null object, false otherwise.
 */
const approvedArrayOrObject = (value) => {
    return approvedArray(value) || approvedObject(value);
}

// Set of valid domain extensions
const validDomainExtensions = new Set([
    "com", "net", "org", "edu", "gov", "mil", "co", "io", "tech", "dev",
    "info", "biz", "me", "us", "uk", "ca", "au", "in", "eu", "de", "fr",
    "xyz", "site", "online", "store", "blog", "app"
]);

// Set of temporary email domains
const tempEmailDomains = new Set([
    "10minutemail.com", "temp-mail.org", "guerrillamail.com", "mailinator.com",
    "yopmail.com", "fakemailgenerator.com", "sharklasers.com", "dispostable.com",
    "throwawaymail.com", "getnada.com", "trashmail.com", "mintemail.com",
    "spambog.com", "maildrop.cc", "spamex.com", "mytrashmail.com", "boun.cr",
    "tmail.io", "mailpoof.com", "spamavert.com", "harakirimail.com",
    "tempmail.com", "tempmail.net", "emailtemporario.com.br"
]);

// Set of common email providers
const commonEmailProviders = new Set([
    "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "aol.com",
    "icloud.com", "protonmail.com", "yandex.com", "mail.com", "zoho.com",
    "gmx.com", "fastmail.com", "tutanota.com", "live.com", "msn.com",
    "me.com", "qq.com", "naver.com", "rediffmail.com", "rocketmail.com",
    "inbox.com", "btinternet.com", "shaw.ca", "telus.net", "cox.net",
    "sbcglobal.net", "verizon.net", "att.net", "comcast.net", "optonline.net",
    "bigpond.com", "bluewin.ch", "earthlink.net", "mac.com", "web.de",
    "126.com", "163.com", "yeah.net", "lycos.com"
]);

// List of common passwords
const commonPasswords = [
    "123456", "password", "123456789", "12345678", "12345", "1234567",
    "qwerty", "abc123", "password1", "111111", "123123", "admin",
    "welcome", "letmein", "monkey", "football", "iloveyou", "sunshine",
    "1234", "princess", "dragon", "baseball", "superman", "trustno1",
    "shadow", "buster", "qwerty123", "batman", "whatever", "password123",
    "qazwsx", "1q2w3e4r", "123qwe", "123abc", "654321", "7777777"
];

// Export utility functions and constants
export { approvedArray, approvedObject, approvedString, approvedNumber, approvedFunction, approvedArrayOrObject, validDomainExtensions, tempEmailDomains, commonPasswords, commonEmailProviders };