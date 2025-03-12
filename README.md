# Vulture.js

**Vulture.js** is a lightweight and powerful form validation library for JavaScript. It ensures data integrity, scans for invalid inputs, and dynamically renders errors within the form. With minimal syntax and a robust validation system, Vulture.js helps developers focus on other critical aspects while it handles validation effortlessly.

## 🚀 Features
- **Simple Form Connection** – Easily connect single or multiple forms.
- **Real-time Validation** – Handles empty fields, required inputs, and strict validation.
- **Error Rendering** – Dynamically displays error messages below each field.
- **Strict Mode** – Enables or disables advanced validation.
- **Regex-based Identification** – Smart field detection for various input types.
- **Minimal Setup** – Quick integration with any JavaScript project.

---

## 📦 How to Use

### By CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/vulture-js@latest/dist/vulture.min.js"></script>
```
**NOTE**: `vulture-js`  is currently available only for the browser, you can only connect to it with the help of CDN script. Sometimes `@latest` not work as expected, so we recommend using the latest version.

**Latest Version**: *v1.2.0*

---

## 🔧 Usage

### Single Form Connection
```js
vulture.connect("myForm");

const form = document.querySelector("#myForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { fields, errors } = vulture.talon({ strict: true, render_error: true });
    
    if (errors) return console.error(errors);
    console.log(fields);
});
```

### Multiple Form Connection
```js
vulture.multiConnect(["myForm1", "myForm2", "myForm3"]);

const forms = document.querySelectorAll("form");
forms.forEach((f, i) => {
    f.addEventListener("submit", (e) => {
        e.preventDefault();
        const { formId, fields, errors } = vulture.talonAll(i, { strict: true, render_error: true });
        
        console.log(formId, fields, errors);
    });
});
```

---

## 🎯 Options
| Option         | Type    | Default  | Description                                           |
|----------------|---------|----------|-------------------------------------------------------|
| `strict`       | Boolean | `false`  | Enables strict validation rules.                      |
| `augment`      | Array   | `null`   | Adds more fields to the priority list.                |
| `render_error` | Boolean | `true`   | Displays error messages below invalid fields.         |
| `minmax`       | Array   | `[2,50]` | Sets minimum & maximum length limits for fields containing `name`. |
| `phoneRules`   | Array   | `[]`     | Sets rules to validate phone numbers.                 |
| `combine`      | Object  | `null`   | Combines multiple fields into a single field.         |

---


### Use of augment
By using `augment` you can add more fields to the priority list.

```js
vulture.connect("myForm");

const form = document.querySelector("#myForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { fields, errors } = vulture.talon({ strict: true, augment: ['tags', 'links'], render_error: true });
    
    if (errors) return console.error(errors);
    console.log(fields);
});
```

### Use of minmax
By using `minmax`, you can set the minimum and maximum length limits for fields containing `name` (e.g., `fullname`, `username`, `first_name`).

**NOTE**: `minmax` does not work in `strict: false`.

```js
const { fields, errors } = vulture.talon({ strict: true, render_error: true, minmax: [3, 25] });
```

### Use of phoneRules
By using `phoneRules`, you can set the format of phone numbers.

```js
const { fields, errors } = vulture.talon({ strict: true, render_error: true, phoneRules: ["+", "spaces"] });
```

These are the options that are used to set the format of phone numbers:
- `[]` - Phone number format is XXXXXXXXXX
- `["+"]` - Phone number format is +XX XXXXXXXXXX
- `["spaces"]` - Phone number format is XXX XXX XXXX
- `["hyphens"]` - Phone number format is XXX-XXX-XXXX
- `["dots"]` - Phone number format is XXX.XXX.XXXX
- `["+", "spaces"]` - Phone number format is +XX XXX XXXX XXX, XXX XXXX XXX, +XXXXXXXXXXXX, XXXXXXXXXX

You can use more as per your requirements.

**Note**: The default phone number format is XXXXXXXXXX, and you don't need to provide a blank array `phoneRules: []`.

### Use of combine
By using `combine`, you can merge two fields into a single field. It combines field values using specified operators.

```js
    const { fields, errors } = vulture.talon({
        strict: true,
        render_error: true,
        combine: {
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
        }
    });
```

```js
    // Output
    [
        { name: 'email', type: 'email', value: 'example123@example.com' },
        { name: 'phone_number', type: 'text', value: '+91 917049XXXX' },  
        { name: 'full_name', type: 'text', value: 'Anmol Shrivastav' }    
    ]
```

### Characteristics of Combine

Combine `first_name` and `last_name` into `full_name` with space as a separator. This can be useful when you want to combine two fields into a single field for form submission or display purposes.

The `combine` property should be an object with `fieldsToCombine`, `attributes`, and `method` properties.

- `fieldsToCombine` is an array of field names to combine.
- `attributes` is an array of objects, each representing an attribute to set for the combined field.
    - `name` specifies the name of the attribute to set.
    - `type` specifies the type of attribute to set (e.g., 'text', 'hidden', 'checkbox', etc.).
- `method` specifies the method to combine the fields (Methods are: 'space', 'hyphen', 'dot', 'underscore') (default is space).

### Custom Error Messages

By using `vulture.defError()`, you can define custom error messages for specific fields. This allows you to provide more meaningful feedback to users.

```js
vulture.defError([
    { field: "first_name", required: "Please enter your name", min: "Enter at least 3 characters", max: "You cannot enter more than 25 characters" },
    { field: "email", not_valid: "Please enter a valid email address" },
    { field: "profession", required: "Please select your profession" },
    { field: "terms", required: "You must agree to the terms and conditions" }
]);
```

This method allows you to specify custom error messages for different validation rules such as `required`, `min`, `max`, and `not_valid`.

- `field`: The name of the field.
- `required`: Message when the field is required but not filled.
- `min`: Message when the field value is below the minimum length (only work in fields containing `name`).
- `max`: Message when the field value exceeds the maximum length (only work in fields containing `name`).
- `not_valid`: Message when the field value does not match the expected format.

Example usage:

```js
vulture.connect("myForm");

// Define error 
vulture.defError([
    { field: "first_name", required: "Please enter your name" },
    { field: "email", not_valid: "Please enter a valid email address" },
    { field: "terms", required: "You must agree to the terms and conditions" }
]);

const form = document.querySelector("#myForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { fields, errors } = vulture.talon({ strict: true, render_error: true });

    if (errors) return console.error(errors);
    console.log(fields);
});
```


### How to directly store to the database ?
By using `vulture.formatter()` you can send directly store to the database without any additional code.
It convert Array of fields to form data Objects.

```js
vulture.connect("myForm");

const form = document.querySelector("#myForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { fields, errors } = vulture.talon({ strict: true, render_error: true });
    
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
    fetch('https://api.you-domain.com/user-form', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
});
```

### How to Display error after validation ?
By using `vulture.error()`, you can display error messages in your form.

**Note**: This method only displays error messages; it does not stop the process by itself.

Useful for throwing errors after checking email, username, and ID.

```js
    const users = [{
        first_name: 'Anmol',
        last_name: 'Shrivastav',
        email: 'codeshorter@gmail.com'
    }]
    const ext_user = users.find(user => user.email === data.email);

    // vulture.error('field name', "Error you want to display")
    if (ext_user) {
        vulture.error('email', "Email is already exist.")
        return; // For stoping further process
    };
```

## 📌 Example HTML Form
**NOTE**: For Displaying error correctly write `error` in div class name and input field name (e.g. `username`) in div ID

```html
<form id="myForm">
    <input type="text" id="username-inp" name="username" placeholder="Username">
    <div id="username" class="error"></div>
    <button type="submit">Submit</button>
</form>
```

## Full Code
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vulture.js Example</title>
</head>
<body>

    <form id="user-form">
        <input type="text" name="username">
        <button type="submit">Submit</button>
    </form>

    <!-- Include Vulture.js just before closing body -->
    <script src="https://cdn.jsdelivr.net/npm/vulture-js@latest/dist/vulture.min.js"></script>
    <script>
        vulture.connect("user-form");
        document.querySelector("#user-form").addEventListener("submit", (e) => {
            e.preventDefault();
            const { fields, errors } = vulture.talon({ strict: true, render_error: true });

            if (errors) return console.error(errors);
            console.log(vulture.formatter(fields));
        });
    </script>

</body>
</html>
```

---

## 🛠️ Contributing
Contributions are welcome! Feel free to submit issues and pull requests.

### Steps to Contribute:
1. Fork the repository.
2. Clone the repo: `git clone https://github.com/code-shorter/vulture-js.git`
3. Create a new branch: `git checkout -b feature-branch`
4. Commit your changes: `git commit -m "Add new feature"`
5. Push to your branch: `git push origin feature-branch`
6. Submit a pull request.

---

## 📜 License
**Vulture.js** is open-source and available under the **MIT License**.

---

## 🌐 Links & Resources
- **Documentation:** [https://vulturejs.github.io](https://vulturejs.github.io)
- **GitHub:** [https://github.com/code-shorter/vulture-js](https://github.com/code-shorter/vulture-js)
- **NPM:** [https://www.npmjs.com/package/vulture-js](https://www.npmjs.com/package/vulture-js)

---

## 🦅 About Vulture.js
Vulture.js is inspired by the natural role of vultures in the ecosystem. Just as vultures clean up the environment by removing harmful waste, **Vulture.js** ensures clean and valid form submissions by filtering out invalid data.

Happy Coding! 🎉

