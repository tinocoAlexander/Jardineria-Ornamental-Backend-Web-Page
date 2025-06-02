# Base image
FROM node:20

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el package.json y package-lock.json para instalar dependencias
COPY security/package*.json ./

# Instalamos dependencias (incluye @prisma/client, dotenv, etc.)
RUN npm install

# Copiamos únicamente el schema desde la carpeta prisma de la raíz
COPY prisma/schema.prisma ./prisma/schema.prisma

# Copiamos el resto del código de seguridad
COPY security/. .

# Generamos el cliente de Prisma
RUN npx prisma generate --schema=./prisma/schema.prisma

# Exponemos el puerto que usa el servicio de security
EXPOSE 3002

# Comando para arrancar en modo desarrollo
CMD ["npm", "run", "dev"]
