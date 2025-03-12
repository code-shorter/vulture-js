import { approvedArray } from "./utils.js";

/**
 * Combines fields from a group based on specified attributes and method.
 * 
 * @param {Object} params - The parameters for the combiner function.
 * @param {Array} params.fieldsGroup - The group of fields to combine.
 * @param {Array} params.fieldsToCombine - The fields to be combined.
 * @param {Array} params.attributes - The attributes for the new combined fields.
 * @param {string} params.method - The method to use for combining fields (space, hyphen, dot, underscore).
 * @returns {Array} The new group of fields after combination.
 * @throws Will throw an error if fieldsGroup or fieldsToCombine are not approved arrays.
 */
function combiner({ fieldsGroup = [], fieldsToCombine = [], attributes = [], method = '' }) {
    if (!approvedArray(fieldsGroup) || !approvedArray(fieldsToCombine)) {
        throw new Error('Please provide `fieldsGroup` and `fieldsToCombine` to combiner');
    }

    const newGroup = fieldsGroup.slice(); // Create a shallow copy of fieldsGroup

    fieldsToCombine.forEach((field, index) => {
        const f1 = fieldsGroup.find(f => f.name === field[0]);
        const f2 = fieldsGroup.find(f => f.name === field[1]);

        if (!f1 || !f2) {
            throw new Error(`Fields to combine not found: ${field[0]}, ${field[1]}`);
        }

        const joiner = {
            space: ' ',
            hyphen: '-',
            dot: '.',
            underscore: '_'
        }[method] || ' ';

        const combination = [f1.value, f2.value].join(joiner);
        const newName = attributes[index]?.name || f1.name;
        const newType = attributes[index]?.type || 'text';

        newGroup.push({ name: newName, type: newType, value: combination });
        newGroup.splice(newGroup.indexOf(f1), 1);
        newGroup.splice(newGroup.indexOf(f2), 1);
    });

    return newGroup;
}


console.log(
    combiner({
        fieldsGroup: [
            { name: 'first_name', type: 'text', value: 'Anmol' },
            { name: 'last_name', type: 'text', value: 'Shrivastav' },
            { name: 'cu_code', type: 'text', value: '+91' },
            { name: 'phone_number', type: 'text', value: '917049XXXX' },
            { name: 'email', type: 'email', value: 'example123@example.com' }
        ],
        fieldsToCombine: [
            ['cu_code', 'phone_number'],
            ['first_name', 'last_name']
        ],
        attributes: [
            { name: 'phone_number', type: 'text' },
            { name: 'full_name', type: 'text' }
        ],
        method: 'space'
    })
);

export default combiner;