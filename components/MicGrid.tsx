import React, { useState } from 'react';
import { MicSlot, User } from '../types';

interface MicGridProps {
  slots: MicSlot[];
  currentUser: User;
  onMicClick: (index: number) => void;
  onUserAction: (action: string, targetUser: User, slotIndex: number) => void;
}

const MicGrid: React.FC<MicGridProps> = ({ slots, currentUser, onMicClick, onUserAction }) => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const handleSlotClick = (index: number) => {
    // Logic remains same, visuals updated
    if (slots[index].isLocked && currentUser.role !== 'admin') return;
    setSelectedSlot(selectedSlot === index ? null : index);
  };

  // Helper to check permissions
  const canPerformAction = (action: string, targetUser: User) => {
    if (currentUser.id === targetUser.id) return false;
    if (currentUser.role === 'admin') return true;
    if (currentUser.role === 'moderator') return ['mute', 'block', 'report'].includes(action);
    return ['block', 'report'].includes(action);
  };

  // Render a single Mic Circle
  const renderMic = (slot: MicSlot, size: 'lg' | 'md') => {
    const isLg = size === 'lg';
    const dim = isLg ? 'w-[88px] h-[88px]' : 'w-[64px] h-[64px]'; // Slightly smaller for 8-grid
    
    return (
      <div key={slot.index} className="relative flex flex-col items-center group">
         <div 
            onClick={() => handleSlotClick(slot.index)}
            className={`${dim} rounded-full flex items-center justify-center cursor-pointer transition-all relative
              ${slot.user 
                ? 'bg-gray-900' 
                : 'border border-white/10 bg-black/30 hover:bg-white/5'
              }
            `}
          >
            {slot.user ? (
              <>
                <img 
                  src={slot.user.avatar} 
                  alt={slot.user.name} 
                  className={`w-full h-full object-cover rounded-full p-[2px] ${slot.user.isVip ? 'border-[3px] border-yellow-500' : 'border border-purple-500'}`} 
                />
                
                {/* Speaking Indicator */}
                {!slot.user.isMuted && (
                   <div className="absolute inset-0 rounded-full speaking-ring z-[-1]"></div>
                )}

                {/* Status Overlays */}
                {slot.user.isMuted && (
                  <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-[1px]">
                     <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                  </div>
                )}
                
                {/* Level Badge */}
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-black shadow-sm">
                   Lv.{slot.user.level}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-white/30">
                {slot.isLocked ? (
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                ) : (
                   <span className="text-lg font-light">+</span>
                )}
              </div>
            )}
            
            {/* Slot Number */}
            {!slot.user && (
              <span className="absolute -bottom-4 text-[9px] font-medium text-white/20">{slot.index}</span>
            )}
         </div>
         
         {/* Name Tag */}
         {slot.user && (
            <div className="mt-1.5 text-center max-w-[70px]">
               <div className="text-[10px] font-bold text-white truncate leading-tight shadow-black drop-shadow-md">
                 {slot.user.name}
               </div>
               {slot.user.isVip && <span className="text-[8px] text-yellow-400 font-bold block">VIP</span>}
            </div>
         )}
         
         {/* Context Menu (Simplified for brevity, same logic as before but better styled) */}
         {selectedSlot === slot.index && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setSelectedSlot(null)}></div>
              <div className="absolute top-10 z-50 w-40 bg-[#1e1e2d] border border-gray-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                 {!slot.user ? (
                    <button onClick={() => { onMicClick(slot.index); setSelectedSlot(null); }} className="w-full text-left px-4 py-3 hover:bg-white/5 text-xs text-white">Take Seat</button>
                 ) : (
                    <div className="py-1">
                       {canPerformAction('mute', slot.user) && <button onClick={() => { onUserAction('mute', slot.user!, slot.index); setSelectedSlot(null); }} className="w-full text-left px-4 py-2 hover:bg-white/5 text-xs text-white">Mute</button>}
                       {canPerformAction('kick', slot.user) && <button onClick={() => { onUserAction('kick', slot.user!, slot.index); setSelectedSlot(null); }} className="w-full text-left px-4 py-2 hover:bg-white/5 text-xs text-orange-400">Kick</button>}
                       <button onClick={() => { onUserAction('profile', slot.user!, slot.index); setSelectedSlot(null); }} className="w-full text-left px-4 py-2 hover:bg-white/5 text-xs text-blue-400">Profile</button>
                    </div>
                 )}
              </div>
            </>
         )}
      </div>
    );
  };

  // Layout: Host (0) on top, then 4x2 grid for seats 1-8
  const hostSlot = slots[0];
  const guestSlots = slots.slice(1);

  return (
    <div className="flex flex-col items-center w-full px-4">
      {/* Host Section */}
      <div className="mb-6 flex flex-col items-center relative">
         <div className="absolute -top-6 -left-8 animate-bounce">
            <span className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">HOST</span>
         </div>
         {renderMic(hostSlot, 'lg')}
      </div>

      {/* Guests Grid (4x2) */}
      <div className="grid grid-cols-4 gap-x-3 gap-y-6 w-full max-w-sm">
         {guestSlots.map(slot => renderMic(slot, 'md'))}
      </div>
    </div>
  );
};

export default MicGrid;
