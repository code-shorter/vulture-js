// Single form connection
vulture.connect("user-form"); // Auto detect form by ID or class name (Write without '#' and '.') (Only for single form connection)
vulture.defError([
    { field: "first_name", required: "Please enter your name", min: "Enter at least 3 characters", max: "You can not enter more than 25 characters" },
    { field: "email", not_valid: "Please enter a valid email address" },
    { field: "profession", required: "Please select your profession" },
    { field: "terms", required: "You must agree to the terms and conditions" }
]);

const form = document.querySelector("#user-form");

form.addEventListener("submit", (e) => {
    // Prevent form submission
    e.preventDefault();

    // Get form fields and errors using talon method
    const { fields, errors } = vulture.talon({
        strict: true,
        augment: ['profession'],
        render_error: true,
        minmax: [3, 25],
        phoneRules: ["+", "spaces"],
        // combine: {
        //     fieldsToCombine: [
        //         ['first_name', 'last_name']
        //     ],
        //     attributes: [
        //         { name: 'full_name', type: 'text' }
        //     ],
        //     method: 'space'
        // }
    });

    // There are six parameters in the talon method: (All are optional)
        // 1. strict: true (default is false) - Strictly checks the form fields, email, password, and returns errors
        // 2. augment: [''] (default is null) - Allows adding more fields to the priority list (e.g., tags, comment, link, etc.)
        // 3. render_error: true (default is true) - Renders error messages on the form
        // 4. minmax: [3, 25] (default is [2, 50]) - Sets minimum & maximum length limits for fields containing `name`
        // 5. phoneRules: ["+", "spaces"] (default is []) - Sets phone number rules (e.g., "+1 123-456-7890")
                // [] - Phone number format is XXXXXXXXXX
                // ["+"] - Phone number format is +XX XXXXXXXXXX
                // ["spaces"] - Phone number format is XXX XXX XXXX
                // ["hyphens"] - Phone number format is XXX-XXX-XXXX
                // ["dots"] - Phone number format is XXX.XXX.XXXX
                // ["+", "spaces"] - Phone number format is +XX XXX XXXX XXX, XXX XXXX XXX, +XXXXXXXXXXXX, XXXXXXXXXX
                // You can use more as your requirements
                // (Note: The default phone number format is XXXXXXXXXX, and you don't need to provide blank array `phoneRules: []`)

        // 6. combine fields example:
            // Combine first_name and last_name into full_name with space as separator
            // This can be useful when you want to combine two fields into a single field for form submission or display purposes.
            // 'combine' property should be an object with fieldsToCombine, attributes, and method properties.
            // 'fieldsToCombine' is an array of field names to combine.
            // 'attributes' is an array of objects, each representing an attribute to set for the combined field.
                // 'name' specifies the name of the attribute to set.
                // 'type' specifies the type of attribute to set (e.g., 'text', 'hidden', 'checkbox', etc.).
            // 'method' specifies the method to combine the fields (Methods are: 'space', 'hyphen', 'dot', 'underscore') (default is space).

        // NOTE: Field names containing "other" (e.g., other_email, othername) will not be considered as priority fields

    // If any error occurs, log them and return
    if (errors) {
        console.error(errors);
        return;
    };

    // For formating the data
    const data = vulture.formatter(fields);

    console.log(data);
    // Output by using formatter:-
        // {
        //     first_name: "Anmol",
        //     last_name: "Shrivastav",
        //     email: "codeshorter@gmail.com"
        // }


    const users = [{
        first_name: 'Anmol',
        last_name: 'Shrivastav',
        email: 'codeshorter@gmail.com'
    }]
    const ext_user = users.find(user => user.email === data.email);

    // vulture.error('field name', "Error you want to display")
    if (ext_user) {
        vulture.error('email', "Email is already exist.") // This method only displays error messages; it does not stop the process by itself
        return; // For stoping further process
    };
    // Like above, You can use `vulture.error()` for ID, username, Phone Number and Email etc.

    // Now, you can send the data to your backend or use it further as per your requirement.
    fetch('https://api.your-domain.com/user', {
        method: 'POST',
        body: JSON.stringify(data), // Required in fetch(), but NOT needed in Axios or libraries that auto-stringify
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
});


// Multi form connection
// vulture.multiConnect(["user-form", "comment-form"]); // Multi-form connection takes only IDs of forms
// const forms = document.querySelectorAll(".myForm"); // Same class name for all forms

// forms.forEach((f, i) => {
//     f.addEventListener("submit", (e) => {
//         e.preventDefault();
//         const { formId, fields, errors } = vulture.talonAll(i, {
//             strict: true,
//             augment: ['proffession'],
//             render_error: true,
//             minmax: [3, 25],
//             phoneRules: ["+", "spaces"]
//         });
//         // There are four parameters in the talonAll method:
//         // 1. index: 0 (default is 0) - Specifies the index of the form (It is mandatory to add the index when using the talonAll method)
//         // The other parameters are the same as above except combine parameter

//         if (errors) return console.error(errors);
//         console.log(formId);
//         console.log(fields);
//     });
// });


// For more information, visit https://vulturejs.github.io/docs.html#formatting