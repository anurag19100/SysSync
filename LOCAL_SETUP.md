# Local Development Setup Guide

This guide provides step-by-step instructions for setting up and running the **System Sync Pro** application on your local machine for development and testing purposes.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Node.js**: Version 18.x or later. You can download it from [nodejs.org](https://nodejs.org/).
-   **npm** (Node Package Manager) or an alternative like **yarn** or **pnpm**. npm is included with the Node.js installation.

## ⚙️ Installation Steps

1.  **Clone the Repository**

    Open your terminal or command prompt and clone the project repository from GitHub:

    ```bash
    git clone https://github.com/your-username/system-sync-pro.git
    ```

    (Note: Replace `your-username/system-sync-pro.git` with the actual repository URL).

2.  **Navigate to the Project Directory**

    ```bash
    cd system-sync-pro
    ```

3.  **Install Dependencies**

    This project has no external npm dependencies for this prototype, as it relies on CDN-hosted ES modules specified in `index.html`. However, a typical React project would require this step:

    ```bash
    # For a standard project, you would run:
    # npm install
    ```

4.  **Set Up Environment Variables**

    In a real-world scenario, this application would require an API key for services like the Gemini API or Google Drive. You would create a `.env` file in the root of the project:

    ```env
    # .env
    API_KEY="YOUR_GEMINI_API_KEY"
    ```

    For this simulation, no API key is required to run the frontend.

5.  **Run the Development Server**

    Since this project is set up as a simple static site, you can serve it using any local web server. A common and easy way is to use the `serve` package.

    First, install `serve` globally:
    ```bash
    npm install -g serve
    ```

    Then, run the server from the project's root directory:
    ```bash
    serve -s .
    ```
    The `-s` flag ensures that any route redirects to `index.html`, which is standard for Single Page Applications (SPAs).

    Your terminal will output a local address, typically `http://localhost:3000`. Open this URL in your web browser to see the application running.

## 🌐 Hosted Version

A live demo of this application is hosted on GitHub Pages. You can access it here:

**[🔗 Live Demo of System Sync Pro](https://your-github-pages-link.io/system-sync-pro/)**

*(Note: Replace with the actual hosted link when available.)*
