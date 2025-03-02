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
**NOTE**: `vulture-js`  is currently available only for the browser, you can only connect to it with the help of CDN script.
**Latest Version**: v1.1.7

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
| Option          | Type    | Default   | Description |
|-----------------|---------|-----------|-------------|
| `strict`        | Boolean | `false`   | Enables strict validation rules. |
| `augment`       | Array   | `null`    | Enables adding more fields to the priority list. |
| `render_error`  | Boolean | `true`    | Displays error messages below invalid fields. |
| `minmax`        | Array   | `[2, 50]` | Set minimum & maximum length limit in fields containing `name` |

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
By using `minmax` you can set minimum and maximum length limit in those fields which containting `name` (e.g. `fullname`, `username`, `first_name`).
**NOTE**: `minmax` does not work in `strict: false`.

```js
const { fields, errors } = vulture.talon({ strict: true, render_error: true, minmax: [3, 25] });
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
    fetch('https://api.you-backend-url.com/user-form', {
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

