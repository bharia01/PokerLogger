# Stage 1
FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
