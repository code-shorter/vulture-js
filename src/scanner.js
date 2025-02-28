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

// Export the scanner function as the default export
export default scanner;