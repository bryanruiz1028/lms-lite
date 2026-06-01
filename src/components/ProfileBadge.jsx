import React from 'react';
import * as Icons from 'lucide-react';
import { Chip } from '@nextui-org/react';

export default function ProfileBadge({ badge, isUnlocked }) {
  // Obtener el icono dinámicamente de Lucide
  const BadgeIcon = Icons[badge?.icon] || Icons.Award;
  const color = badge?.color || 'primary';

  return (
    <div 
      className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
        isUnlocked 
          ? `bg-neutral-900/60 border-${color}-500/25 shadow-md shadow-${color}-600/5` 
          : 'bg-neutral-950/20 border-white/5 opacity-40 filter grayscale'
      }`}
    >
      {/* Background glow on hover if unlocked */}
      {isUnlocked && (
        <div className={`absolute inset-0 bg-${color}-500/5 blur-xl group-hover:scale-110 transition-transform duration-300 rounded-full`} />
      )}

      <div className={`p-3.5 rounded-full mb-3 relative z-10 transition-transform duration-300 group-hover:scale-105 ${
        isUnlocked
          ? `bg-gradient-to-br from-${color}-500/20 to-neutral-800 border border-${color}-500/30 text-${color}-400 shadow-md`
          : 'bg-neutral-800 border-neutral-700 text-neutral-600'
      }`}>
        <BadgeIcon className="w-8 h-8" />
      </div>

      <div className="flex flex-col items-center gap-1.5 relative z-10">
        <span className="text-sm font-bold text-white tracking-tight text-center">
          {badge?.name}
        </span>
        <Chip 
          size="sm" 
          variant="flat" 
          color={isUnlocked ? 'success' : 'default'} 
          className="text-[9px] font-extrabold uppercase px-1 h-5"
        >
          {isUnlocked ? 'Desbloqueado' : 'Bloqueado'}
        </Chip>
      </div>
    </div>
  );
}
