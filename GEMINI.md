## Project Overview

This project, "LocalSite", is a web-based application that allows users to generate and edit websites using AI models running locally on their machine. It is built with Next.js and uses the Monaco editor for code editing. The application is designed to work with Ollama, a tool for running large language models locally.

The main technologies used are:
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Code Editor:** Monaco Editor
- **AI:** Ollama
- **State Management:** React Hooks, Tanstack Query

The application's architecture is based on a client-server model, with the Next.js application serving as the frontend and the Ollama models providing the AI-powered code generation. The user interacts with the application through a web interface, where they can provide a prompt to the AI, which then generates the HTML, CSS, and JavaScript for a website. The user can then edit the generated code in the Monaco editor and see a live preview of the website.

## Building and Running

### Prerequisites

- Node.js 18+
- Ollama installed and running
- At least one Ollama model downloaded (e.g., `deepseek-r1:7b`)

### Installation

```bash
npm install
```

### Running the application

To run the application in development mode, use the following command:

```bash
npm run dev
```

This will start the application on `http://localhost:3001`.

### Building the application

To build the application for production, use the following command:

```bash
npm run build
```

### Starting the application

To start the application in production mode, use the following command:

```bash
npm run start
```

## Development Conventions

The codebase is written in TypeScript and uses ESLint for linting. The code is organized into several directories, including `app`, `components`, `hooks`, `lib`, and `public`.

- **`app`:** Contains the main application pages and layouts.
- **`components`:** Contains the React components used in the application.
- **`hooks`:** Contains custom React hooks.
- **`lib`:** Contains utility functions and libraries.
- **`public`:** Contains static assets, such as images and fonts.

The project uses Tailwind CSS for styling, and the configuration can be found in the `tailwind.config.js` file. The application also uses `sonner` for displaying toast notifications.
