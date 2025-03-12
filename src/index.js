// Import necessary modules and functions
import prioritizer from "./prioritizer.js";
import validator from "./validator.js";
import scanner from "./scanner.js";
import { approvedArray, approvedObject } from "./utils.js";
import renderError from "./errorRenderer.js";
import combiner from "./combiner.js";

// Variable to store the form element
let form;
let forms = [];
let multiConnect = false;
const customErrors = [];
const errorBoxes = [];

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
        let elem = form ? new Set([...form.querySelectorAll("input[name], select[name], textarea[name]")].map(e => e.name)).size : 0;

        // Select all elements with the class "error" within the form
        const errorBoxesExtractor = Array.from(form.querySelectorAll(".error"));
        if (approvedArray(errorBoxesExtractor)) {
            for (const e of errorBoxesExtractor) {
                errorBoxes.push({ id: e.id, class: "error" });
            }
        }

        if (form)
            console.log(`Vulture protection to ${form.id || form.className}(${elem}) \nVisit https://vulturejs.github.io`)
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
            if (form) {
                forms.push(form);
            } else {
                console.error(`Form ID error: MultiConnect required Form ID,\nForm index: ${forms.length + 1} has no ID or Form IDs are more than forms.`);
                error = true;
            };

            // Select all elements with the class "error" within the form
            const errorBoxesExtractor = Array.from(form.querySelectorAll(".error"));
            if (approvedArray(errorBoxesExtractor)) {
                for (const e of errorBoxesExtractor) {
                    errorBoxes.push({ id: e.id, class: "error" });
                }
            }

            error = false;
            if (forms.length === formIds.length) break;
        }
        multiConnect = true;
        if (approvedArray(formIds) && !error) console.log(`Vulture protection to ${forms.map(form => {
            return `${form.id}(${form ? new Set([...form.querySelectorAll("input[name], select[name], textarea[name]")].map(e => e.name)).size : 0})`;
        }).join(', ')}\nVisit https://vulturejs.github.io`);
    },

    /**
     * Validates the form fields and returns the results
     * 
     * @param {Object} options - Options for validation.
     * @param {boolean} options.strict - Whether to strictly validate fields.
     * @param {Array} options.augment - Additional fields to prioritize.
     * @param {boolean} options.render_error - Whether to render error messages.
     * @param {Array} options.minmax - Limit minimum and maximum characters in fields.
     * @param {Array} phoneRules - The phone rules to validate
     * @param {Object} combine - Combining two fields into a single field
     * @returns {Object} An object containing validated fields and errors.
     */
    talon: ({ strict = false, augment = null, render_error = true, minmax = [2, 50], phoneRules = [], combine } = {}) => {

        // Scan the form to extract fields and error boxes
        const scannedFields = scanner(form);

        // Prioritize the scanned fields
        const { priority, non_priority } = prioritizer(scannedFields, { strict, augment });

        // Validate the prioritized fields
        const { fields, errors } = validator(priority, strict, minmax, phoneRules, customErrors);

        // Render error messages if enabled
        if (render_error) renderError(errorBoxes, errors);

        // Return errors if any, otherwise return the validated fields
        if (approvedArray(errors) || !approvedArray(fields)) return { errors: errors };

        const data = [...new Set([...fields, ...non_priority])];
        const combination = approvedObject(combine) ? combiner({ fieldsGroup: data, ...combine }) : null;

        return { fields: combination ? combination : data };
    },

    /**
     * Validates the form fields and returns the results
     * 
     * @param {Object} options - Options for validation.
     * @param {boolean} options.strict - Whether to strictly validate fields.
     * @param {Array} options.augment - Additional fields to prioritize.
     * @param {boolean} options.render_error - Whether to render error messages.
     * @param {Array} options.minmax - Limit minimum and maximum characters in fields.
     * @param {Array} phoneRules - The phone rules to validate
     * @returns {Object} An object containing validated fields and errors.
     */
    talonAll: (index, { strict = false, augment = null, render_error = true, minmax = [2, 50], phoneRules = [] } = {}) => {
        if (!strict) strict = false;
        if (!augment) augment = null;
        if (multiConnect) form = forms[index];

        // Scan the form to extract fields and error boxes
        const scannedFields = scanner(form);

        // Prioritize the scanned fields
        const { priority, non_priority } = prioritizer(scannedFields, { strict, augment });

        // Validate the prioritized fields
        const { fields, errors } = validator(priority, strict, minmax, phoneRules, customErrors);

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
    },

    /**
     * Renders error messages to the specified error boxes
     * 
     * @param {Array} errorBoxes - The IDs of the error boxes.
     * @param {Array} errors - The error messages.
     * */
    error: (field, error) => {
        const errorBox = errorBoxes.find(e => e.id === field);
        if (errorBox) {
            const box = document.getElementById(errorBox.id);
            !errorBox.class && box.classList.add("error");
            box.textContent = error;
        }
    },

    /**
     * Registers custom error messages for specific fields
     * 
     * @param {Array} data - An array of objects containing field names and their respective error messages.
     * */
    defError: (data = []) => {
        if (!approvedArray(data)) return;
        customErrors.push(...data);
    }
};


// Example usage
// const { fields, errors } = vulture.talon({ strict: true, augment: null });
// console.log(fields, errors);

// Export the vulture object as the default export
export default vulture;