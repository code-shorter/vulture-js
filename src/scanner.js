import { approvedArray } from './utils.js';

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

    // Select all input, select, and textarea elements with a name attribute within the form
    const inputs = form.querySelectorAll("input[name], select[name], textarea[name]");
    for (const input of inputs) {
        // Skip excluded input types
        if (excludedFields.includes(input.type)) continue;

        // Handle radio inputs separately to only include checked radios
        if (input.type === "radio") {
            const radioGroup = form.querySelectorAll(`input[name="${input.name}"][type="radio"]`);
            const checkedRadio = Array.from(radioGroup).find(radio => radio.checked);
            if (checkedRadio) {
                // Check if the radio button with the same name, type, and value already exists in the fields array
                if (!fields.some(field => field.name === input.name && field.type === input.type && field.value === checkedRadio.value)) {
                    fields.push({
                        name: input.name,
                        type: input.type,
                        value: checkedRadio.value
                    });
                }
            } else {
                // Check if the radio button with the same name, type, and empty value already exists in the fields array
                if (!fields.some(field => field.name === input.name && field.type === input.type && field.value === "")) {
                    fields.push({
                        name: input.name,
                        type: input.type,
                        value: ""
                    });
                }
            }
        } else {
            // For other input types, include the name, type, and value (or checked state for checkboxes)
            fields.push({
                name: input.name,
                type: input.type,
                value: input.type === 'checkbox' ? input.checked : input.value
            });
        }
    }

    // Return scanned fields and error boxes if valid, otherwise throw an error
    if (approvedArray(fields)) {
        return fields;
    } else {
        throw new Error('No fields found in the form || Please make a valid form.');
    }
}

// Export the scanner function as the default export
export default scanner;