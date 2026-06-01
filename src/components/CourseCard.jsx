import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Progress, Button, Chip } from "@nextui-org/react";
import * as Icons from 'lucide-react';
import { BookOpen, Trophy } from 'lucide-react';

export default function CourseCard({ course, userProgress, onSelectCourse }) {
  // Obtener icono dinámicamente de Lucide
  const BadgeIcon = Icons[course.badge?.icon] || Icons.Award;
  
  // Calcular progreso
  const completedLessons = userProgress.completedLessons.filter(lId => 
    course.lessons.some(l => l.id === lId)
  ).length;
  
  const totalLessons = course.lessons.length;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  const isExamPassed = userProgress.passedExams.includes(course.id);

  return (
    <Card 
      isPressable 
      onPress={() => onSelectCourse(course)}
      className="glass-panel bg-neutral-900/40 border border-white/5 hover:border-indigo-500/30 glass-card-hover transition-all duration-300 w-full"
    >
      <CardHeader className="flex gap-3 justify-between items-start p-6 pb-2">
        <div className="flex flex-col gap-1 items-start">
          <div className="flex gap-2 mb-1.5 flex-wrap">
            <Chip size="sm" variant="flat" color="primary" className="text-[10px] font-bold uppercase">
              {course.category}
            </Chip>
            <Chip 
              size="sm" 
              variant="flat" 
              color={course.difficulty === 'Principiante' ? 'success' : course.difficulty === 'Intermedio' ? 'warning' : 'danger'}
              className="text-[10px] font-bold uppercase"
            >
              {course.difficulty}
            </Chip>
          </div>
          <h4 className="text-lg font-bold text-white text-left tracking-tight">
            {course.title}
          </h4>
        </div>
        
        {/* Dynamic Badge Icon */}
        <div className={`p-3 rounded-xl bg-gradient-to-br from-${course.badge.color}-500/20 to-neutral-800 border border-${course.badge.color}-500/30 text-${course.badge.color}-400 shadow-md`}>
          <BadgeIcon className="w-6 h-6" />
        </div>
      </CardHeader>

      <CardBody className="px-6 py-2 text-neutral-400 text-sm text-left">
        <p className="line-clamp-2 leading-relaxed">
          {course.description}
        </p>
        
        <div className="flex gap-4 mt-4 text-xs text-neutral-400">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            {totalLessons} lecciones
          </span>
          <span className="flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
            {isExamPassed ? 'Examen Aprobado' : 'Examen Pendiente'}
          </span>
        </div>
      </CardBody>

      <CardFooter className="flex flex-col gap-3 p-6 pt-4 items-stretch">
        <div className="flex justify-between items-center text-xs">
          <span className="text-neutral-400 font-medium">Progreso del curso</span>
          <span className="font-extrabold text-cyan-400">{Math.round(progressPercentage)}%</span>
        </div>
        <Progress 
          value={progressPercentage} 
          color={isExamPassed ? "success" : "secondary"} 
          className="h-1.5"
        />
        
        <div className="flex items-center justify-between mt-1 gap-2">
          {isExamPassed ? (
            <Chip 
              color="success" 
              variant="flat" 
              className="w-full text-center py-4 font-bold border border-success-500/20"
            >
              Curso Completado ✓
            </Chip>
          ) : (
            <div 
              className="w-full text-center py-2 rounded-xl text-sm font-bold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/20 transition-all duration-300"
            >
              {progressPercentage > 0 ? 'Continuar Aprendizaje' : 'Iniciar Curso'}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
