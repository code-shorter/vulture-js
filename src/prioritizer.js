// Import necessary modules
import { preFields } from './fields_module.js';
import { approvedArray } from './utils.js';

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
    const priority_ext = fields.filter(f => pre_priority_fields.some(regex => regex.test(f.name)));
    const priority = priority_ext.filter(f => !/other/i.test(f.name));
    const non_priority = fields.filter(f => !priority.includes(f) || /other/i.test(f.name));

    // console.log(`Prioritizer completed in ${performance.now() - start} milliseconds`);

    // Return the prioritized and non-prioritized fields
    return { priority, non_priority };
}

// Example usage
// console.log(prioritizer(ff, { strict: true, augment: ['user_gen', 'user_comfirm'] })); // With strict mode and augmented fields
// (user_gen, user_comfirm) are given by user as priority fields

// Export the prioritizer function as the default export
export default prioritizer; // (ff, { strict: true, augment: [''] }) => No errors