# 🍽️ MatchFood

## 🧩 Descripción General

**MatchFood** es una aplicación web desarrollada en **Angular** que busca conectar restaurantes pequeños, medianos y cocinas ocultas con personas interesadas en descubrir nuevas experiencias gastronómicas cercanas.

La aplicación utiliza el **GPS del usuario** para mostrar los restaurantes más próximos, brindando información sobre:

- 📍 Su ubicación y tipo de cocina  
- 🍴 Los platos o servicios que ofrecen  
- ⭐ Posibilidad de calificar y comentar experiencias, simulando publicaciones de red social  
- 💬 Interacción entre usuarios mediante discusiones basadas en reseñas  
- 📅 Reserva de mesas directamente desde la plataforma  

En resumen, **MatchFood** combina geolocalización, interacción social y experiencia gastronómica en un solo entorno digital.

---

## 👨‍💻 Autores

| Nombre | Rol en el equipo |
|:--------|:-----------------|
| **Evelyn Becerra** | Diseño UI/UX y experiencia de usuario |
| **Juan Mora** | Desarrollo frontend e integración inicial |
| **Sergio Polo** | Estructuración del proyecto, configuración inicial y soporte técnico |

---

## ⚙️ Requisitos Previos

Para ejecutar correctamente el frontend de **MatchFood**, asegúrate de contar con las siguientes herramientas instaladas en tu entorno:

- **Node.js** — versión **18.x** o superior  
- **Angular CLI** — versión **17.x** o superior  
- **npm** — gestor de paquetes incluido con Node.js  
- **Git** *(opcional, para clonar el repositorio)*  

**Dependencias adicionales del proyecto:**

- **Bootstrap** — para diseño y estilos responsivos  
- **Bootstrap Icons** — para iconografía ligera y moderna  
- **jwt-decode** — para el manejo del token de autenticación

Verifica tus versiones ejecutando:

```bash
node -v
npm -v
ng version
```

---

## 🚀 Instrucciones de Instalación y Ejecución

Sigue los siguientes pasos para instalar y ejecutar el proyecto en tu entorno local:

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/SergioePolo/MatchFood-Frontend.git
cd Matchfood-Frontend
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Ejecutar el servidor de desarrollo

```bash
ng serve
```

Luego, abre tu navegador y visita:

👉 [http://localhost:4200/](http://localhost:4200/)

Cada cambio realizado en el código se recargará automáticamente en el navegador.

---

## ⚠️ Compilación para Producción

El proyecto se encuentra en una etapa inicial, por lo que **no se recomienda compilarlo para producción aún**.  
En caso de requerirlo, ejecuta:

```bash
ng build --configuration production
```

Los archivos compilados se generarán en la carpeta **`dist/`**.

---

## 🏗️ Estado del Proyecto

### 📦 Estado actual
El proyecto se encuentra en la etapa de desarrollo, donde se tiene un diseño parcial de todas las interfaces del sistema con su respectiva navegación e interacciones, se creo la funcionalidad de autenticación y seguridad mediante guards e interceptors para evitar el acceso a rutas sin autenticación y/o permisos específicos.
Esta versión corresponde únicamente al **frontend de MatchFood**.

### 🔧 En este momento se está trabajando en:
- La estructuración inicial del proyecto Angular  
- La implementación de los primeros componentes y rutas  
- La configuración visual y responsiva mediante Bootstrap  

---

## 🧩 Diseños del Aplicativo

A continuación se presentan las vistas diseñadas en Figma:

| Pantalla | Vista |
|:----------|:------|
| Bienvenida | <img src="./designs/Navegador - Bienvenida.png" alt="Diseño del navegador Página de Bienvenida" width="400"> |
| Registro de usuarios | <img src="./designs/Navegador - Registros de usuarios.png" alt="Diseño del navegador Registro de usuarios" width="400"> |
| Registro de restaurantes | <img src="./designs/Navegador - Registro de restaurantes.png" alt="Diseño del navegador Registro de restaurantes" width="400"> |
| Inicio de sesión | <img src="./designs/Navegador - Inicio de Sesion.png" alt="Diseño del navegador Inicio de sesión" width="400"> |
| Inicio / Home | <img src="./designs/Navegador - Incio.png" alt="Diseño del navegador Inicio/Home" width="400"> |
| Reservar mesa | <img src="./designs/Navegador - Reservar mesa.png" alt="Diseño del navegador Reserva mesa" width="400"> |
| Calificar restaurante | <img src="./designs/Navegador - Calificar el restaurante.png" alt="Diseño del navegador Califica tu experiencia" width="400"> |
| Perfil de usuario | <img src="./designs/Navegador - Perfil de Usuario.png" alt="Diseño del navegador Perfil de usuario" width="400"> |
| Perfil del restaurante (1) | <img src="./designs/Navegador - Perfil del Restaurante - 1.png" alt="Diseño del navegador Perfil de restaurante parte 1" width="400"> |
| Perfil del restaurante (2) | <img src="./designs/Navegador - Perfil del Restaurante - 2.png" alt="Diseño del navegador Perfil de restaurante parte 2" width="400"> |
| Página 404 | <img src="./designs/Navegador - 404 Not Found.png" alt="Diseño del navegador 404" width="400"> |
| Nosotros | <img src="./designs/Navegador - Nosotros.png" alt="Diseño del navegador Acerca de nosotros" width="400"> |

🔗 **Enlace de acceso a los diseños:**  
[Figma – Diseño MatchFood](https://www.figma.com/design/cKHIBYMmdzpSCmsU6GXPZH/Dise%C3%B1o-MatchFood?node-id=0-1&t=OwKWzLrAoVhpQNhw-1)

---

## 🚧 Próximas Fases

- Integración con el backend para manejo de datos reales  
- Implementación del sistema de autenticación y reservas  
- Conexión de las funcionalidades de interacción social  

---

## 🧭 Licencia

Este proyecto es de **uso educativo** y de **desarrollo colaborativo**.  
📄 Licencia pendiente de definir según la fase del proyecto.

---
