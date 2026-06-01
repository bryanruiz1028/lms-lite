# 🎓 LMS Lite - Plataforma EdTech Gamificada

<p align="center">
  <img src="https://img.shields.io/badge/Stack-React.js-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React.js">
  <img src="https://img.shields.io/badge/UI-NextUI-000000?style=for-the-badge&logo=nextui&logoColor=white" alt="NextUI">
  <img src="https://img.shields.io/badge/CSS-Tailwind--CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/Animations-Framer--Motion-F24E1E?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion">
  <img src="https://img.shields.io/badge/Database-LocalStorage-yellow?style=for-the-badge&logo=data" alt="LocalStorage">
</p>

LMS Lite es una aplicación web interactiva **Single Page Application (SPA)** de aprendizaje electrónico que fusiona la **Pedagogía en Entornos Digitales** con **Mecánicas Avanzadas de Gamificación** y un **Dashboard de Creador con Learning Analytics**. 

Diseñada con una estética moderna de tipo **Glassmorphic** (efectos de cristal degradados sobre fondos espaciales), la plataforma ofrece dos flujos de experiencia completamente integrados y reactivos en tiempo real con persistencia en el navegador.

---

## 🚀 Características Clave

### 🧑‍🎓 1. Experiencia del Estudiante (Gamificada)
*   **Vitrina de XP y Niveles:** Barra de progreso interactiva en el Navbar que calcula subidas de nivel de forma incremental (Nivel 1 = 1000 XP, Nivel 2 = 2000 XP, etc.). Completar lecciones suma **+50 XP**.
*   **Gabinete de Insignias (Badges):** Panel central con medallas bloqueadas/desbloqueadas. Al aprobar las evaluaciones, se inyectan dinámicamente las medallas correspondientes en el perfil del alumno con iluminación HSL.
*   **Aula Virtual Multimedial:** 
    *   Lista de reproducción responsiva del syllabus.
    *   Simulador de reproductor de video de alta calidad.
    *   Notas pedagógicas de soporte conceptual.
    *   **Foro de Preguntas y Respuestas:** Chat dinámico donde los estudiantes publican dudas en tiempo real y reciben retroalimentación simulada de profesores calificados.

### ✍️ 2. Sistema de Exámenes e Interactividad
*   **Evaluaciones de Selección Múltiple:** Cuestionarios interactivos correspondientes a cada curso que exigen un **80% o más de aciertos** para aprobar.
*   **canvas-confetti Celebrations:** Sistema de animación física que dispara serpentinas y confeti de colores desde múltiples ángulos de la pantalla al aprobar con éxito.

### 👩‍🏫 3. Modo Administrador / Profesor (Learning Analytics)
*   **Creador de Cursos Dinámico:** Formulario completo para estructurar nuevos cursos desde cero. Permite definir título, descripción, categoría, nivel de dificultad, nombre del logro de la medalla con sus colores/iconos correspondientes, y adjuntar múltiples lecciones con sus notas de estudio y URLs de video, además de estructurar sus cuestionarios evaluativos.
*   **Analíticas de Aprendizaje (Learning Analytics) en tiempo real:**
    *   Monitores visuales rápidos de Alumnos Totales, Tasa de Finalización Escolar, Calificaciones Promedio e Inscritos por Curso en tiempo real.
    *   Panel de seguimiento individual de progreso estudiantil, que detalla la tasa porcentual de avance y calificación final obtenida.

---

## 🛠️ Stack Tecnológico Utilizado
*   **Core:** React.js (JavaScript - ES6+) y Vite.js como entorno de construcción ultrarrápido.
*   **Estilos y Componentes:** NextUI v2.x como framework de interfaz premium y Tailwind CSS v3.x para inyección y personalización de temas oscuros (HSL).
*   **Animaciones:** Framer Motion para micro-interacciones suaves de cards y botones.
*   **Iconografía:** Lucide React para gráficos vectoriales responsivos.
*   **Efectos visuales:** canvas-confetti.
*   **Base de Datos / Persistencia:** `LocalStorage` del navegador web (formato JSON persistente).

---

## 💻 Instalación y Ejecución Local

Sigue estos pasos sencillos para clonar y ejecutar la aplicación en tu entorno local:

### 1. Clonar el repositorio
```bash
git clone https://github.com/bryanruiz1028/lms-lite.git
cd lms-lite
```

### 2. Instalar las dependencias
```bash
npm install
```

### 3. Ejecutar el servidor de desarrollo
```bash
npm run dev
```
Abre tu navegador e ingresa a: **`http://localhost:5173/`**

### 4. Construir para producción (Build)
```bash
npm run build
```

---

## 📁 Estructura del Código

```text
lms-lite/
├── src/
│   ├── assets/             # Recursos estáticos y estilos globales
│   ├── components/         # Componentes modulares y reutilizables de UI
│   │   ├── Navbar.jsx          # Barra de navegación con barra de XP y perfil
│   │   ├── CourseCard.jsx      # Tarjetas interactivas con estados de progreso
│   │   ├── LearningBoard.jsx   # Tablero de reproducción, notas y foro de chat
│   │   ├── ExamModule.jsx      # Evaluación interactiva con confetti
│   │   ├── AdminDashboard.jsx  # Formulario creador y analíticas escolares
│   │   └── ProfileBadge.jsx    # Componente visual para las medallas HSL
│   ├── data/
│   │   └── coursesInitial.js   # Syllabus semilla (React, Gamificación, DB)
│   ├── App.jsx             # Punto de entrada principal y orquestación de estados
│   ├── index.css           # Configuración base de Outfit y Glassmorphic
│   └── main.jsx            # Inicialización de React y cargador de NextUIProvider
├── tailwind.config.js      # Declaración de contenidos y temas NextUI
├── vite.config.js          # Configuración del bundler Vite
└── package.json            # Declaración de dependencias del proyecto
```

---

## 🎓 Conexión Profesional (Pedagogía e Informática)

Este proyecto representa una aplicación directa de mi perfil profesional híbrido. Incorpora fundamentos didácticos de retención estudiantil mediante **recompensas inmediatas** (XP e insignias), simulando las prácticas aplicadas en el diseño instructivo de entornos e-learning modernos, implementando herramientas ágiles de seguimiento docente para el ajuste curricular oportuno.
