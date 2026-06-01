import React from 'react';
import { 
  Navbar as NextNavbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Button, 
  Avatar, 
  Progress,
  Chip
} from "@nextui-org/react";
import { GraduationCap, Award, Settings, User } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, studentProfile, badgesUnlocked }) {
  // Calcular porcentaje de XP para el nivel actual
  const xpNeeded = studentProfile.level * 1000;
  const xpPercentage = (studentProfile.xp / xpNeeded) * 100;

  return (
    <NextNavbar 
      maxWidth="xl" 
      className="glass-panel bg-neutral-950/40 border-b border-white/5 py-2 sticky top-0 z-50"
    >
      <NavbarBrand className="gap-2">
        <GraduationCap className="w-8 h-8 text-indigo-500" />
        <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          LMS Lite
        </span>
        <Chip size="sm" variant="flat" color="secondary" className="text-xs">
          EdTech + Gamificación
        </Chip>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Button 
            className={`font-semibold ${activeTab === 'student' ? 'bg-indigo-600/30 border border-indigo-500/40 text-indigo-200' : 'text-neutral-400 bg-transparent'}`}
            onPress={() => setActiveTab('student')}
            variant={activeTab === 'student' ? 'flat' : 'light'}
            startContent={<User className="w-4 h-4" />}
          >
            Panel Estudiante
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button 
            className={`font-semibold ${activeTab === 'admin' ? 'bg-indigo-600/30 border border-indigo-500/40 text-indigo-200' : 'text-neutral-400 bg-transparent'}`}
            onPress={() => setActiveTab('admin')}
            variant={activeTab === 'admin' ? 'flat' : 'light'}
            startContent={<Settings className="w-4 h-4" />}
          >
            Administrador (Profesor)
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        {/* Profile Card Summary */}
        <div className="flex items-center gap-3 bg-neutral-900/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
          <Avatar 
            isBordered
            color="secondary"
            size="sm"
            src="https://avatars.githubusercontent.com/u/65566342?v=4" // Bryan's real avatar
            className="w-8 h-8"
          />
          <div className="flex flex-col gap-0.5 max-w-[120px] lg:max-w-[160px] hidden md:block">
            <span className="text-xs font-bold text-neutral-200 truncate">
              {studentProfile.name}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-cyan-400 font-extrabold uppercase">
                Nivel {studentProfile.level}
              </span>
              <Progress 
                value={xpPercentage} 
                size="sm" 
                color="secondary" 
                className="w-16 h-1.5"
              />
              <span className="text-[9px] text-neutral-400 font-medium">
                {studentProfile.xp}/{xpNeeded} XP
              </span>
            </div>
          </div>
          
          <Chip 
            size="sm" 
            variant="flat" 
            color="warning" 
            className="text-[10px] font-bold px-1"
            startContent={<Award className="w-3.5 h-3.5 text-warning" />}
          >
            {badgesUnlocked.length} Logros
          </Chip>
        </div>
      </NavbarContent>
    </NextNavbar>
  );
}
