# Minimal Dockerfile to serve a static site using nginx
FROM nginx:stable-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy site files into nginx html directory
COPY . /usr/share/nginx/html

# Expose http
EXPOSE 80

# Use the default nginx foreground command
CMD ["nginx", "-g", "daemon off;"]
