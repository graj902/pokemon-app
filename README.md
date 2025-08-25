# Pokémon Gallery (React + Redux Toolkit + Ant Design)

A modern web application that allows users to browse Pokémon, built with React. This project uses the PokeAPI for data, Redux Toolkit for state management, Axios for data fetching, and Ant Design for the UI component library. The production build is containerized with Docker and served by Nginx.

---

## Getting Started

This guide provides instructions for cloning and running the application.

### Prerequisites

Before you begin, ensure you have the following installed on your system:
-   **Git**
-   **Node.js** (v20.x recommended)
-   **Yarn**
-   **Docker** and **Docker Compose**

> For a complete guide on setting up a fresh Ubuntu server from scratch, please see the [**SERVER_SETUP.md**](SERVER_SETUP.md) file.

### 1. Clone the Repository

First, clone this repository to your local machine.

```bash
git clone https://github.com/graj902/pokemon-app.git
cd pokemon-app
2. Choose Your Workflow
You can run the application in two ways:
Development Mode: For making code changes with hot-reloading.
Production Mode: For running the optimized, containerized version of the app.
Development Mode
This workflow uses the local React development server.
Step 1: Install Dependencies
code
Bash
yarn install
Step 2: Start the Server
code
Bash
yarn start
The application will be available at http://localhost:3000.
Production Mode (Docker)
This is the recommended method for a stable, production-like deployment.
Step 1: Build and Run the Container
This single command builds the Docker image and starts the container in the background.
code
Bash
docker compose up --build -d
The application will be served by Nginx and available on port 80 at http://localhost.
Step 2: Manage the Container
Use these commands to manage your running application:
code
Bash
# View the status of your running container
docker compose ps

# View real-time logs
docker compose logs -f

# Stop and remove the container
docker compose down```
