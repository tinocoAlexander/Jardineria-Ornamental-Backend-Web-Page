# Base image
FROM node:20

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el package.json y package-lock.json para instalar dependencias
COPY services/package*.json ./

# Instalamos dependencias (incluye @prisma/client, dotenv, axios, express-validator, etc.)
RUN npm install

# Copiamos únicamente el schema desde la carpeta prisma de la raíz
COPY prisma/schema.prisma ./prisma/schema.prisma

# Copiamos el resto del código de services
COPY services/. .

# Generamos el cliente de Prisma
RUN npx prisma generate --schema=./prisma/schema.prisma

# Exponemos el puerto que usa el servicio de services
EXPOSE 3001

# Comando para arrancar en modo desarrollo
CMD ["npm", "run", "dev"]
