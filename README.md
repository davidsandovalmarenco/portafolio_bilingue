# Portafolio Bilingüe — React + Laravel

Aplicación web Full Stack desarrollada como proyecto académico para la asignatura **Electiva PPF II**.

El sistema permite registrar y administrar proyectos de portafolio con información en español e inglés, utilizando una arquitectura separada entre frontend y backend.

## Tecnologías utilizadas

### Frontend
- React
- Vite
- JavaScript
- Fetch API
- CSS

### Backend
- Laravel 12
- PHP
- Eloquent ORM
- API REST

### Base de datos
- MySQL

### Entorno de desarrollo
- Laragon
- Visual Studio Code
- Git / GitHub

## Arquitectura

La aplicación está dividida en dos proyectos independientes:

```text
portafolio-bilingue/
├── backend/     # Laravel + API REST
└── frontend/    # React + Vite
```

El flujo de datos es:

```text
React
   ↓ HTTP / JSON
Laravel REST API
   ↓ Eloquent ORM
MySQL
```

## Funcionalidades

- Registro de proyectos.
- Listado de proyectos almacenados.
- Eliminación de proyectos.
- Información bilingüe español / inglés.
- Persistencia de datos en MySQL.
- Validaciones desde Laravel.
- Comunicación asíncrona entre React y Laravel.
- Clasificación de proyectos por categoría.
- Estado del proyecto:
  - En desarrollo
  - Finalizado
  - Publicado

## Campos de cada proyecto

Cada proyecto contiene:

- Título en español.
- Título en inglés.
- Descripción en español.
- Descripción en inglés.
- URL del proyecto.
- Imagen opcional.
- Categoría.
- Estado.

## API REST

Laravel expone los siguientes endpoints:

| Método | Endpoint | Acción |
|---|---|---|
| GET | `/api/prueba` | Comprobar funcionamiento de la API |
| GET | `/api/projects` | Listar proyectos |
| POST | `/api/projects` | Crear proyecto |
| GET | `/api/projects/{id}` | Obtener proyecto |
| PUT/PATCH | `/api/projects/{id}` | Actualizar proyecto |
| DELETE | `/api/projects/{id}` | Eliminar proyecto |

## Requisitos

- PHP 8.2 o superior.
- Composer.
- Node.js 20.19+ o 22.12+.
- npm.
- MySQL o MariaDB.

## Instalación

### 1. Backend Laravel

Entrar a la carpeta:

```bash
cd backend
```

Instalar las dependencias:

```bash
composer install
```

Crear el archivo de configuración:

```bash
copy .env.example .env
```

Generar la clave de Laravel:

```bash
php artisan key:generate
```

Crear una base de datos llamada:

```text
portafolio_bilingue
```

Configurar la conexión dentro de `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=portafolio_bilingue
DB_USERNAME=root
DB_PASSWORD=
```

Ejecutar las migraciones:

```bash
php artisan migrate
```

Iniciar Laravel:

```bash
php artisan serve --host=127.0.0.1 --port=8000
```

La API estará disponible en:

```text
http://127.0.0.1:8000
```

### 2. Frontend React

Abrir otra terminal y entrar a:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

Crear el archivo `.env` a partir de `.env.example`:

```bash
copy .env.example .env
```

La configuración debe contener:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Iniciar Vite:

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173
```

## Ejecución del proyecto

Para que el sistema funcione deben mantenerse activos:

1. MySQL/MariaDB.
2. Laravel.
3. Vite.

```text
MySQL            → 127.0.0.1:3306
Laravel API      → 127.0.0.1:8000
React / Vite     → localhost:5173
```

## Seguridad

Los archivos `.env` no forman parte del repositorio.

Las configuraciones necesarias se proporcionan mediante:

```text
backend/.env.example
frontend/.env.example
```

Las carpetas de dependencias tampoco se almacenan en Git:

```text
backend/vendor/
frontend/node_modules/
```

Estas pueden reconstruirse mediante:

```bash
composer install
npm install
```

## Autor

Proyecto académico — Electiva PPF II

## Estado del proyecto

✅ Backend Laravel funcional  
✅ API REST funcional  
✅ React conectado con Laravel  
✅ Persistencia MySQL  
✅ CRUD implementado  
✅ Portafolio bilingüe  
✅ Categoría y estado de proyectos