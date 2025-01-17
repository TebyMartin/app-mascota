# Gestión Veterinaria 🐶 🐈
---
La API permitirá gestionar clientes y sus respectivas mascotas, aplicando la lógica básica de CRUD para cada una sola entidad y un filtro por cliente para las mascotas.



## Características
---
1. Registro e inicio de sesión con autenticación JWT
2. CRUD de mascotas: crear, consultar actualizar y eliminar informacion de alguna mascota. También filtra mascotas por cliente
3. CRUD de clientes: crear, consultar actualizar y eliminar informacion de algun cliente.
4. Se integró Passport.js  para gestionar la autenticación de manera eficaz, Al ser un middleware autenticación de Node.js extremadamente flexible,  permitió la implementación de estrategias de autenticación personalizadas.
5. El enfoque combinado de Node.js y Express, bcrypt, JWT y Passport permitió construir una API potente y segura.



## Tecnologias 
---
1. Express.js
2. Node.js
3. MongoDB: Base de datos no relacional, local o en la nube.
4. Dependencias: bcrypt, JWT, Passport, 

=

# Pasos para usar este proyecto 

1. Clonar el repositorio ``` https://github.com/TebyMartin/app-mascota.git ```

2. Instalar las dependencias ```npm install```
3. Ejecutar el servidor ``` npm run dev```. 
4. Crearse un usuario (descripción mas adelante)
5. Iniciar sesión
6. Usar el token del inicio de sesión para probar los diferentes endpoints
7. Tambien puede usarse el link desplegado en Vercel para probar los endpoints https://app-mascota.vercel.app/



## Estructura del Proyecto

```plaintext
APP-MASCOTA/
├── config/         # Configuración de la aplicación
│   ├── (archivos de configuración, como la conexión a la base de datos)
├── helpers/        # Funciones auxiliares o utilidades
│   ├── (archivos con funciones reutilizables, como validaciones)
├── middleware/     # Middlewares personalizados
│   ├── (archivos para gestionar peticiones y respuestas)
├── model/          # Modelos de datos
│   ├── (esquemas y modelos de MongoDB)
├── routes/         # Rutas de la API
│   ├── (definición de rutas para diferentes entidades)
├── node_modules/   # Dependencias instaladas por npm
├── .env            # Variables de entorno
├── app.js          # Punto de entrada principal de la aplicación
├── package.json    # Configuración del proyecto y dependencias
├── package-lock.json  # Bloqueo de dependencias para mantener consistencia
└── README.md       # Documentación del proyecto 
```






## Endpoints principales 
---
Usuario:
---

| Método   | Endpoints    | Descripción                         |
|----------|--------------|-------------------------------------|
| POST     | `/registro`  | Realizar un registro                |
| POST     | `/login`     | Iniciar sesión                      |

====

Ejemplo de uso 
---

Registro: 
---

```json
{
  "username":"nicolas",
  "email":"sogtelo@gmail.com",
  "password":"123456789"
}
```

Login:
---

```json
{
  "username":"nicolas",
  "password":"123456789"
}
```

Cliente:
---
| Método   | Endpoints    | Descripción                         |
|----------|--------------|-------------------------------------|
| GET      | `/cliente`   | Obtiene todos los clientes.         |
| GET      | `/cliente/:id`| Obtiene un cliente por su ID.       |
| POST     | `/cliente`    | Crea un nuevo cliente.              |
| PUT      | `/cliente/:id`| Actualiza los datos de un cliente.  |
| DELETE   | `/cliente/:id`| Elimina un cliente por su ID.       |



Ejemplo de uso 
---

Crear un Cliente
---

```json
{
  "nombre": "Marcoos",
  "telefono":"652828",
  "email": "marcos@gmail.com"
  
}
```


Mascota:
---

| Método   | Endpoints      | Descripción                         |
|----------|----------------|-------------------------------------|
| GET      | `/mascota`     | Obtiene todos los mascotas.         |
| GET      | `/mascota/busqueda`| Filtra mascotas por cliente.          |
| POST     | `/mascota`     | Crea un nuevo mascota.              |
| PUT      | `/mascota/:id` | Actualiza los datos de un mascota.  |
| DELETE   | `/mascota/:id` | Elimina un mascota por su ID.       |



Ejemplo de uso 
---

Crear una mascota: 
---

```json
{
  "nombre": "Penelope",
  "especie":"gato",
  "sintomas": "no no duerme",
  "cliente":"677f0ebf34a8f9e6be51e548"
}
```

Filtrar por cliente: 
---
Query Parameters 
---
parameter: cliente  value:677f0ebf34a8f9e6be51e548


 
## Despliegue en Vercel 
---
Ya está disponible en VERCEL 👉 https://app-mascota.vercel.app/



## Creditos
---

Desarrollado por [Esteban Martin]




