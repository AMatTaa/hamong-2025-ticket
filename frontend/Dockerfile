# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Add yarn specific files
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 