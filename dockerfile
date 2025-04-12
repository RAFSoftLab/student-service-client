# Prva faza: Build Angular (ili neki drugi Node frontend) aplikacije

# Koristi mali Node 20 image za build fazu (Alpine = lightweight)
FROM node:20-alpine AS build  
# Postavlja radni direktorijum unutar kontejnera
WORKDIR /app                  

# Kopira package.json i package-lock.json za brži caching
COPY package*.json ./   
# Instalira sve dependencije      
RUN npm install               

# Kopira ostatak source koda u radni direktorijum
COPY . .     
# Pokreće build aplikacije (tipično kreira /dist folder)                 
RUN npm run build             

# Druga faza: Serve aplikaciju preko NGINX-a

 # Mali i brzi NGINX image za serve-ovanje statičkog sadržaja
FROM nginx:alpine 

# Kopira izgradjeni frontend (iz prethodne faze) u NGINX root folder
COPY --from=build /app/dist/student-service-client /usr/share/nginx/html

# Otvara port 80 (NGINX standardni HTTP port)
EXPOSE 80  

# Pokreće NGINX u foreground režimu (da ne bi kontejner odmah izašao)
CMD ["nginx", "-g", "daemon off;"]