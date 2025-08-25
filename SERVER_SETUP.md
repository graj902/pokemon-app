# Appendix: Full Server Setup Guide

This guide provides the detailed, one-time commands to prepare a fresh **Ubuntu 24.04** server (such as an AWS EC2 instance) from scratch to be able to run this project.

## Part A: Server Preparation

### Step 1: Connect to Your EC2 Instance
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
We use a specific Node.js version for consistency.
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
sudo usermod -aG docker $USER

# IMPORTANT: You must log out and log back in for this group change to take full effect.
# Alternatively, run 'newgrp docker' to apply it to your current session only.
newgrp docker

# Verify the Docker installation
docker --version
docker compose version
Your server is now fully prepared to clone and run the application.
