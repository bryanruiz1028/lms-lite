import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CourseCard from './components/CourseCard';
import LearningBoard from './components/LearningBoard';
import ExamModule from './components/ExamModule';
import AdminDashboard from './components/AdminDashboard';
import ProfileBadge from './components/ProfileBadge';
import { coursesInitial } from './data/coursesInitial';
import { Trophy, BookOpen, GraduationCap, Award } from 'lucide-react';
import { Card, Progress, Chip } from '@nextui-org/react';

export default function App() {
  const [activeTab, setActiveTab] = useState("student");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedExam, setSelectedExam] = useState(false);
  
  const [studentProfile, setStudentProfile] = useState({
    name: "Bryan Ruiz Delgado",
    level: 1,
    xp: 0,
    completedLessons: [],
    passedExams: []
  });

  // 1. Cargar datos iniciales desde LocalStorage o data semilla
  useEffect(() => {
    const savedCourses = localStorage.getItem("lms_courses");
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    } else {
      setCourses(coursesInitial);
      localStorage.setItem("lms_courses", JSON.stringify(coursesInitial));
    }

    const savedProfile = localStorage.getItem("lms_student_profile");
    if (savedProfile) {
      setStudentProfile(JSON.parse(savedProfile));
    } else {
      localStorage.setItem("lms_student_profile", JSON.stringify(studentProfile));
    }
  }, []);

  // 2. Guardar perfil del estudiante ante cambios y procesar subida de nivel
  const updateProfile = (newProfile) => {
    // Procesar subida de nivel (Ej: Nivel 1 = 1000 XP, Nivel 2 = 2000 XP, Nivel 3 = 3000 XP)
    let currentLevel = newProfile.level;
    let currentXp = newProfile.xp;
    let xpNeeded = currentLevel * 1000;

    while (currentXp >= xpNeeded) {
      currentXp -= xpNeeded;
      currentLevel += 1;
      xpNeeded = currentLevel * 1000;
      alert(`¡Felicidades Bryan! Has subido de nivel. Ahora eres Nivel ${currentLevel} 🚀`);
    }

    const updated = {
      ...newProfile,
      level: currentLevel,
      xp: currentXp
    };

    setStudentProfile(updated);
    localStorage.setItem("lms_student_profile", JSON.stringify(updated));
  };

  // 3. Agregar un curso desde el AdminDashboard
  const handleAddCourse = (newCourse) => {
    const updatedCourses = [newCourse, ...courses];
    setCourses(updatedCourses);
    localStorage.setItem("lms_courses", JSON.stringify(updatedCourses));
    setActiveTab("student"); // Redireccionar al catálogo
  };

  // 4. Completar lección (+50 XP)
  const handleMarkLessonComplete = (lessonId, courseId) => {
    if (studentProfile.completedLessons.includes(lessonId)) return;

    const updatedCompleted = [...studentProfile.completedLessons, lessonId];
    const updatedXp = studentProfile.xp + 50;

    // Actualizar curso seleccionado en pantalla para refrescar la lección completada
    const currentCourse = courses.find(c => c.id === courseId);
    if (currentCourse) {
      setSelectedCourse({ ...currentCourse });
    }

    updateProfile({
      ...studentProfile,
      completedLessons: updatedCompleted,
      xp: updatedXp
    });
  };

  // 5. Aprobar examen final (+200 XP e insignia)
  const handlePassExam = (courseId) => {
    if (studentProfile.passedExams.includes(courseId)) return;

    const updatedExams = [...studentProfile.passedExams, courseId];
    const updatedXp = studentProfile.xp + 200;

    updateProfile({
      ...studentProfile,
      passedExams: updatedExams,
      xp: updatedXp
    });

    // Actualizar la lista local de cursos para refrescar su estado
    const currentCourse = courses.find(c => c.id === courseId);
    if (currentCourse) {
      setSelectedCourse({ ...currentCourse });
    }
  };

  // Mapear insignias desbloqueadas
  const badgesUnlocked = studentProfile.passedExams.map(courseId => {
    const course = courses.find(c => c.id === courseId);
    return course ? { ...course.badge, courseTitle: course.title } : null;
  }).filter(Boolean);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setSelectedExam(false);
  };

  return (
    <div className="min-h-screen bg-[#080c14] relative overflow-hidden flex flex-col pb-16">
      {/* Decorative glows in background */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(99,102,241,0.1),rgba(0,0,0,0))] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(6,182,212,0.08),rgba(0,0,0,0))] pointer-events-none" />
      <div className="absolute inset-0 grid-bg-overlay opacity-30 pointer-events-none" />

      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        studentProfile={studentProfile} 
        badgesUnlocked={badgesUnlocked} 
      />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-10">
        {activeTab === 'student' ? (
          !selectedCourse ? (
            /* STUDENT CATALOG VIEW */
            <div className="flex flex-col gap-10">
              {/* Hero Banner Section */}
              <div className="glass-panel bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-neutral-900/40 border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                <div className="flex flex-col items-start gap-3 max-w-2xl text-left">
                  <Chip size="sm" variant="flat" color="secondary" className="font-bold text-xs">
                    ¡Bienvenido de vuelta, Estudiante!
                  </Chip>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    Domina las competencias del futuro en
                    <span className="block mt-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      LMS Lite EdTech
                    </span>
                  </h1>
                  <p className="text-neutral-400 text-sm md:text-base leading-relaxed mt-2">
                    Esta plataforma es tu aula virtual gamificada personal. Completa lecciones para acumular XP, aprueba exámenes finales y desbloquea insignias que avalen tus destrezas pedagógicas y tecnológicas.
                  </p>
                </div>
                <div className="p-5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 scale-110 hidden lg:block">
                  <GraduationCap className="w-16 h-16" />
                </div>
              </div>

              {/* Student Status & Badges Cabinet */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="glass-panel bg-neutral-900/40 border border-white/5 p-6 lg:col-span-1 flex flex-col gap-4 text-left">
                  <h3 className="font-bold text-lg text-white border-b border-white/10 pb-3 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    Progreso Académico
                  </h3>
                  
                  <div className="flex items-center gap-4 py-2">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col items-center justify-center text-indigo-400 font-extrabold">
                      <span className="text-xs text-indigo-300 font-bold uppercase tracking-tighter">Niv</span>
                      <span className="text-lg leading-none">{studentProfile.level}</span>
                    </div>
                    <div className="flex flex-col gap-1 items-start flex-grow">
                      <span className="text-sm font-bold text-white">{studentProfile.name}</span>
                      <span className="text-xs text-neutral-400">Total de lecciones completadas: {studentProfile.completedLessons.length}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-400 font-medium">Progreso del Nivel</span>
                      <span className="font-bold text-cyan-400">{studentProfile.xp} / {studentProfile.level * 1000} XP</span>
                    </div>
                    <Progress 
                      value={(studentProfile.xp / (studentProfile.level * 1000)) * 100} 
                      color="secondary" 
                      className="h-2"
                    />
                  </div>
                </Card>

                {/* Badges Display cabinet */}
                <Card className="glass-panel bg-neutral-900/40 border border-white/5 p-6 lg:col-span-2 flex flex-col gap-4 text-left">
                  <h3 className="font-bold text-lg text-white border-b border-white/10 pb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-400" />
                    Mi Vitrina de Insignias ({badgesUnlocked.length} desbloqueadas)
                  </h3>

                  {courses.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {courses.map(course => {
                        const isUnlocked = studentProfile.passedExams.includes(course.id);
                        return (
                          <ProfileBadge 
                            key={course.id}
                            badge={course.badge} 
                            isUnlocked={isUnlocked}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-6 text-xs text-neutral-500">
                      No hay insignias registradas en el sistema.
                    </div>
                  )}
                </Card>
              </div>

              {/* Course Catalog Grid */}
              <div className="flex flex-col gap-4 text-left">
                <h3 className="font-extrabold text-xl text-white tracking-tight flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  Catálogo de Cursos Disponibles
                </h3>
                
                {courses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                      <CourseCard 
                        key={course.id} 
                        course={course} 
                        userProgress={studentProfile}
                        onSelectCourse={handleSelectCourse}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 bg-neutral-900/10 border border-white/5 rounded-3xl text-neutral-500 gap-3">
                    <BookOpen className="w-12 h-12 text-neutral-600 animate-pulse" />
                    <span>No hay cursos publicados. Ve al menú Profesor para añadir uno.</span>
                  </div>
                )}
              </div>
            </div>
          ) : !selectedExam ? (
            /* STUDENT BOARD / STUDY VIEW */
            <LearningBoard 
              course={selectedCourse}
              userProgress={studentProfile}
              onMarkLessonComplete={handleMarkLessonComplete}
              onBack={() => setSelectedCourse(null)}
              onStartExam={() => setSelectedExam(true)}
            />
          ) : (
            /* STUDENT EXAM VIEW */
            <ExamModule 
              course={selectedCourse}
              userProgress={studentProfile}
              onPassExam={handlePassExam}
              onBack={() => setSelectedExam(false)}
            />
          )
        ) : (
          /* TEACHER/ADMIN CREATOR & ANALYTICS VIEW */
          <AdminDashboard 
            onAddCourse={handleAddCourse} 
            courses={courses}
          />
        )}
      </main>
    </div>
  );
}
