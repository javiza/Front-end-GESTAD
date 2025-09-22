# Etapa 1: build con Node
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa 2: servir con Nginx
FROM nginx:alpine
# Copiar build de Angular
COPY --from=builder /app/www /usr/share/nginx/html
# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
