# 1) Construcción del frontend
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# 2) Servidor web (Nginx)
FROM nginx:alpine

# Copiamos la salida del build Angular
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copiamos el archivo de configuración por defecto
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
