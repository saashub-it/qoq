# Quality over Quantity (QoQ)



**A streamlined suite of tools to format, lint, and analyze any JavaScript/TypeScript project with minimal setup.**

🚀 **Why QoQ?**

- 🛠 **Zero-hassle Configuration** – Set up once and focus on coding.
- ⚡ **Optimized Performance** – Run tools efficiently without redundant overhead.
- 🔬 **Precision over Bulk** – Enforce best practices with well-curated presets.

## 📦 What's Included?

QoQ provides essential tooling to ensure code quality across all your projects:

- **ESLint v9** – Enforce best practices with extendable, opinionated presets.
- **Prettier** – Automatically format code for consistency.
- **Knip** – Detect and remove unused code effortlessly.
- **JSCPD** – Identify and eliminate duplicate code.

Each tool is available as an independent package under the `@saashub/qoq-*` namespace, making it easy to integrate and customize.

## 🚀 Getting Started

### 1️⃣ Install QoQ

```sh
npm install @saashub/qoq-cli
```

### 2️⃣ Set Up Configuration

QoQ uses an intuitive **Config Wizard** to guide you through setup. Run:

```sh
npx qoq init
```

This will generate a `qoq.config.js` file with all necessary configurations.

### 3️⃣ Run Quality Checks


- `qoq --check` – Runs a full code check, typically used in the CI lint step or pre-push hook.
- `qoq staged` – Checks only staged changes, typically used in the pre-commit hook.
- `qoq --fix` – Fixes issues where possible, typically triggered manually after hooks or a CI failure to quickly correct problems.


## 🏗 Project Structure

QoQ is designed for flexibility and ease of use. Its core components include:

📂 **Config Wizard** – Guides setup and generates a config file.
📂 **Config Handlers** – Manages default and user-defined settings.
📂 **Executors** – Executes commands efficiently, handling errors and performance optimizations.

For more details, check out our [technical documentation](./packages/cli/README.md).

## 🌍 Contributing

Join us in making QoQ even better! Read our [Contributing Guidelines](https://github.com/saashub-it/qoq/blob/master/.github/CONTRIBUTING.md) before submitting changes.

---

💡 **QoQ: Focus on writing great code, we handle the rest.**


*Feel free to join us, please read [Contributing Guidelines](https://github.com/saashub-it/qoq/blob/master/.github/CONTRIBUTING.md)*
