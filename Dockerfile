# Etapa 1: Build con Node
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar archivos de package y node_modules
COPY package*.json ./
RUN npm install

# Copiar todo el código fuente
COPY . .

# Build de producción con environment.prod.ts
RUN npm run build -- --configuration production

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiar build de Angular al directorio de Nginx
COPY --from=builder /app/dist/roperia /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
