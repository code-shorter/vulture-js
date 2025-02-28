'use strict';

/**
 * Predefined fields with their priority levels.
 * Fields with priority 1 are considered high priority.
 */
const preFields = [
    { field: 'about', priority: 1 },
    { field: 'aboutMe', priority: 1 },
    { field: 'address', priority: 1 },
    { field: 'bio', priority: 1 },
    { field: 'city', priority: 1 },
    { field: 'confirmPassword', priority: 1 },
    { field: 'country', priority: 1 },
    { field: 'coverPic', priority: 0 },
    { field: 'dateOfBirth', priority: 1 },
    { field: 'dob', priority: 1 },
    { field: 'description', priority: 1 },
    { field: 'education', priority: 1 },
    { field: 'email', priority: 1 },
    { field: 'firstName', priority: 1 },
    { field: 'fname', priority: 1 },
    { field: 'fullName', priority: 1 },
    { field: 'gender', priority: 1 },
    { field: 'initials', priority: 0 },
    { field: 'interests', priority: 0 },
    { field: 'isBlocked', priority: 0 },
    { field: 'isDeleted', priority: 0 },
    { field: 'isEmailVerified', priority: 0 },
    { field: 'isVerified', priority: 0 },
    { field: 'lastLoginAt', priority: 0 },
    { field: 'lastName', priority: 1 },
    { field: 'name', priority: 1 },
    { field: 'location', priority: 1 },
    { field: 'middleName', priority: 0 },
    { field: 'mobile', priority: 1 },
    { field: 'nameSurname', priority: 0 },
    { field: 'nickName', priority: 0 },
    { field: 'occupation', priority: 1 },
    { field: 'other', priority: 0 },
    { field: 'password', priority: 1 },
    { field: 'phone', priority: 1 },
    { field: 'postalCode', priority: 1 },
    { field: 'profilePic', priority: 0 },
    { field: 'profileStatus', priority: 0 },
    { field: 'profileType', priority: 0 },
    { field: 'profileVisibility', priority: 0 },
    { field: 'resume', priority: 0 },
    { field: 'sex', priority: 1 },
    { field: 'skills', priority: 1 },
    { field: 'state', priority: 1 },
    { field: 'timezone', priority: 0 },
    { field: 'title', priority: 0 },
    { field: 'updatedAt', priority: 0 },
    { field: 'username', priority: 0 },
    { field: 'website', priority: 0 },
    { field: 'workExperience', priority: 1 }
];

/**
 * Checks if the provided value is a non-empty array.
 * 
 * @param {Array} array - The array to check.
 * @returns {boolean} True if the array is non-empty, false otherwise.
 */
const approvedArray = (array) => {
    return Array.isArray(array) && array.length > 0;
};

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

// Import necessary modules

/**
 * Prioritizes fields based on predefined priority fields.
 * 
 * @param {Array} fields - The array of fields to prioritize.
 * @param {Object} options - Options for prioritization.
 * @param {boolean} options.strict - Whether to strictly prioritize by type.
 * @param {Array} options.augment - Additional fields to prioritize.
 * @returns {Object} An object containing prioritized and non-prioritized fields.
 */
function prioritizer(fields = [], { strict = false, augment }) {
    // let start = performance.now(); // performance ~ 3.3274999999999864 milliseconds
    // Create regex patterns for pre-priority fields
    const pre_priority_fields = preFields.filter(preField => preField.priority === 1).map(p => new RegExp(p.field, 'i'));

    // Add augmented fields to priority if provided
    approvedArray(augment) && pre_priority_fields.push(...augment.map(p => new RegExp(p, 'i')));
    
    // Filter fields into priority and non-priority based on name
    const priority = fields.filter(f => pre_priority_fields.some(regex => regex.test(f.name)) && !/other/i.test(f.name));
    let non_priority = fields.filter(f => ![...pre_priority_fields].some(regex => regex.test(f.name)) || /other/i.test(f.name));

    // If strict mode is enabled, further filter non-priority fields by type
    const stricter = strict && non_priority.filter(f => pre_priority_fields.some(regex => regex.test(f.type)));
    approvedArray(stricter) && priority.push(...stricter) && (non_priority = non_priority.filter(f => !stricter.includes(f)));
    // console.log(`Prioritizer completed in ${performance.now() - start} milliseconds`);

    // Return the prioritized and non-prioritized fields
    return { priority, non_priority };
}
 // (ff, { strict: true, augment: [''] }) => No errors

// Import necessary utility functions and constants

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
                message: `${field.name[0].toLocaleUpperCase() + field.name.slice(1)} is required`
            });
            break;
        }        if (field.type === "email") {
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
 // (validator(priority, true)) => No errors

const excludedFields = ['submit', 'reset']; // Add more excluded fields as needed.

/**
 * Scans a form and extracts fields and error boxes.
 * 
 * @param {HTMLFormElement} form - The form element to scan.
 * @returns {Object} An object containing scanned fields and error boxes.
 * @throws {Error} If no fields are found in the form.
 */
function scanner(form) {
    const fields = [];
    const errorBoxes = [];
    // Convert form.children to an array before using forEach
    Array.from(form.children).forEach(e => {
        // Check if the element is an input and not excluded
        if ((e.tagName === 'INPUT' || e.tagName === 'TEXTAREA') && (e.name || e.type || e.value) && !excludedFields.includes(e.type)) {
            fields.push({
                name: e.name,
                type: e.type,
                value: e.value
            });
        }
        // Check if the element is an error box
        if (e.nodeType === 1) {
            if (e.classList.contains("error")) {
                errorBoxes.push({ id: e.id, class: "error" });
            }
        }
    });
    // Return scanned fields and error boxes if valid, otherwise throw an error
    if (approvedArray(fields)) return { scannedFields: fields, errorBoxes };
    else throw new Error('No fields found in the form || Please make a valid form.');
}

/**
 * Renders error messages in the specified error boxes.
 * 
 * @param {Array} errorBoxes - The array of error boxes to render errors in.
 * @param {Array} errors - The array of errors to render.
 */
function renderError(errorBoxes, errors = []) {
    if (approvedArray(errors)) console.error("Invalid data returned by talon.");
    // Render error to the user
    for (const errorBox of errorBoxes) {
        const box = document.getElementById(errorBox.id);
        !errorBox.class && box.classList.add("error");
        const error = approvedArray(errors) && errors.find(e => e.field === box.id);
        box.innerHTML = error ? error.message : '';
    }
}

// Import necessary modules and functions

// Variable to store the form element
let form;
let forms = [];
let multiConnect = false;

/**
 * Vulture.js main object
 * Provides methods to connect to a form and validate its fields
 */
const vulture = {
    /**
     * Connects to a form by its ID or class name
     * 
     * @param {string} formId - The ID or class name of the form to connect to.
     */
    connect: (formId) => {
        form = document.getElementById(formId) || document.querySelector(`.${formId}`);
        let elem = Array.from(form.children).filter(e => (e.tagName === 'INPUT' || e.tagName === 'TEXTAREA') && !['submit', 'reset'].includes(e.type)).length;
        if (form)
            console.log(`Connected to ${form.id || form.className}(${elem}) \nVisit https://vulturejs.github.io`);
        else {
            console.error(`Form ID error: MultiConnect reduired Form ID,\nForm index: ${forms.length + 1} has no ID or Form IDs are more than forms.`);
        }    },

    /**
     * Connects to a form by its ID or class name
     * 
     * @param {Array} formIds - The IDs or classes of the form to connect to.
     */
    multiConnect: (formIds) => {
        let error = false;
        for (const formId of formIds) {
            const form = document.getElementById(formId);
            if (form) forms.push(form);
            else {
                console.error(`Form ID error: MultiConnect reduired Form ID,\nForm index: ${forms.length + 1} has no ID or Form IDs are more than forms.`);
                error = true;
            }            error = false;
            if (forms.length === formIds.length) break;
        }
        multiConnect = true;
        if (approvedArray(formIds) && !error) console.log(`Connected to ${forms.map(form => {
            return `${form.id}(${Array.from(form.children).filter(e => (e.tagName === 'INPUT' || e.tagName === 'TEXTAREA') && !['submit', 'reset'].includes(e.type)).length})`;
        }).join(', ')}\nVisit https://vulturejs.github.io`);
    },

    /**
     * Validates the form fields and returns the results
     * 
     * @param {Object} options - Options for validation.
     * @param {boolean} options.strict - Whether to strictly validate fields.
     * @param {Array} options.augment - Additional fields to prioritize.
     * @param {boolean} options.render_error - Whether to render error messages.
     * @returns {Object} An object containing validated fields and errors.
     */
    talon: ({ strict, augment, render_error = true }) => {
        if (!strict) strict = false;
        if (!augment) augment = null;
        // if (multiConnect) form = form_data;

        // Scan the form to extract fields and error boxes
        const { scannedFields, errorBoxes } = scanner(form);

        // Prioritize the scanned fields
        const { priority, non_priority } = prioritizer(scannedFields, { strict, augment });

        // Validate the prioritized fields
        const { fields, errors } = validator(priority, strict);

        // Render error messages if enabled
        if (render_error) renderError(errorBoxes, errors);

        // Return errors if any, otherwise return the validated fields
        if (approvedArray(errors) || !approvedArray(fields)) return { errors: errors };

        const data = [...new Set([...fields, ...non_priority])];
        return { fields: data };
    },

    /**
     * Validates the form fields and returns the results
     * 
     * @param {Object} options - Options for validation.
     * @param {boolean} options.strict - Whether to strictly validate fields.
     * @param {Array} options.augment - Additional fields to prioritize.
     * @param {boolean} options.render_error - Whether to render error messages.
     * @returns {Object} An object containing validated fields and errors.
     */
    talonAll: (index, { strict, augment, render_error = true }) => {
        if (!strict) strict = false;
        if (!augment) augment = null;
        if (multiConnect) form = forms[index];

        // Scan the form to extract fields and error boxes
        const { scannedFields, errorBoxes } = scanner(form);

        // Prioritize the scanned fields
        const { priority, non_priority } = prioritizer(scannedFields, { strict, augment });

        // Validate the prioritized fields
        const { fields, errors } = validator(priority, strict);

        // Render error messages if enabled
        if (render_error) renderError(errorBoxes, errors);

        // Return errors if any, otherwise return the validated fields
        if (approvedArray(errors) || !approvedArray(fields)) return { errors: errors };
        const formId = form.id;

        const data = [...new Set([...fields, ...non_priority])];
        return { formId: formId, fields: data };
    },

    /**
     * Formats the validated data into a JavaScript object
     * 
     * @param {Array} data - The validated fields.
     * @returns {Object} A JavaScript object containing the validated data.
     **/
    formatter: (data) => {
        let formdata = {};
        data.forEach((e) => {
            formdata[e.name] = e.value;
        });
        return formdata;
    }
};

module.exports = vulture;
