# Dockerfile
FROM node:18

# Crear el directorio de la aplicación
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN yarn install

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["sh", "-c", "yarn run migrate && yarn run seed && yarn run build && node dist/server.js"]