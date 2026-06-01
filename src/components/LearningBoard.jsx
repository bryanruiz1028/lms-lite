import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  CardBody, 
  CardHeader, 
  Checkbox, 
  Progress, 
  Tabs, 
  Tab, 
  Textarea, 
  Input, 
  Avatar,
  Chip
} from "@nextui-org/react";
import { ArrowLeft, BookOpen, MessageSquare, FileText, CheckCircle, GraduationCap } from 'lucide-react';

export default function LearningBoard({ course, userProgress, onMarkLessonComplete, onBack, onStartExam }) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("content");
  const [commentInput, setCommentInput] = useState("");
  const [forumComments, setForumComments] = useState([
    {
      id: 1,
      author: "Juan Pérez",
      avatar: "https://i.pravatar.cc/150?img=33",
      role: "Estudiante",
      text: "¡Excelente explicación! Me quedó súper claro el concepto del estado local.",
      time: "hace 2 horas"
    },
    {
      id: 2,
      author: "Ing. Bryan Ruiz",
      avatar: "https://avatars.githubusercontent.com/u/65566342?v=4",
      role: "Profesor",
      text: "¡Excelente, Juan! Si tienes alguna duda al estructurar tu To-Do App con LocalStorage, avísame por aquí.",
      time: "hace 1 hora"
    }
  ]);

  const currentLesson = course.lessons[currentLessonIndex] || course.lessons[0];
  
  // Calcular progreso del curso
  const completedLessons = userProgress.completedLessons.filter(lId => 
    course.lessons.some(l => l.id === lId)
  );
  
  const totalLessons = course.lessons.length;
  const progressPercentage = (completedLessons.length / totalLessons) * 100;
  const isAllLessonsCompleted = completedLessons.length === totalLessons;
  const isExamPassed = userProgress.passedExams.includes(course.id);

  const handleMarkComplete = () => {
    onMarkLessonComplete(currentLesson.id, course.id);
    // Avanzar a la siguiente lección si existe
    if (currentLessonIndex < totalLessons - 1) {
      setCurrentLessonIndex(prev => prev + 1);
    }
  };

  const handlePostComment = () => {
    if (!commentInput.trim()) return;
    const newComment = {
      id: Date.now(),
      author: userProgress.name,
      avatar: "https://avatars.githubusercontent.com/u/65566342?v=4",
      role: "Estudiante",
      text: commentInput,
      time: "Hace un momento"
    };
    setForumComments(prev => [...prev, newComment]);
    setCommentInput("");
  };

  return (
    <div className="flex flex-col gap-6 w-full text-left">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <Button 
          variant="light" 
          onPress={onBack} 
          className="text-neutral-400 font-semibold hover:text-white"
          startContent={<ArrowLeft className="w-4 h-4" />}
        >
          Volver al Catálogo
        </Button>
        
        <div className="flex gap-2 items-center flex-wrap">
          <Chip size="sm" color="secondary" className="font-extrabold uppercase">
            {course.category}
          </Chip>
          <Chip size="sm" color="success" variant="flat" className="font-semibold">
            {completedLessons.length} de {totalLessons} Completadas
          </Chip>
          {isExamPassed && (
            <Chip size="sm" color="warning" variant="flat" className="font-bold">
              Insignia Desbloqueada 🏆
            </Chip>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Playlist / Lesson Outline */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <Card className="glass-panel bg-neutral-900/40 border border-white/5 p-4 flex flex-col gap-4">
            <h3 className="font-bold text-lg text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              Contenido del Curso
            </h3>
            
            <Progress 
              value={progressPercentage} 
              color={isExamPassed ? "success" : "secondary"} 
              className="h-1.5 mb-2" 
            />

            <div className="flex flex-col gap-2 max-h-[450px] overflow-y-auto pr-1">
              {course.lessons.map((lesson, idx) => {
                const isCompleted = completedLessons.includes(lesson.id);
                const isActive = idx === currentLessonIndex;
                
                return (
                  <div 
                    key={lesson.id}
                    onClick={() => setCurrentLessonIndex(idx)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                      isActive 
                        ? 'bg-indigo-600/25 border-indigo-500/50 shadow-md shadow-indigo-600/5' 
                        : 'bg-neutral-900/20 border-white/5 hover:border-white/10 hover:bg-neutral-900/40'
                    }`}
                  >
                    <div className="flex flex-col gap-0.5 items-start">
                      <span className={`text-xs font-bold ${isActive ? 'text-indigo-300' : 'text-neutral-400'}`}>
                        Lección {idx + 1}
                      </span>
                      <span className={`text-sm font-semibold truncate max-w-[170px] ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                        {lesson.title.substring(3)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-neutral-500 font-medium">
                        {lesson.duration}
                      </span>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-success" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-neutral-700" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* CTA Final Exam */}
            {isAllLessonsCompleted && (
              <Button 
                color="warning" 
                variant={isExamPassed ? "flat" : "solid"}
                onPress={onStartExam}
                className="mt-4 font-bold py-6 text-base tracking-wide"
                startContent={<GraduationCap className="w-5 h-5" />}
              >
                {isExamPassed ? 'Ver Examen Final (Aprobado)' : '¡Iniciar Examen Final!'}
              </Button>
            )}
          </Card>
        </div>

        {/* Center/Right column: Player and Lesson Details */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Simulated Video Player */}
          <Card className="glass-panel bg-neutral-950 border border-white/5 overflow-hidden">
            <div className="aspect-video w-full bg-black relative">
              {currentLesson.videoUrl ? (
                <iframe 
                  className="w-full h-full"
                  src={currentLesson.videoUrl} 
                  title={currentLesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-neutral-500">
                  <GraduationCap className="w-16 h-16 text-neutral-600 animate-pulse" />
                  <span>Cargando recursos multimedia...</span>
                </div>
              )}
            </div>
          </Card>

          {/* Lesson Details Tabs */}
          <Card className="glass-panel bg-neutral-900/40 border border-white/5 p-6">
            <Tabs 
              aria-label="Fichas de la Lección" 
              selectedKey={activeTab} 
              onSelectionChange={setActiveTab}
              color="secondary" 
              variant="underlined"
              classNames={{
                tabList: "border-b border-white/10 w-full",
                tab: "font-bold text-sm"
              }}
            >
              <Tab 
                key="content" 
                title={
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Notas Pedagógicas</span>
                  </div>
                }
              >
                <div className="mt-4 flex flex-col gap-4 text-neutral-300 leading-relaxed text-sm">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {currentLesson.title}
                  </h2>
                  
                  <div className="bg-neutral-950/40 border border-white/5 rounded-2xl p-5 leading-relaxed text-sm">
                    {currentLesson.content}
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-neutral-500 font-medium">
                      Completa esta lección para sumar +50 XP y habilitar tu evaluación final.
                    </span>
                    {!completedLessons.includes(currentLesson.id) && (
                      <Button 
                        color="success" 
                        variant="flat"
                        onPress={handleMarkComplete}
                        className="font-bold border border-success-500/20"
                        startContent={<CheckCircle className="w-4 h-4" />}
                      >
                        Completar Lección
                      </Button>
                    )}
                  </div>
                </div>
              </Tab>
              
              <Tab 
                key="forum" 
                title={
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Foro de Preguntas ({forumComments.length})</span>
                  </div>
                }
              >
                <div className="mt-4 flex flex-col gap-6">
                  {/* Comment Input */}
                  <div className="flex flex-col gap-3">
                    <Textarea 
                      placeholder="¿Tienes alguna duda sobre esta lección? Pregúntale aBryan Ruiz..."
                      value={commentInput}
                      onValueChange={setCommentInput}
                      className="text-white text-sm"
                      classNames={{
                        input: "bg-neutral-900/50"
                      }}
                    />
                    <div className="flex justify-end">
                      <Button 
                        color="secondary" 
                        className="font-bold bg-indigo-600 hover:bg-indigo-700" 
                        onPress={handlePostComment}
                      >
                        Publicar Comentario
                      </Button>
                    </div>
                  </div>

                  {/* Comments Timeline */}
                  <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1">
                    {forumComments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 bg-neutral-950/20 p-4 border border-white/5 rounded-2xl">
                        <Avatar src={comment.avatar} className="w-9 h-9" />
                        <div className="flex flex-col gap-1 items-start">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{comment.author}</span>
                            <Chip size="sm" variant="flat" color={comment.role === 'Profesor' ? 'warning' : 'primary'} className="text-[9px] font-bold uppercase h-4 px-1">
                              {comment.role}
                            </Chip>
                            <span className="text-[10px] text-neutral-500">{comment.time}</span>
                          </div>
                          <p className="text-sm text-neutral-300 leading-relaxed text-left mt-0.5">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Tab>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
