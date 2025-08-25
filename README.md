# Pokémon Gallery (React + Redux Toolkit + Ant Design)

A modern web application that allows users to browse Pokémon, built with React. This project demonstrates a complete end-to-end DevOps workflow, from initial server setup to a final, containerized production deployment.

-   **Live Demo:** `http://<your-ec2-ip-address>`
-   **GitHub Repository:** `https://github.com/<your-username>/pokemon-app`

---

## Table of Contents

1.  [Technology Stack](#technology-stack)
2.  [Features](#features)
3.  [Getting Started: Step-by-Step Guide](#getting-started-step-by-step-guide)
    -   [Part A: Server Preparation](#part-a-server-preparation)
    -   [Part B: Application Setup](#part-b-application-setup)
    -   [Part C: Deployment & Publishing](#part-c-deployment--publishing)
4.  [Usage](#usage)
    -   [Development](#development)
    -   [Production](#production)
5.  [Project Structure](#project-structure)

---

## Technology Stack

-   **Cloud Provider:** AWS EC2 (Ubuntu 24.04)
-   **Frontend:** React (Create React App)
-   **State Management:** Redux Toolkit
-   **UI Library:** Ant Design
-   **Data Fetching:** Axios
-   **Environment Management:** Node Version Manager (nvm)
-   **Package Manager:** Yarn
-   **Containerization:** Docker & Docker Compose
-   **Production Web Server:** Nginx
-   **Version Control:** Git & GitHub

---

## Features

-   Browse a paginated gallery of Pokémon.
-   View detailed information for each Pokémon.
-   Clean, responsive UI built with Ant Design.
-   Efficient state management with Redux Toolkit.
-   Containerized for consistent, portable deployments.

---

## Getting Started: Step-by-Step Guide

This guide covers the entire process from a bare Ubuntu server to a live, deployed application on GitHub.

### Part A: Server Preparation (One-Time Setup)

These steps prepare a fresh Ubuntu 24.04 server for the project.

#### Step 1: Connect to Your EC2 Instance
Connect to your newly created Ubuntu server using SSH.
```bash
# Replace with your key and public DNS/IP
ssh -i /path/to/your-key.pem ubuntu@<EC2_PUBLIC_DNS>
Step 2: Update System and Install Essentials
Ensure the server is up-to-date and install fundamental development tools.
code
Bash
sudo apt update -y && sudo apt upgrade -y
sudo apt install -y git curl build-essential wget unzip
Step 3: Install Node.js (v20) and Yarn
We use a specific Node.js version for consistency, managed via nvm.
code
Bash
# Add NodeSource repository for Node.js v20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Yarn package manager globally using npm
sudo npm install -g yarn

# Verify installations
echo "Node version: $(node -v)"  # Should be v20.x.x
echo "Yarn version: $(yarn -v)"
Step 4: Install Docker and Docker Compose
Docker is required for building and running the production container.
code
Bash
# Install Docker Engine and the Compose plugin from the default repository
sudo apt install -y docker.io docker-compose-plugin

# Start and enable the Docker service to run on boot
sudo systemctl enable --now docker

# Add your current user to the 'docker' group to run commands without sudo.
# This prevents permission errors.
sudo usermod -aG docker $USER
newgrp docker # IMPORTANT: This applies the new group membership to your current shell

# Verify the Docker installation
docker --version
docker compose version
Part B: Application Setup
Now, set up the React application itself.
Step 5: Create the Project Directory and App
code
Bash
# Create a parent folder for your apps and navigate into it
mkdir -p ~/apps && cd ~/apps

# Create the React application using the official template
npx create-react-app pokemon-app

# Navigate into the newly created project directory
cd pokemon-app
Step 6: Install Project Dependencies
Install the specific libraries used in this project.
code
Bash
yarn add antd axios @reduxjs/toolkit react-redux```

#### Step 7: Add the Application Code
Replace the default placeholder code with the actual application logic.
```bash
# Open the main entrypoint file in a text editor
nano src/index.js
Inside the editor, delete all existing content and paste in the provided single-file application code. Save with Ctrl+O, then exit with Ctrl+X.
Step 8: Test the Development Server
Run the app in development mode to ensure everything is working.
code
Bash
# The HOST=0.0.0.0 flag is required to access the server from a public IP
HOST=0.0.0.0 PORT=3000 yarn start
Access: Open your browser to http://<EC2_PUBLIC_DNS>:3000.
Firewall: Ensure your EC2 Security Group has an inbound rule allowing TCP traffic on port 3000.
Stop the server: Press Ctrl+C in the terminal once you've confirmed it works.
Part C: Deployment & Publishing
Prepare the project for production and publish it.
Step 9: Prepare for Production and Git
Create the necessary configuration files for Docker, NVM, and Git.
code
Bash
# Create the Dockerfile for building the production image
nano Dockerfile
# (Paste the multi-stage Dockerfile content here)

# Create the .nvmrc file to lock the Node.js version
echo "20" > .nvmrc

# Create a LICENSE file
echo "MIT License" > LICENSE
Step 10: Initialize Git Repository
Initialize the project as a Git repository and make your first commit.
code
Bash
git init
git branch -M main
git add .
git commit -m "feat: initialize CRA Pokémon app with Docker and documentation"
Step 11: Create GitHub Repository and Push
On GitHub.com: Create a new, empty repository named pokemon-app. Do not add a README, license, or .gitignore.
In your terminal: Link your local repository to the remote one on GitHub and push your code.
code
Bash
# Replace <your-username> with your actual GitHub username
git remote add origin https://github.com/<your-username>/pokemon-app.git

# Push your 'main' branch to the remote 'origin'
git push -u origin main
You will be prompted for your GitHub username and a Personal Access Token (PAT) as your password.
Usage
Development
To run the app in development mode with hot-reloading:
code
Bash
yarn install
yarn start
Production
To build and run the production-ready Docker container:
code
Bash
# Build the image
docker build -t pokemon-app:latest .

# Run the container
docker run -d -p 80:80 --name pokemon-app pokemon-app:latest
Alternatively, with Docker Compose:
code
Bash
# Build and run in one command
docker compose up --build -d
Project Structure
code
Code
pokemon-app/
├── .git/               # Git repository data
├── .nvmrc              # Specifies Node.js version
├── node_modules/       # Project dependencies (ignored by Git)
├── public/             # Public assets and index.html
├── src/                # React source code
│   └── index.js        # Main application component
├── .dockerignore       # Specifies files to ignore in Docker build
├── Dockerfile          # Instructions for building the production image
├── LICENSE             # Project license
├── README.md           # This file
├── package.json        # Project metadata and scripts
└── yarn.lock           # Dependency version lockfile
