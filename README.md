📊 Sistema de Gestión de Empleados y Departamentos
Este proyecto es una aplicación web full stack desarrollada con Angular (frontend), Node.js + Express (backend) y MongoDB (base de datos). Permite gestionar empleados y departamentos, incluyendo operaciones CRUD y autenticación JWT.

🚀 Tecnologías Utilizadas
🖥️ Frontend
Angular 17+

Angular Standalone Components

Angular Router

HTML + CSS 

🔙 Backend
Node.js

Express.js

Mongoose

JWT para autenticación

Dotenv

🗄️ Base de Datos
MongoDB Atlas o Local

📁 Estructura del Proyecto

apiEmpleados/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/
│   │   │   │   ├── employees/
│   │   │   │   ├── departments/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   └── guards/
│   │   │   └── services/
│   │   └── navbar/
│   └── angular.json
└── README.md
⚙️ Requisitos Previos
Node.js y npm

Angular CLI (npm install -g @angular/cli)

MongoDB (local o Atlas)

Git

🧪 Instalación
1️⃣ Clonar el repositorio

git clone https://github.com/ZeltGG/apiEmpleados.git
cd apiEmpleados

2️⃣ Configurar el backend

cd backend
npm install
Crear el archivo .env con las variables:

PORT=4000
MONGO_URI=TU_URI_DE_MONGODB
JWT_SECRET=unaClaveSegura

3️⃣ Ejecutar el backend

npm run dev

4️⃣ Configurar el frontend

cd ../frontend
npm install

5️⃣ Ejecutar el frontend

ng serve
🔐 Autenticación
El sistema utiliza JWT para proteger rutas. Los usuarios deben registrarse e iniciar sesión para acceder al sistema.

El token se guarda en localStorage.

Las rutas están protegidas con un AuthGuard.

El navbar se oculta automáticamente en las páginas no autenticadas.

🧑‍💼 Funcionalidades
Empleados
✅ Crear empleado

✅ Listar empleados

✅ Editar empleado

✅ Eliminar empleado

✅ Asociación con departamento

Departamentos
✅ Crear departamento

✅ Listar departamentos

✅ Editar departamento

✅ Eliminar departamento

✨ Diseño
Diseño moderno y empresarial (tipo Google Admin)

Responsive y minimalista

Interfaz clara y profesional

📌 Notas Finales
✅ CRUD completo implementado en ambas colecciones

✅ Autenticación segura con JWT

✅ Rutas protegidas

✅ Navbar dinámico según estado de sesión

✅ Buenas prácticas aplicadas

🧠 Autor
Desarrollado por Jairo Urbina(ZeltDev) 💼