# Pokémon Gallery (React + Redux Toolkit + Ant Design)

A simple Pokémon browser application built with React. This project uses the PokeAPI for data, Redux Toolkit for state management, Axios for data fetching, and Ant Design for the UI component library.

The final application is designed to be containerized with Docker and served in production by an Nginx web server.

![Demo Screenshot](https-placeholder-for-your-image-url) <!-- Optional: Add a screenshot of your app later! -->

---

## Table of Contents

1.  [Technology Stack](#technology-stack)
2.  [Project Setup & Development](#project-setup--development)
3.  [Building and Running for Production](#building-and-running-for-production)
4.  [Appendix: Full Server Setup](#appendix-full-server-setup)

---

## Technology Stack

*   **Frontend:** React (Create React App)
*   **State Management:** Redux Toolkit
*   **Data Fetching:** Axios
*   **UI Library:** Ant Design
*   **Package Manager:** Yarn
*   **Containerization:** Docker
*   **Production Web Server:** Nginx

---

## Project Setup & Development

These steps assume you have a server environment with Node.js v20, Yarn, and Docker installed. (See [Appendix](#appendix-full-server-setup) for first-time server setup).

### 1. Clone the Repository & Install Dependencies

```bash
# Clone this repository to your machine
git clone <your-github-repo-url>
cd pokemon-app

# Install all project dependencies
yarn install
2. Run the Development Server
This command starts the local development server.
code
Bash
# The HOST=0.0.0.0 flag is required to access the server from a public IP
HOST=0.0.0.0 PORT=3000 yarn start
The application will be accessible at http://<your-server-ip>:3000.
Note: Ensure your server's firewall (e.g., AWS Security Group) has an inbound rule allowing TCP traffic on port 3000.
Building and Running for Production
The application is containerized for a consistent and reliable production deployment.
1. Build the Docker Image
From the project's root directory (pokemon-app), run the following command:
code
Bash
# This builds the image using the instructions in the Dockerfile
docker build -t pokemon-app:latest .
2. Run the Docker Container
This command will start the container and make the application accessible on port 80.
code
Bash
# Run the container in detached mode (-d) and map host port 80 to the container's port 80 (-p 80:80)
docker run -d -p 80:80 --name pokemon-app pokemon-app:latest
The application will be accessible at http://<your-server-ip>.
Note: Ensure your server's firewall (e.g., AWS Security Group) has an inbound rule allowing TCP traffic on port 80.
Appendix: Full Server Setup
These are the one-time steps to prepare a fresh Ubuntu 24.04 server (e.g., AWS EC2) from scratch.
Step A: Update & Install Essentials
code
Bash
sudo apt update -y
sudo apt upgrade -y
sudo apt install -y git curl build-essential wget unzip
Step B: Install Node.js v20 & Yarn
code
Bash
# Add NodeSource repository for Node.js v20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Yarn using npm
sudo npm install -g yarn

# Verify installations
node -v  # Should be v20.x.x
yarn -v
Step C: Install Docker Engine & Docker Compose
code
Bash
# Follow the official Docker installation guide for the latest and most secure method.
# A quick setup for Ubuntu is provided below:
sudo apt install -y docker.io docker-compose-plugin
sudo systemctl enable --now docker

# Add your user to the docker group to run commands without sudo
sudo usermod -aG docker $USER
newgrp docker # This applies the new group membership to your current shell
