# SPECIFY BASE IMAGE
FROM node:alpine as builder
WORKDIR /usr/react-client

# Dependencies
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

# Default command
# CMD ["npm", "run", "build"]

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
