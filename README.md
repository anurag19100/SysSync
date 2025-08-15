# System Sync Pro

![System Sync Pro Screenshot](https://i.imgur.com/example-screenshot.png) <!-- Placeholder: A real screenshot would go here -->

**System Sync Pro** is a modern, intuitive dashboard designed to manage and synchronize crucial developer and user data across multiple platforms. It provides a unified interface for running command scripts, syncing files to cloud storage, and merging browser bookmarks.

Built with scalability and user experience in mind, this application serves as a robust frontend prototype, demonstrating a clean architecture ready to be integrated with powerful backend services to support millions of users.

---

## ✨ Key Features

-   **🖥️ Command Runner**:
    -   Add, manage, and remove a list of shell commands.
    -   Simulate running all commands in sequence.
    -   View real-time status (Pending, Running, Success, Error) and a consolidated output log.
    -   Cross-platform compatibility simulation for Windows and Linux commands.

-   **☁️ Google Drive Sync**:
    -   Simulate selecting a local directory to synchronize.
    -   Visualize the file and folder hierarchy.
    -   Track sync progress and receive completion notifications.
    -   Designed to maintain the exact folder structure in the cloud.

-   **🔖 Bookmark Sync**:
    -   View bookmarks from multiple simulated sources (e.g., Chrome, Firefox, Local).
    -   Perform a "many-to-many" sync, merging all bookmarks into a unified collection across all sources.
    -   Clean, card-based UI to easily distinguish between browser stores.

## 🛠️ Tech Stack

-   **Frontend**: [React](https.reactjs.org) with [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: Custom SVG components
-   **Environment**: Browser-based, no build step required for this prototype (using ES modules and import maps).

## 🚀 Getting Started

For detailed instructions on how to set up and run this project on your local machine, please see the **[Local Setup Guide](./LOCAL_SETUP.md)**.

##  архитектура Project Deep Dive

To understand the project's architecture, design principles, and scalability considerations, read the **[In-depth Project Explanation](./PROJECT_DETAILS.md)**.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
