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

## 📦 Installation

### Using npm:
```bash
npm install vulture.js
```

### Using CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/vulture.js"></script>
```

---

## 🔧 Usage

### Import Vulture.js
```js
import vulture from "vulture.js";
```

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
| Option           | Type    | Default | Description |
|-----------------|---------|---------|-------------|
| `strict`        | Boolean | `true`  | Enables strict validation rules. |
| `augment`       | Array   | `true`  | Enables adding more fields to the priority list. |
| `render_error`  | Boolean | `true`  | Displays error messages below invalid fields. |

---

## 📌 Example HTML Form
```html
<form id="myForm">
    <input type="text" id="username-inp" name="username" placeholder="Username">
    <div id="username" class="error"></div>
    <button type="submit">Submit</button>
</form>
```

---

## 🛠️ Contributing
Contributions are welcome! Feel free to submit issues and pull requests.

### Steps to Contribute:
1. Fork the repository.
2. Clone the repo: `git clone https://github.com/codeshorter/vulture.js.git`
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
- **GitHub:** [https://github.com/yourusername/vulture.js](https://github.com/yourusername/vulture.js)
- **NPM:** [https://www.npmjs.com/package/vulture.js](https://www.npmjs.com/package/vulture.js)

---

## 🦅 About Vulture.js
Vulture.js is inspired by the natural role of vultures in the ecosystem. Just as vultures clean up the environment by removing harmful waste, **Vulture.js** ensures clean and valid form submissions by filtering out invalid data.

Happy Coding! 🎉

