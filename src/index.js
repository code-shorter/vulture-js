// Import necessary modules and functions
import prioritizer from "./prioritizer.js";
import validator from "./validator.js";
import scanner from "./scanner.js";
import { approvedArray } from "./utils.js";
import renderError from "./errorRenderer.js";

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
            console.log(`Connected to ${form.id || form.className}(${elem}) \nVisit https://vulturejs.github.io`)
        else {
            console.error(`Form ID error: MultiConnect reduired Form ID,\nForm index: ${forms.length + 1} has no ID or Form IDs are more than forms.`);
        };
    },

    /**
     * Connects to a form by its ID or class name
     * 
     * @param {Array} formIds - The IDs or classes of the form to connect to.
     */
    multiConnect: (formIds) => {
        let error = false;
        for (const formId of formIds) {
            const form = document.getElementById(formId);
            if (form) forms.push(form)
            else {
                console.error(`Form ID error: MultiConnect reduired Form ID,\nForm index: ${forms.length + 1} has no ID or Form IDs are more than forms.`);
                error = true;
            };
            error = false;
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


// Example usage
// const { fields, errors } = vulture.talon({ strict: true, augment: null });
// console.log(fields, errors);

// Export the vulture object as the default export
export default vulture;