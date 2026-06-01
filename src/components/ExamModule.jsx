import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, RadioGroup, Radio, Button, Chip } from "@nextui-org/react";
import * as Icons from 'lucide-react';
import { ArrowLeft, CheckCircle, XCircle, GraduationCap, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ExamModule({ course, userProgress, onPassExam, onBack }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);

  const BadgeIcon = Icons[course.badge?.icon] || Icons.Award;

  const handleSubmit = () => {
    // Calcular cuántas respuestas son correctas
    let correctCount = 0;
    course.exam.forEach((q, idx) => {
      if (parseInt(selectedAnswers[idx]) === q.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = (correctCount / course.exam.length) * 100;
    const isPassed = finalScore >= 80;

    setScore(finalScore);
    setPassed(isPassed);
    setIsSubmitted(true);

    if (isPassed) {
      // Registrar aprobación en la base de datos de usuario (da +200 XP e inyecta la medalla)
      onPassExam(course.id);
      
      // Lanzar confeti espectacular
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Confeti desde los lados
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setPassed(false);
  };

  // Verificar si todas las preguntas han sido respondidas antes de permitir enviar
  const isAllAnswered = course.exam.every((_, idx) => selectedAnswers[idx] !== undefined);

  return (
    <div className="flex flex-col gap-6 w-full text-left max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <Button 
          variant="light" 
          onPress={onBack} 
          className="text-neutral-400 font-semibold hover:text-white"
          startContent={<ArrowLeft className="w-4 h-4" />}
        >
          Regresar a las Lecciones
        </Button>
        <Chip size="sm" color="warning" className="font-bold">
          Evaluación Final
        </Chip>
      </div>

      {!isSubmitted ? (
        // Formulario de Examen
        <Card className="glass-panel bg-neutral-900/40 border border-white/5 p-6 md:p-8 flex flex-col gap-6">
          <CardHeader className="flex gap-3 items-center border-b border-white/10 pb-4 p-0">
            <GraduationCap className="w-8 h-8 text-warning" />
            <div className="flex flex-col items-start">
              <h3 className="font-extrabold text-xl text-white tracking-tight">
                Evaluación: {course.title}
              </h3>
              <p className="text-xs text-neutral-400 font-medium mt-0.5">
                Responde correctamente a todas las preguntas para desbloquear tu insignia. Se requiere 80% o más para aprobar.
              </p>
            </div>
          </CardHeader>

          <CardBody className="flex flex-col gap-8 p-0 py-4">
            {course.exam.map((q, idx) => (
              <div key={q.id} className="flex flex-col gap-3">
                <span className="text-sm text-neutral-400 font-bold uppercase tracking-wider">
                  Pregunta {idx + 1} de {course.exam.length}
                </span>
                <p className="text-base font-semibold text-white leading-relaxed">
                  {q.question}
                </p>
                
                <RadioGroup 
                  value={selectedAnswers[idx]} 
                  onValueChange={(val) => setSelectedAnswers(prev => ({ ...prev, [idx]: val }))}
                  color="secondary"
                  className="mt-2"
                >
                  {q.options.map((opt, optIdx) => (
                    <Radio 
                      key={optIdx} 
                      value={optIdx.toString()} 
                      className="bg-neutral-950/20 hover:bg-neutral-950/40 border border-white/5 rounded-xl px-4 py-3 transition-colors duration-200 w-full mb-1 flex items-center"
                      classNames={{
                        label: "text-sm text-neutral-300 font-medium ml-2"
                      }}
                    >
                      {opt}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </CardBody>

          <CardFooter className="p-0 pt-4 flex justify-end">
            <Button 
              color="warning" 
              className="font-bold py-6 px-8 text-base tracking-wide bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950"
              onPress={handleSubmit}
              disabled={!isAllAnswered}
              isDisabled={!isAllAnswered}
            >
              Enviar Respuestas
            </Button>
          </CardFooter>
        </Card>
      ) : passed ? (
        // Pantalla de Aprobado (Éxito)
        <Card className="glass-panel bg-neutral-900/40 border border-success/30 p-8 flex flex-col items-center text-center gap-6 shadow-[0_8px_32px_rgba(34,197,94,0.1)]">
          <div className="w-20 h-20 rounded-full bg-success/20 border border-success/30 flex items-center justify-center text-success mb-2">
            <CheckCircle className="w-12 h-12" />
          </div>

          <div className="flex flex-col gap-1 items-center">
            <h2 className="text-3xl font-extrabold text-white tracking-tight bg-gradient-to-r from-success to-emerald-400 bg-clip-text text-transparent">
              ¡Examen Aprobado con Éxito!
            </h2>
            <p className="text-sm text-neutral-400 font-medium">
              Obtuviste una puntuación perfecta del {Math.round(score)}%.
            </p>
          </div>

          {/* Unlocked Badge presentation */}
          <div className="bg-neutral-950/40 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-4 max-w-sm w-full my-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-indigo-500/5 blur-xl rounded-full" />
            <div className={`p-4 rounded-full bg-gradient-to-br from-${course.badge.color}-500/20 to-neutral-800 border border-${course.badge.color}-500/30 text-${course.badge.color}-400 shadow-lg scale-110 mb-2 relative z-10`}>
              <BadgeIcon className="w-12 h-12" />
            </div>
            <div className="flex flex-col gap-0.5 items-center relative z-10">
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Insignia Desbloqueada</span>
              <span className="text-lg font-extrabold text-white">{course.badge.name}</span>
            </div>
            <Chip size="sm" color="success" variant="flat" className="font-bold relative z-10">
              +200 XP Recompensado 🏆
            </Chip>
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed max-w-md">
            Esta medalla se ha inyectado en tu vitrina de logros. Has demostrado tener la competencia y el conocimiento pedagógico e informático correspondiente.
          </p>

          <Button 
            color="success" 
            className="font-bold py-6 px-10 text-base"
            onPress={onBack}
          >
            Volver al Aula de Clases
          </Button>
        </Card>
      ) : (
        // Pantalla de Reprobado (Falla)
        <Card className="glass-panel bg-neutral-900/40 border border-danger/30 p-8 flex flex-col items-center text-center gap-6 shadow-[0_8px_32px_rgba(239,68,68,0.1)]">
          <div className="w-20 h-20 rounded-full bg-danger/20 border border-danger/30 flex items-center justify-center text-danger mb-2">
            <XCircle className="w-12 h-12" />
          </div>

          <div className="flex flex-col gap-1 items-center">
            <h2 className="text-2xl font-extrabold text-white tracking-tight bg-gradient-to-r from-danger to-red-400 bg-clip-text text-transparent">
              No se alcanzó el porcentaje mínimo
            </h2>
            <p className="text-sm text-neutral-400 font-medium">
              Obtuviste una puntuación del {Math.round(score)}%. Se requiere 80% o más para aprobar.
            </p>
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed max-w-md">
            ¡No te preocupes! El aprendizaje es un proceso incremental. Repasa las lecciones y notas pedagógicas en el aula virtual para consolidar tus conocimientos y vuelve a intentarlo.
          </p>

          <div className="flex gap-4 mt-2">
            <Button 
              color="danger" 
              variant="flat"
              className="font-bold py-6 px-8 text-sm"
              onPress={handleRetry}
            >
              Reintentar Examen
            </Button>
            <Button 
              color="neutral" 
              variant="flat"
              className="font-bold py-6 px-8 text-sm text-white"
              onPress={onBack}
            >
              Repasar Lecciones
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
