// Single form connection
vulture.connect("user-form"); // Auto detect form by ID or class name (Write without '#' and '.') (Only for single form connection)
const form = document.querySelector("#user-form");

form.addEventListener("submit", (e) => {
    // Prevent form submission
    e.preventDefault();

    // Get form fields and errors using talon method
    const { fields, errors } = vulture.talon({ strict: true, augment: ['tags'], render_error: true });
    // There are three parameters in talon method:-
        // 1. strict: true (By default it is false) - It will strictly check the form fields, email, password and return errors
        // 2. augment: [''] (By default it is null) - By this you can add more fields to the priority list (e.g. tags, comment, link, etc.)
        // 3. render_error: true (By default it is true) - It will render error messages on the form

        // NOTE:- Field name containing "other" (e.g. other_email, othername) would not be consider as priority field
    
    // If any error occurs, log them and return
    if (errors) return console.error(errors);

    // For formating the data
    const data = vulture.formatter(fields);

    console.log(data);
    // Output by using formatter:-
        // {
        //     firstname: "Anmol",
        //     lastname: "Shrivastav",
        //     email: "example@gmail.com"
        // }


    // Send data to your backend
    fetch('https://api.you-backend-url.com/user-form', {
        method: 'POST',
        body: data,
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
});

// Multi form connection
vulture.multiConnect(["user-form", "comment-form"]); // Multi-form connection give only IDs of forms
const forms = document.querySelectorAll(".myForm"); // Same class name for all forms

forms.forEach((f, i) => {
    f.addEventListener("submit", (e) => {
        e.preventDefault();
        const { formId, fields, errors } = vulture.talonAll(i, { strict: true, render_error: true });
        // There are four parameters in talon method:-
            // 1. index: 0 (By default it is 0) - It will take the index of the form (It is compulsory to add index by using talonAll method)
            // Others are same as above...
        
        if (errors) return console.error(errors);
        console.log(formId);
        console.log(fields);
    });
});


// For more information, visit https://vulturejs.github.io/docs.html#formatting