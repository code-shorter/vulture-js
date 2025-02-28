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
        box.innerHTML = error ? error.message : '';
    }
}

// Export the renderError function as the default export
export default renderError;