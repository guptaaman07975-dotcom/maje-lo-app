import React, { useState } from 'react';
import { User } from '../types';

interface UserProfileModalProps {
  user: User;
  onSave: (name: string, avatar: string) => void;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, onSave, onClose }) => {
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);

  const avatars = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Molly',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-purple-500/30 rounded-2xl w-full max-w-md p-6 m-4 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-purple-500">Edit Profile</span>
        </h2>
        
        <div className="space-y-6">
          {/* Avatar Selection */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Choose Avatar</label>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {avatars.map((url) => (
                <button
                  key={url}
                  onClick={() => setAvatar(url)}
                  className={`relative w-14 h-14 rounded-full flex-shrink-0 border-2 transition-all ${
                    avatar === url ? 'border-purple-500 scale-110' : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <img src={url} alt="Avatar" className="w-full h-full rounded-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Name Input */}
          <div>
             <label className="block text-sm text-gray-400 mb-2">Display Name</label>
             <input 
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
               className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
               placeholder="Enter your name"
             />
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => onSave(name, avatar)}
              className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
