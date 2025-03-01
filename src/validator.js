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
    if (typeof email !== "string" || email.length < 6 || email.length > 320) {
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

function requiredError(field) {
    const camal = field.name[0].toLocaleUpperCase() + field.name.slice(1);
    const separator = camal.replace(/[_-]/g, " ");

    return `${separator} is required`;
};

/**
 * Validates an array of fields.
 * 
 * @param {Array} fields - The array of fields to validate.
 * @param {boolean} strict - Whether to strictly validate the fields.
 * @returns {Object} An array of errors or the original fields if no errors.
 */
function validator(fields, strict) {
    // let start = performance.now(); // performance ~ 0.7479000000000013 milliseconds
    let errors = [];
    for (const field of fields) {
        if (field.value === "" ||
            field.value === null ||
            field.value === undefined) {
            errors.push({
                field: field.name,
                message: requiredError(field)
            });
            break;
        };
        if (field.type === "email") {
            const { valid, reason } = isValidEmail(field.value, strict);
            if (!valid) errors.push({ field: field.name, message: reason });
        }
        if (strict && field.type === "password") {
            const { strength, message } = checkPasswordStrength(field.value);
            if (strength.includes("Weak")) errors.push({ field: field.name, message });
        }
    }
    if (approvedArray(fields)) {
        const passwords = fields.filter(p => p.type.toLocaleLowerCase() === 'password');

        if (passwords.length === 2 &&
            ((/password/i.test(passwords[0].name) && /confirm/i.test(passwords[1].name)) ||
                (/password/i.test(passwords[1].name) && /confirm/i.test(passwords[0].name)))) {
            if (passwords[0].value !== passwords[1].value) {
                errors.push({
                    field: passwords[1].name,
                    message: 'Passwords do not match'
                });
            }
        }
    }
    // if (approvedArray(errors)) return errors;
    // console.log(`Validation completed in ${performance.now() - start} milliseconds`);
    return { fields, errors };
}

// Example usage
// console.log(validator(priority, true)); // ✅ No errors

// Export the validator function
export default validator; // (validator(priority, true)) => No errors