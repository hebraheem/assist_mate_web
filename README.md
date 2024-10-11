# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

===============================================================

---

# AssistMate Web

A React and TypeScript-based web application.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Libraries and Dependencies](#libraries-and-dependencies)
4. [Project Structure](#project-structure)
5. [Setup Instructions](#setup-instructions)
6. [Coding Conventions & Style Guide](#coding-conventions--style-guide)
7. [Usage](#usage)
8. [Contributing](#contributing)
9. [License](#license)

---

## Overview

AssistMate Web is a frontend application built with **React** and **TypeScript**. It follows a modular and scalable structure for building responsive and accessible user interfaces. The app uses modern development practices and libraries to ensure efficient and maintainable code.

---

## Features

- TypeScript for type-safe JavaScript.
- Modular and component-based architecture.
- i18n (internationalization) support.
- Form handling with reusable input components.
- Authentication UI (sign-in and sign-up forms).
- Firebase authentication support

---

## Libraries and Dependencies

This project makes use of the following key libraries and tools:

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Strongly typed JavaScript to improve development efficiency.
- **react-i18next**: Internationalization and localization support for React.
- **React Router**: For routing between different views and layouts.
- **Axios**: Promise-based HTTP client for API requests.
- **Classnames**: Utility for conditionally applying CSS classes.
- **ESLint**: Code linter to enforce consistent code quality.
- **Prettier**: Code formatter for maintaining consistent coding style.
- **Firebase**: Serverless Backend.
- **Google console service**: For location service.

#### DevDependencies

- **ESLint**: Linting for identifying potential issues in the code.
- **Prettier**: Ensures a uniform code style and format across the codebase.
- **@types/react**: TypeScript definitions for React.
- **@types/node**: TypeScript definitions for Node.js.
- **@storybook**: Component documentation.

---

## Project Structure

Here is the general folder structure of the project:

```
src/
  ├── components/          # Reusable components (e.g., Button, Input, etc.)
  ├── contexts/            # Context for managing global state
  ├── hooks/               # Custom hooks (e.g., useClickOutside)
  ├── layouts/             # Layouts for authentication, user dashboard, etc.
  ├── services/            # API services and utilities (e.g., Google services)
  ├── views/               # Pages and views (e.g., auth, profile)
  ├── utils/               # Helper functions, constants, etc.
  ├── App.tsx              # Main app component
  ├── i18n.ts              # Internationalization config
  └── index.tsx            # Entry point
```

---

## Setup Instructions

### Prerequisites

- Node.js (v14.x or above)
- npm or yarn

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-repo/AssistMate-Web.git
   cd AssistMate-Web
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**:

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Build for production**:

   ```bash
   npm run build
   # or
   yarn build
   ```

5. **Documentation with storybook**:

   ```bash
   npm run storybook
   # or
   yarn storybook
   ```

---

## Coding Conventions & Style Guide

### General Conventions

- **Component-based architecture**: The app is organized around reusable components.
- **Type Safety**: We use TypeScript to enforce strong typing across the app, which improves code reliability and maintainability.

### Linting & Formatting

We use **ESLint** and **Prettier** for enforcing a consistent code style.

- **ESLint**: Static code analysis to find problematic patterns or code that doesn't adhere to certain style guidelines.
- **Prettier**: Code formatter that enforces a consistent style for code indentation, quotes, line breaks, etc.

Run the following commands to check or fix linting and formatting:

```bash
# Lint the code
npm run lint

# Format the code with Prettier
npm run format
```

### Folder & File Naming

- **kebab-case** is used for component and file names (e.g., `sign-in.tsx`).
- **camelCase** is used for variable and function names.

### Typescript Guidelines

- Always define types for props and state.
- Avoid using `any` unless absolutely necessary. Use proper interfaces or types to define the shape of objects.

### Commit Messages

Follow the conventional commit format for commit messages:

```bash
<type>(<scope>): <subject>
```

Example:

```bash
feat(auth): add login functionality
fix(button): correct alignment issue
```

## Contributing

We welcome contributions! Please follow the [coding conventions](#coding-conventions--style-guide) and make sure to submit a pull request to the `develop` branch for review.

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to adjust this README template based on your project specifics, such as adding additional libraries or features you are working with.
