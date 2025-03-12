// Import necessary utility functions and constants
import { approvedArray, commonEmailProviders, commonPasswords, tempEmailDomains, validDomainExtensions } from "./utils.js";

// Example fields array for testing
// const priority = [
//     { name: 'email', type: 'email', value: 'anmol.dev@gmail.com' },
//     { name: 'password', type: 'password', value: 'WQ4%1211#' },
//     { name: 'confirmPass', type: 'password', value: 'WQ4%1211#' },
//     { name: 'dob', type: 'date', value: '1996-08-10' },
//     { name: 'user_gen', type: 'radio', value: 'male' },
//     { name: 'user_comfirm', type: 'radio', value: 'yes' },
// ];

/**
 * Validates an email address.
 * 
 * @param {string} email - The email address to validate.
 * @param {boolean} strict - Whether to strictly validate the email.
 * @returns {Object} An object containing the validation result and reason.
 */
function isValidEmail(email, strict = false) {
    if (typeof email !== "string" || email.length < 6 || email.length > 255) {
        return { valid: false, reason: "Invalid email length" };
    }

    // Optimized regex for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.[a-zA-Z]{2,})$/;
    const match = email.match(emailRegex);
    if (!match) return { valid: false, reason: "Invalid email format" };

    const domain = match[1].toLowerCase(); // Extract full domain (e.g., "tempmail.com")
    const extension = domain.split(".").pop(); // Extract last part after dot (e.g., "com")

    if (tempEmailDomains.has(domain)) {
        return { valid: false, reason: "Temporary email addresses are not allowed" };
    }

    if (strict && !commonEmailProviders.has(domain)) {
        return { valid: false, reason: "Temporary or custom email addresses are not allowed" };
    }

    if (!validDomainExtensions.has(extension)) {
        return { valid: false, reason: "Invalid domain extension" };
    }

    return { valid: true, reason: "Valid email ✅" };
}

// Test cases for email validation
// console.log(isValidEmail("test@gmail.com"));       // ✅ Valid email
// console.log(isValidEmail("user@tempmail.com"));    // ❌ Temporary email (Now works!)
// console.log(isValidEmail("admin@domain.co.uk"));   // ✅ Valid email (Handles subdomains)
// console.log(isValidEmail("short@co"));             // ❌ Invalid domain format
// console.log(isValidEmail("hello@@example.com"));   // ❌ Invalid email format
// console.log(isValidEmail("valid@mailinator.com")); // ❌ Temporary email (Now detected!)
// console.log(isValidEmail("a@b.co"));               // ✅ Valid email (short but valid)

/**
 * Checks the strength of a password.
 * 
 * @param {string} password - The password to check.
 * @returns {Object} An object containing the strength and message.
 */
function checkPasswordStrength(password) {
    let score = 0;

    // Check if password is in the common passwords list
    if (commonPasswords.includes(password.toLowerCase())) {
        return { strength: "Very Weak ❌", message: "This password is too common!" };
    }

    // Length Check
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Character Diversity
    if (/[a-z]/.test(password)) score++; // Lowercase
    if (/[A-Z]/.test(password)) score++; // Uppercase
    if (/[0-9]/.test(password)) score++; // Numbers
    if (/[^a-zA-Z0-9]/.test(password)) score++; // Special Characters

    // Strength Levels
    if (score <= 2) return { strength: "Weak ❌", message: "Try adding numbers & symbols." };
    if (score === 3) return { strength: "Medium ⚠️", message: "Make it longer & mix characters." };
    if (score === 4) return { strength: "Strong ✅", message: "Good, but longer is better!" };
    return { strength: "Very Strong 💪", message: "Great password! 🔥" };
}

// Test cases for password strength
// console.log(checkPasswordStrength("P@ssword123")); // Strong
// console.log(checkPasswordStrength("hello123")); // Weak
// console.log(checkPasswordStrength("Qwerty123!@#")); // Very Strong
// console.log(checkPasswordStrength("123456")); // Very Weak


function validatePhoneNumber(phoneNumber, allow = []) {
    // Always allow digits.
    const digits = "0-9";

    // Map allowed separator options to their symbols.
    const allowedMap = {
        "hyphens": "-",
        "spaces": " ",
        "dots": "."
    };

    // Allow a leading plus if "+" or "all" is specified.
    const plusAllowed = allow.includes("+") || allow.includes("all");
    const plusPattern = plusAllowed ? "\\+?" : "";

    // Build the string of allowed separators.
    let separators = "";
    if (allow.includes("all")) {
        separators = Object.values(allowedMap).join("");
    } else {
        separators = allow
            .filter(opt => allowedMap[opt])
            .map(opt => allowedMap[opt])
            .join("");
    }

    // Allowed set: always digits plus any allowed separators.
    const allowedSet = digits + separators;

    // Build regex pattern:
    // 1. Lookahead for at least 10 digits.
    // 2. Then, an optional leading plus (if allowed) followed by one or more allowed characters.
    const pattern = `^(?=(?:.*\\d){10,})${plusPattern}[${allowedSet}]+$`;
    const regex = new RegExp(pattern);
    const valid = regex.test(phoneNumber);

    if (valid) {
        return { valid: true, reason: "Valid" };
    } else {
        // Count digits.
        const digitCount = (phoneNumber.match(/\d/g) || []).length;
        if (digitCount < 10) {
            return { valid: false, reason: "At least 10 digits required" };
        } else {
            // Build a short list of allowed symbols.
            let allowedSymbols = "0-9";
            if (plusAllowed) allowedSymbols += ", +";
            if (allow.includes("hyphens") || allow.includes("all")) allowedSymbols += ", -";
            if (allow.includes("spaces") || allow.includes("all")) allowedSymbols += ", space";
            if (allow.includes("dots") || allow.includes("all")) allowedSymbols += ", .";
            return { valid: false, reason: "Invalid format. Allowed: " + allowedSymbols };
        }
    }
}


/**
 * Validates an array of fields.
 * 
 * @param {Array} fields - The array of fields to validate.
 * @param {boolean} strict - Whether to strictly validate the fields.
 * @param {Array} minmax - The minimum and maximum length of the fields value.
 * @param {Array} phoneRules - The phone rules to validate
 * @param {Array} customErrors - The custom errors to add to the validation
 * @returns {Object} An array of errors or the original fields if no errors.
 */
function validator(fields, strict, minmax, phoneRules, customErrors = []) {
    // let start = performance.now(); // performance ~ 0.7479000000000013 milliseconds
    let errors = [];

    for (const field of fields) { // field 
        const cusErrObj = customErrors.find(err => err.field === field.name) || null;

        if (field.value === "" ||
            field.value === null ||
            field.value === undefined) {
            if (cusErrObj) {
                const required = cusErrObj.required ? cusErrObj.required : null;
                errors.push({
                    field: field.name,
                    message: required || `${field.name} is required`
                });
            } else errors.push({
                field: field.name,
                message: `${field.name} is required`
            });
            break;
        };

        if (field.type === "checkbox") {
            if (field.value === false) {
                if (cusErrObj) {
                    const required = cusErrObj.required ? cusErrObj.required : null;
                    errors.push({
                        field: field.name,
                        message: required || `${field.name} is required`
                    });
                } else errors.push({
                    field: field.name,
                    message: `${field.name} is required`
                });
                break;
            }
        };

        if (/phone/.test(field.name) || /mobile/.test(field.name)) {
            const { valid, reason } = validatePhoneNumber(field.value, phoneRules);
            if (!valid) {
                if (cusErrObj) {
                    const required = cusErrObj.not_valid ? cusErrObj.not_valid : null;
                    errors.push({
                        field: field.name,
                        message: required || reason
                    });
                } else errors.push({
                    field: field.name,
                    message: reason
                });
                break;
            }
        }

        if (/name/.test(field.name)) {
            if (field.value.toLocaleLowerCase() === "null" || field.value.toLocaleLowerCase() === "undefined" || field.value.toLocaleLowerCase() === "none") {
                errors.push({ field: field.name, message: `This name is not allowed.` });
                break;
            }
        }

        if (field.type === "email") {
            const { valid, reason } = isValidEmail(field.value, strict);
            if (!valid) {
                if (cusErrObj) {
                    const not_valid = cusErrObj.not_valid ? cusErrObj.not_valid : null;
                    errors.push({
                        field: field.name,
                        message: not_valid || reason
                    });
                } else errors.push({
                    field: field.name,
                    message: reason
                });
            }
        }
        if (strict && field.type === "password") {
            const { strength, message } = checkPasswordStrength(field.value);
            if (strength.includes("Weak")) {
                if (cusErrObj) {
                    const weak = cusErrObj.weak ? cusErrObj.weak : null;
                    errors.push({
                        field: field.name,
                        message: weak || message
                    });
                } else errors.push({
                    field: field.name,
                    message: message
                });
            }
        }
        if (strict && /name/i.test(field.name)) {
            const { min, max } = { min: Array.from(minmax)[0], max: Array.from(minmax)[1] };
            if (field.value.length < min) {
                if (cusErrObj) {
                    const min = cusErrObj.min ? cusErrObj.min : null;
                    errors.push({
                        field: field.name,
                        message: min || `${field.name} must be at least ${min} characters`
                    });
                } else errors.push({
                    field: field.name,
                    message: `${field.name} must be at least ${min} characters`
                });
            }
            if (field.value.length > max) {
                if (cusErrObj) {
                    const max = cusErrObj.max ? cusErrObj.max : null;
                    errors.push({
                        field: field.name,
                        message: max || `${field.name} must not be greater than ${max} characters`
                    });
                } else errors.push({
                    field: field.name,
                    message: `${field.name} must not be greater than ${max} characters`
                });
            }
        }
    }
    if (approvedArray(fields)) {
        const passwords = fields.filter(p => p.type.toLocaleLowerCase() === 'password');

        if (passwords.length === 2 &&
            ((/password/i.test(passwords[0].name) && /confirm/i.test(passwords[1].name)) ||
                (/password/i.test(passwords[1].name) && /confirm/i.test(passwords[0].name)))) {
            const cusErrObj = customErrors.find(err => err.field === passwords[1].name) || null;
            if (passwords[0].value !== passwords[1].value) {
                if (cusErrObj) {
                    const mis_match = cusErrObj.mis_match ? cusErrObj.mis_match : null;
                    errors.push({
                        field: passwords[1].name,
                        message: mis_match || 'Passwords do not match'
                    });
                } else errors.push({
                    field: passwords[1].name,
                    message: 'Passwords do not match'
                });
            }
        }
    }
    // console.log(`Validation completed in ${performance.now() - start} milliseconds`);
    return { fields, errors };
}

// Export the validator function
export default validator;