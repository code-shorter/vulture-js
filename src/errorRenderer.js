import { approvedArray, approvedObject } from "./utils.js";

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
        box.textContent = error ? requiredError(error.message) : '';
    }
}

function requiredError(error) {
    const camel = error[0].toLocaleUpperCase() + error.slice(1);
    const dashSeparator = camel.replace(/[_-]/g, " ");
    const camelSeparator = dashSeparator.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
    const arranger = `${camelSeparator[0]} ${camelSeparator.slice(1).join(' ').toLocaleLowerCase()}`;

    return arranger;
};


// Export the renderError function as the default export
export default renderError;