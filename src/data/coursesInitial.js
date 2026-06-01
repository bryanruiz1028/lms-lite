export const coursesInitial = [
  {
    id: "react-basics",
    title: "Desarrollo Frontend con React.js",
    description: "Aprende a construir interfaces web dinámicas y responsivas estructurando componentes eficientes en React.",
    difficulty: "Principiante",
    category: "Desarrollo Web",
    badge: {
      name: "React Master",
      color: "primary",
      icon: "Atom"
    },
    lessons: [
      {
        id: "r1",
        title: "1. Introducción a React y Componentes",
        duration: "10 mins",
        videoUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8", // React intro standard video
        content: "React es una biblioteca de JavaScript declarativa, eficiente y flexible para construir interfaces de usuario. Permite componer UIs complejas a partir de pequeñas piezas aisladas de código llamadas 'componentes'."
      },
      {
        id: "r2",
        title: "2. Manejo de Estados con useState",
        duration: "15 mins",
        videoUrl: "https://www.youtube.com/embed/O_9u1P58jQM",
        content: "El hook useState permite a los componentes funcionales de React tener estado local de forma reactiva. Se declara una variable de estado y una función setter para modificarla."
      },
      {
        id: "r3",
        title: "3. Componentización de Listas de Tareas",
        duration: "12 mins",
        videoUrl: "https://www.youtube.com/embed/y51V58a69zM",
        content: "Aprende a mapear arreglos a componentes reutilizables, utilizando llaves únicas ('keys') y pasando funciones a través de props para el control interactivo."
      }
    ],
    exam: [
      {
        id: "re1",
        question: "¿Qué hook se utiliza para declarar variables de estado en componentes funcionales de React?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: 1
      },
      {
        id: "re2",
        question: "¿Cuál es la función principal de las 'keys' al renderizar listas en React?",
        options: [
          "Identificar qué elementos han cambiado, agregado o eliminado en el DOM virtual.",
          "Definir el color del componente en pantalla.",
          "Evitar que se importen librerías secundarias.",
          "Conectar los componentes con la base de datos externa."
        ],
        correctAnswer: 0
      },
      {
        id: "re3",
        question: "¿Cómo se pasan datos de un componente padre a un componente hijo en React?",
        options: ["Mediante bases de datos locales", "A través de Props", "Usando archivos CSS", "Mediante rutas Express"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "gamificacion-digital",
    title: "Gamificación en Entornos Digitales",
    description: "Diseña dinámicas de juego aplicadas en plataformas e-learning para motivar y retener a tus estudiantes.",
    difficulty: "Intermedio",
    category: "Pedagogía Digital",
    badge: {
      name: "EdTech Leader",
      color: "secondary",
      icon: "Trophy"
    },
    lessons: [
      {
        id: "g1",
        title: "1. ¿Qué es la Gamificación Educativa?",
        duration: "12 mins",
        videoUrl: "https://www.youtube.com/embed/5cQfW_s6R1A",
        content: "La gamificación consiste en aplicar dinámicas, mecánicas y componentes propios del diseño de juegos en contextos no lúdicos (como el aula o plataformas e-learning) con el fin de potenciar la motivación intrínseca."
      },
      {
        id: "g2",
        title: "2. Componentes de Juego: XP, Niveles e Insignias",
        duration: "18 mins",
        videoUrl: "https://www.youtube.com/embed/a75jSgq8P-E",
        content: "El ciclo de retroalimentación inmediata se consolida mediante el uso de Puntos de Experiencia (XP), niveles incrementales y la entrega de Insignias Virtuales (Badges) como reconocimiento de hitos."
      },
      {
        id: "g3",
        title: "3. Analítica del Aprendizaje y Gamificación",
        duration: "15 mins",
        videoUrl: "https://www.youtube.com/embed/sPzP4-Y8KjU",
        content: "La recopilación de datos permite medir el impacto de las dinámicas en la retención escolar. Un panel de analítica ayuda a ajustar la dificultad y ritmo de las actividades."
      }
    ],
    exam: [
      {
        id: "ge1",
        question: "¿Cuál es el objetivo principal de la Gamificación en entornos virtuales de aprendizaje?",
        options: [
          "Convertir las clases en videojuegos comerciales sin contenido educativo.",
          "Fomentar la motivación y el compromiso de los estudiantes mediante elementos de juego.",
          "Aumentar el número de horas que el docente pasa en la plataforma escolar.",
          "Eliminar las calificaciones cuantitativas del sistema."
        ],
        correctAnswer: 1
      },
      {
        id: "ge2",
        question: "¿Qué elemento representa el reconocimiento y validación visual de un logro en la gamificación?",
        options: ["El tiempo de conexión", "Los foros de discusión", "Las Insignias Virtuales (Badges)", "Las guías en PDF"],
        correctAnswer: 2
      },
      {
        id: "ge3",
        question: "¿Qué evalúa la Analítica del Aprendizaje (Learning Analytics) en entornos interactivos?",
        options: [
          "El rendimiento y patrones de interacción de los alumnos con las lecciones y cuestionarios.",
          "La velocidad del procesador del computador del alumno.",
          "La calidad de los videos alojados en YouTube.",
          "El costo del licenciamiento de la plataforma Moodle."
        ],
        correctAnswer: 0
      }
    ]
  },
  {
    id: "bases-de-datos",
    title: "Bases de Datos SQL & NoSQL para Educadores",
    description: "Comprende el modelado relacional y no relacional para registrar calificaciones y progreso académico de forma masiva.",
    difficulty: "Avanzado",
    category: "Bases de Datos",
    badge: {
      name: "Data Architect",
      color: "warning",
      icon: "Database"
    },
    lessons: [
      {
        id: "d1",
        title: "1. Modelado de Datos Relacionales (SQL)",
        duration: "15 mins",
        videoUrl: "https://www.youtube.com/embed/z52Xl-3mUv0",
        content: "Las bases de datos SQL organizan la información en tablas estructuradas con filas y columnas conectadas por llaves primarias y foráneas, ideales para mantener registros estrictos como notas escolares y asistencias."
      },
      {
        id: "d2",
        title: "2. Bases de Datos Flexibles (NoSQL/MongoDB)",
        duration: "15 mins",
        videoUrl: "https://www.youtube.com/embed/EE8A4Vf77XQ",
        content: "NoSQL organiza la información en formatos flexibles tipo documento JSON (como MongoDB). Permite guardar progresos de estudiantes muy variables o foros de discusión de forma más ágil."
      },
      {
        id: "d3",
        title: "3. Persistencia de Datos Locales en el Navegador",
        duration: "10 mins",
        videoUrl: "https://www.youtube.com/embed/5aT0G_D-xZk",
        content: "LocalStorage permite almacenar pares clave-valor de forma persistente y local en el navegador del usuario en formato string, permitiendo simular una base de datos sin requerir un servidor."
      }
    ],
    exam: [
      {
        id: "de1",
        question: "¿Qué tipo de base de datos es ideal para esquemas de datos estructurados con relaciones estrictas como calificaciones escolares?",
        options: ["Base de datos SQL (Relacional)", "Base de datos NoSQL basada en grafos", "LocalStorage sin cifrado", "Moodle API local"],
        correctAnswer: 0
      },
      {
        id: "de2",
        question: "¿En qué formato almacena la información MongoDB (NoSQL)?",
        options: ["Tablas y columnas estáticas", "Archivos de texto plano CSV", "Documentos similares a JSON", "Código binario C++ compilado"],
        correctAnswer: 2
      },
      {
        id: "de3",
        question: "¿Cuál es una limitación principal de LocalStorage en navegadores web?",
        options: [
          "No permite guardar cadenas de texto.",
          "Solo funciona en sistemas operativos Linux.",
          "Almacena la información de forma local en el navegador y tiene un límite aproximado de 5MB.",
          "Requiere conexión directa y permanente a PostgreSQL en la nube."
        ],
        correctAnswer: 2
      }
    ]
  }
];
