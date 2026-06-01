import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  Input, 
  Textarea, 
  Select, 
  SelectItem, 
  Button, 
  Progress,
  Tabs,
  Tab,
  Chip,
  Avatar
} from "@nextui-org/react";
import { Plus, Trash2, Award, Database, TrendingUp, Users, Award as TrophyIcon, BarChart2 } from 'lucide-react';

export default function AdminDashboard({ onAddCourse, courses }) {
  const [activeTab, setActiveTab] = useState("creator");
  
  // State for Course Form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [badgeName, setBadgeName] = useState("");
  const [badgeColor, setBadgeColor] = useState("primary");
  const [badgeIcon, setBadgeIcon] = useState("Atom");

  // State for dynamic lessons
  const [lessons, setLessons] = useState([
    { title: "1. Introducción al Tema", duration: "10 mins", videoUrl: "https://www.youtube.com/embed/5aT0G_D-xZk", content: "Notas de la lección introductoria..." }
  ]);

  // State for exam questions
  const [exam, setExam] = useState([
    { question: "¿Cuál es el concepto central de este tema?", options: ["Opción A", "Opción B", "Opción C", "Opción D"], correctAnswer: 0 },
    { question: "¿Qué buena práctica se recomienda aplicar?", options: ["Opción A", "Opción B", "Opción C", "Opción D"], correctAnswer: 1 },
    { question: "¿Cuál es el límite o restricción técnica principal?", options: ["Opción A", "Opción B", "Opción C", "Opción D"], correctAnswer: 2 }
  ]);

  // Add/Remove dynamic lessons
  const handleAddLesson = () => {
    setLessons(prev => [
      ...prev,
      { title: `${prev.length + 1}. Nueva Lección`, duration: "10 mins", videoUrl: "", content: "Notas de la lección..." }
    ]);
  };

  const handleRemoveLesson = (index) => {
    if (lessons.length === 1) return;
    setLessons(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleLessonChange = (index, field, value) => {
    setLessons(prev => prev.map((lesson, idx) => 
      idx === index ? { ...lesson, [field]: value } : lesson
    ));
  };

  // Modify exam questions
  const handleExamChange = (index, field, value) => {
    setExam(prev => prev.map((q, idx) => 
      idx === index ? { ...q, [field]: value } : q
    ));
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    setExam(prev => prev.map((q, idx) => {
      if (idx === qIdx) {
        const newOptions = [...q.options];
        newOptions[optIdx] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const handleSaveCourse = () => {
    if (!title || !description || !category || !difficulty || !badgeName) {
      alert("Por favor rellena todos los campos requeridos del curso.");
      return;
    }

    const newCourse = {
      id: `course-${Date.now()}`,
      title,
      description,
      category,
      difficulty,
      badge: {
        name: badgeName,
        color: badgeColor,
        icon: badgeIcon
      },
      lessons: lessons.map((l, idx) => ({
        id: `l-${Date.now()}-${idx}`,
        ...l
      })),
      exam: exam.map((e, idx) => ({
        id: `e-${Date.now()}-${idx}`,
        ...e
      }))
    };

    onAddCourse(newCourse);
    
    // Reset Form
    setTitle("");
    setDescription("");
    setCategory("");
    setDifficulty("");
    setBadgeName("");
    setLessons([{ title: "1. Introducción al Tema", duration: "10 mins", videoUrl: "", content: "Notas de la lección..." }]);
    alert("¡Curso creado y guardado con éxito! Se ha añadido al catálogo del estudiante.");
  };

  // Simulated classroom analytics
  const simulatedStudents = [
    { name: "Juan Pérez", avatar: "https://i.pravatar.cc/150?img=33", progress: 100, score: 100, status: "Aprobado" },
    { name: "María Solís", avatar: "https://i.pravatar.cc/150?img=47", progress: 66, score: 0, status: "Cursando" },
    { name: "Carlos Mendoza", avatar: "https://i.pravatar.cc/150?img=12", progress: 100, score: 66, status: "Reprobado (Reintento)" },
    { name: "Diana Guerrero", avatar: "https://i.pravatar.cc/150?img=28", progress: 33, score: 0, status: "Cursando" }
  ];

  return (
    <div className="flex flex-col gap-6 w-full text-left max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold text-white tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Dashboard del Creador y Analítica
        </h2>
        <Chip color="secondary" variant="flat" className="font-bold">
          Modo Profesor
        </Chip>
      </div>

      <Tabs 
        aria-label="Panel de Administración" 
        selectedKey={activeTab} 
        onSelectionChange={setActiveTab}
        color="secondary" 
        variant="solid"
        className="mb-2"
        classNames={{
          tabList: "glass-panel bg-neutral-900/60 border border-white/5 p-1 rounded-2xl",
          tab: "font-bold text-sm rounded-xl py-5"
        }}
      >
        {/* TAB 1: COURSE CREATOR */}
        <Tab 
          key="creator" 
          title={
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Crear Nuevo Curso</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {/* Left: General Info Form */}
            <div className="flex flex-col gap-6 md:col-span-2">
              <Card className="glass-panel bg-neutral-900/40 border border-white/5 p-6 flex flex-col gap-5">
                <h3 className="font-bold text-lg text-white border-b border-white/10 pb-3">
                  Información General del Curso
                </h3>
                
                <Input 
                  label="Título del Curso" 
                  placeholder="Ej: Curso de Python Avanzado" 
                  value={title} 
                  onValueChange={setTitle}
                  required
                  classNames={{ inputWrapper: "bg-neutral-950/40 border border-white/5" }}
                />
                
                <Textarea 
                  label="Descripción" 
                  placeholder="Resume brevemente el objetivo pedagógico del curso..." 
                  value={description} 
                  onValueChange={setDescription}
                  required
                  classNames={{ input: "bg-neutral-950/40 border border-white/5" }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select 
                    label="Categoría" 
                    placeholder="Elige una categoría"
                    selectedKeys={category ? [category] : []}
                    onSelectionChange={(keys) => setCategory(Array.from(keys)[0])}
                    required
                    classNames={{ trigger: "bg-neutral-950/40 border border-white/5" }}
                  >
                    <SelectItem key="Desarrollo Web" value="Desarrollo Web">Desarrollo Web</SelectItem>
                    <SelectItem key="Pedagogía Digital" value="Pedagogía Digital">Pedagogía Digital</SelectItem>
                    <SelectItem key="Bases de Datos" value="Bases de Datos">Bases de Datos</SelectItem>
                  </Select>

                  <Select 
                    label="Dificultad" 
                    placeholder="Elige el nivel"
                    selectedKeys={difficulty ? [difficulty] : []}
                    onSelectionChange={(keys) => setDifficulty(Array.from(keys)[0])}
                    required
                    classNames={{ trigger: "bg-neutral-950/40 border border-white/5" }}
                  >
                    <SelectItem key="Principiante" value="Principiante">Principiante</SelectItem>
                    <SelectItem key="Intermedio" value="Intermedio">Intermedio</SelectItem>
                    <SelectItem key="Avanzado" value="Avanzado">Avanzado</SelectItem>
                  </Select>
                </div>
              </Card>

              {/* Dynamic Lessons Section */}
              <Card className="glass-panel bg-neutral-900/40 border border-white/5 p-6 flex flex-col gap-5">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <h3 className="font-bold text-lg text-white">
                    Planificación de Lecciones ({lessons.length})
                  </h3>
                  <Button 
                    size="sm" 
                    color="secondary" 
                    className="font-bold"
                    onPress={handleAddLesson}
                    startContent={<Plus className="w-4 h-4" />}
                  >
                    Añadir Lección
                  </Button>
                </div>

                <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-1">
                  {lessons.map((lesson, idx) => (
                    <div key={idx} className="bg-neutral-950/30 p-4 border border-white/5 rounded-2xl flex flex-col gap-4 relative">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-indigo-400 uppercase">Lección {idx + 1}</span>
                        {lessons.length > 1 && (
                          <Button 
                            isIconOnly 
                            size="sm" 
                            color="danger" 
                            variant="light"
                            onPress={() => handleRemoveLesson(idx)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <Input 
                          label="Título" 
                          value={lesson.title} 
                          onValueChange={(val) => handleLessonChange(idx, "title", val)}
                          className="col-span-2"
                          size="sm"
                        />
                        <Input 
                          label="Duración" 
                          value={lesson.duration} 
                          onValueChange={(val) => handleLessonChange(idx, "duration", val)}
                          size="sm"
                        />
                      </div>

                      <Input 
                        label="URL de Video (Youtube Embed)" 
                        placeholder="Ej: https://www.youtube.com/embed/XXXXX" 
                        value={lesson.videoUrl} 
                        onValueChange={(val) => handleLessonChange(idx, "videoUrl", val)}
                        size="sm"
                      />

                      <Textarea 
                        label="Notas Pedagógicas (Markdown/Texto)" 
                        placeholder="Escribe la explicación teórica y ejercicios de la clase..." 
                        value={lesson.content} 
                        onValueChange={(val) => handleLessonChange(idx, "content", val)}
                        size="sm"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right: Gamification Badges & Exam Builder */}
            <div className="flex flex-col gap-6">
              {/* Badges configuration */}
              <Card className="glass-panel bg-neutral-900/40 border border-white/5 p-6 flex flex-col gap-4">
                <h3 className="font-bold text-lg text-white border-b border-white/10 pb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-400" />
                  Mecánica de Insignia
                </h3>

                <Input 
                  label="Nombre de la Insignia" 
                  placeholder="Ej: Pythoneer Master" 
                  value={badgeName} 
                  onValueChange={setBadgeName}
                  required
                  size="sm"
                />

                <Select 
                  label="Color del Badge" 
                  selectedKeys={[badgeColor]}
                  onSelectionChange={(keys) => setBadgeColor(Array.from(keys)[0])}
                  size="sm"
                >
                  <SelectItem key="primary" value="primary">Azul (Primary)</SelectItem>
                  <SelectItem key="secondary" value="secondary">Violeta (Secondary)</SelectItem>
                  <SelectItem key="success" value="success">Verde (Success)</SelectItem>
                  <SelectItem key="warning" value="warning">Amarillo (Warning)</SelectItem>
                </Select>

                <Select 
                  label="Icono del Badge" 
                  selectedKeys={[badgeIcon]}
                  onSelectionChange={(keys) => setBadgeIcon(Array.from(keys)[0])}
                  size="sm"
                >
                  <SelectItem key="Atom" value="Atom">Átomo (React)</SelectItem>
                  <SelectItem key="Trophy" value="Trophy">Trofeo (Gamificación)</SelectItem>
                  <SelectItem key="Database" value="Database">Base de Datos (SQL)</SelectItem>
                  <SelectItem key="Award" value="Award">Medalla (General)</SelectItem>
                </Select>
              </Card>

              {/* Exam Builder Card */}
              <Card className="glass-panel bg-neutral-900/40 border border-white/5 p-6 flex flex-col gap-4">
                <h3 className="font-bold text-lg text-white border-b border-white/10 pb-3 flex items-center gap-2">
                  <Database className="w-5 h-5 text-indigo-400" />
                  Cuestionario del Examen (3 Preguntas)
                </h3>

                <div className="flex flex-col gap-6 max-h-[350px] overflow-y-auto pr-1">
                  {exam.map((q, qIdx) => (
                    <div key={qIdx} className="flex flex-col gap-3 border-b border-white/5 pb-4 last:border-b-0">
                      <span className="text-xs font-bold text-neutral-400">Pregunta {qIdx + 1}</span>
                      <Input 
                        placeholder="Enunciado de la pregunta" 
                        value={q.question} 
                        onValueChange={(val) => handleExamChange(qIdx, "question", val)}
                        size="sm"
                      />
                      
                      {q.options.map((opt, optIdx) => (
                        <Input 
                          key={optIdx}
                          placeholder={`Opción ${optIdx + 1}`} 
                          value={opt} 
                          onValueChange={(val) => handleOptionChange(qIdx, optIdx, val)}
                          size="sm"
                          className="pl-4"
                        />
                      ))}

                      <Select 
                        label="Opción Correcta" 
                        selectedKeys={[q.correctAnswer.toString()]}
                        onSelectionChange={(keys) => handleExamChange(qIdx, "correctAnswer", parseInt(Array.from(keys)[0]))}
                        size="sm"
                      >
                        <SelectItem key="0" value="0">Opción 1</SelectItem>
                        <SelectItem key="1" value="1">Opción 2</SelectItem>
                        <SelectItem key="2" value="2">Opción 3</SelectItem>
                        <SelectItem key="3" value="3">Opción 4</SelectItem>
                      </Select>
                    </div>
                  ))}
                </div>
              </Card>

              <Button 
                color="secondary" 
                className="font-bold py-6 text-base tracking-wide bg-gradient-to-r from-indigo-500 to-purple-600"
                onPress={handleSaveCourse}
              >
                Guardar y Publicar Curso
              </Button>
            </div>
          </div>
        </Tab>

        {/* TAB 2: LEARNING ANALYTICS */}
        <Tab 
          key="analytics" 
          title={
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4" />
              <span>Analíticas del Aprendizaje</span>
            </div>
          }
        >
          <div className="flex flex-col gap-6 mt-4">
            {/* Overview stats counter cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="glass-panel bg-neutral-900/40 border border-white/5 p-5 flex flex-row items-center gap-4">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Users className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Alumnos Totales</span>
                  <span className="text-2xl font-extrabold text-white">245</span>
                </div>
              </Card>

              <Card className="glass-panel bg-neutral-900/40 border border-white/5 p-5 flex flex-row items-center gap-4">
                <div className="p-3 rounded-2xl bg-success/10 text-success border border-success/20">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Finalización</span>
                  <span className="text-2xl font-extrabold text-white">74.2%</span>
                </div>
              </Card>

              <Card className="glass-panel bg-neutral-900/40 border border-white/5 p-5 flex flex-row items-center gap-4">
                <div className="p-3 rounded-2xl bg-warning/10 text-warning border border-warning/20">
                  <TrophyIcon className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Nota Promedio</span>
                  <span className="text-2xl font-extrabold text-white">88/100</span>
                </div>
              </Card>

              <Card className="glass-panel bg-neutral-900/40 border border-white/5 p-5 flex flex-row items-center gap-4">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Users className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Activos Hoy</span>
                  <span className="text-2xl font-extrabold text-white">48</span>
                </div>
              </Card>
            </div>

            {/* Main analytics panels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Enrollment metrics bar charts */}
              <Card className="glass-panel bg-neutral-900/40 border border-white/5 p-6 md:col-span-2 flex flex-col gap-5">
                <h3 className="font-bold text-lg text-white border-b border-white/10 pb-3 flex justify-between items-center">
                  <span>Alumnos Inscritos por Curso</span>
                  <span className="text-xs text-neutral-400">Total en tiempo real</span>
                </h3>

                <div className="flex flex-col gap-5">
                  {courses.map((course, idx) => {
                    const mockEnrollment = idx === 0 ? 120 : idx === 1 ? 95 : 30;
                    const maxVal = 150;
                    const percentage = (mockEnrollment / maxVal) * 100;
                    return (
                      <div key={course.id} className="flex flex-col gap-2">
                        <div className="flex justify-between text-sm font-semibold">
                          <span className="text-white truncate max-w-[280px]">{course.title}</span>
                          <span className="text-indigo-400">{mockEnrollment} alumnos</span>
                        </div>
                        <Progress value={percentage} color="secondary" className="h-2.5" />
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Right Column: Classroom leaderboard progress */}
              <Card className="glass-panel bg-neutral-900/40 border border-white/5 p-6 flex flex-col gap-5">
                <h3 className="font-bold text-lg text-white border-b border-white/10 pb-3">
                  Seguimiento de Alumnos
                </h3>

                <div className="flex flex-col gap-4">
                  {simulatedStudents.map((stud, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-neutral-950/20 p-3 border border-white/5 rounded-2xl gap-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar src={stud.avatar} size="sm" className="w-8 h-8" />
                        <div className="flex flex-col items-start">
                          <span className="text-xs font-bold text-white">{stud.name}</span>
                          <span className="text-[9px] text-neutral-500">Progreso: {stud.progress}%</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <Chip 
                          size="sm" 
                          variant="flat" 
                          color={stud.status === 'Aprobado' ? 'success' : stud.status === 'Cursando' ? 'primary' : 'danger'}
                          className="text-[9px] font-bold uppercase h-5 px-1.5"
                        >
                          {stud.status}
                        </Chip>
                        {stud.score > 0 && (
                          <span className="text-[9px] font-semibold text-neutral-400 mt-1">Cal: {stud.score}/100</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
