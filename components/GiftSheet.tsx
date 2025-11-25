import React from 'react';
import { Gift } from '../types';

interface GiftSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSendGift: (gift: Gift) => void;
  coins: number;
}

const GIFTS: Gift[] = [
  { id: 'rose', name: 'Rose', icon: '🌹', cost: 1, animationClass: 'anim-heart' },
  { id: 'heart', name: 'Love', icon: '❤️', cost: 5, animationClass: 'anim-heart' },
  { id: 'kiss', name: 'Kiss', icon: '💋', cost: 10, animationClass: 'anim-heart' },
  { id: 'ring', name: 'Ring', icon: '💍', cost: 99, animationClass: 'anim-heart' },
  { id: 'car', name: 'Supercar', icon: '🏎️', cost: 500, animationClass: 'anim-car' },
  { id: 'rocket', name: 'Rocket', icon: '🚀', cost: 1000, animationClass: 'anim-rocket' },
  { id: 'yacht', name: 'Yacht', icon: '🛥️', cost: 5000, animationClass: 'anim-car' },
  { id: 'dragon', name: 'Dragon', icon: '🐉', cost: 10000, animationClass: 'anim-rocket' },
];

const GiftSheet: React.FC<GiftSheetProps> = ({ isOpen, onClose, onSendGift, coins }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose}></div>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#16161e] rounded-t-3xl border-t border-white/10 shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg">Send Gift</span>
            <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full border border-yellow-500/30">
               💰 {coins}
            </span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-4 p-6 overflow-y-auto max-h-[50vh]">
          {GIFTS.map((gift) => (
            <button
              key={gift.id}
              onClick={() => onSendGift(gift)}
              className="flex flex-col items-center p-3 rounded-xl bg-white/5 hover:bg-purple-600/20 hover:border-purple-500 border border-transparent transition-all group active:scale-95"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{gift.icon}</div>
              <span className="text-xs font-medium text-gray-300">{gift.name}</span>
              <span className="text-[10px] text-yellow-500 font-bold mt-1">💎 {gift.cost}</span>
            </button>
          ))}
        </div>

        {/* Recharge Bar */}
        <div className="p-4 border-t border-white/5 bg-black/20 flex justify-between items-center">
           <span className="text-xs text-gray-500">Need more coins?</span>
           <button className="bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-yellow-500/20">
             Recharge Now
           </button>
        </div>
      </div>
    </>
  );
};

export default GiftSheet;
