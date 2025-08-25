# ---- Stage 1: Build the React Application ----
# Use an official Node.js runtime as the base image for the build stage.
# We specify version 20 to match our development environment.
FROM node:20-alpine AS build

# Set the working directory inside the container.
WORKDIR /app

# Copy package.json and yarn.lock to leverage Docker layer caching.
# This step will only be re-run if these files change.
COPY package.json yarn.lock ./

# Install project dependencies using Yarn.
RUN yarn install --frozen-lockfile

# Copy the rest of the application source code into the container.
COPY . .

# Build the app for production. The output will be in the /app/build directory.
RUN yarn build


# ---- Stage 2: Serve the Application with Nginx ----
# Use a lightweight Nginx image for the production stage.
FROM nginx:1.25-alpine

# Copy the static build output from the 'build' stage to Nginx's web server directory.
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to allow traffic to the web server.
EXPOSE 80

# The default Nginx command will start the server and serve the files.
# No need to specify a CMD unless you need to override the default.
