import React, { useState } from 'react';
import { RoomSettings } from '../types';

interface AdminPanelProps {
  settings: RoomSettings;
  onSettingsChange: (newSettings: RoomSettings) => void;
  onSimulateJoin: () => void;
  onSearchUser: (id: string) => void;
  isConnected: boolean;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  settings,
  onSettingsChange,
  onSimulateJoin,
  onSearchUser,
  isConnected
}) => {
  const [searchId, setSearchId] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(searchId.trim()) {
      onSearchUser(searchId);
      setSearchId('');
    }
  };

  return (
    <div className="bg-[#121218] border-l border-gray-800 w-full md:w-80 flex flex-col h-full shadow-2xl z-20">
      <div className="p-6 border-b border-gray-800 bg-[#16161e]">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Admin Control
        </h2>
        <p className="text-xs text-gray-500 mt-1">Manage Room & Users</p>
      </div>

      <div className="p-6 space-y-8 flex-1 overflow-y-auto">
        
        {/* User Search */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Find User</h3>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input 
              type="text" 
              placeholder="Enter User ID..." 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-1 bg-black/30 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none placeholder-gray-600"
            />
            <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </form>
        </div>

        {/* Room Settings */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Room Settings</h3>
          
          <div>
            <label className="block text-xs text-gray-400 mb-2">Room Name</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => onSettingsChange({...settings, name: e.target.value})}
              className="w-full bg-black/30 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-2">AI Moderator Mode</label>
            <div className="grid grid-cols-1 gap-2">
              {(['chill', 'strict', 'bouncer'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => onSettingsChange({...settings, moderationLevel: level})}
                  disabled={isConnected}
                  className={`px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-all border ${
                    settings.moderationLevel === level
                      ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                      : 'bg-gray-800/50 border-transparent text-gray-400 hover:bg-gray-800'
                  } ${isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
                    {settings.moderationLevel === level && <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Simulator Actions */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Simulation</h3>
          <p className="text-[10px] text-gray-500 leading-relaxed">
            Since this is a demo, use this to spawn fake users to test your moderation powers.
          </p>
          
          <button
            onClick={onSimulateJoin}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-900/40 to-cyan-900/40 hover:from-blue-800/50 hover:to-cyan-800/50 text-blue-400 border border-blue-500/30 py-3 rounded-lg transition-all active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
            <span className="text-sm font-semibold">Add Fake User</span>
          </button>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-800 bg-[#0f0f13]">
         <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-xs font-mono text-gray-400">{isConnected ? 'GEMINI LIVE: ON' : 'GEMINI LIVE: OFF'}</span>
         </div>
      </div>
    </div>
  );
};

export default AdminPanel;