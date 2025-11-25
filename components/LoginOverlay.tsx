import React, { useState } from 'react';

interface LoginOverlayProps {
  onLogin: () => void;
}

const LoginOverlay: React.FC<LoginOverlayProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length > 9) setStep('otp');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) onLogin();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f0f13] bg-[url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      
      <div className="relative w-full max-w-sm p-8 bg-[#1a1a24] border border-white/10 rounded-3xl shadow-2xl mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">MAJE LO</h1>
          <p className="text-gray-400 text-sm mt-1">The Ultimate Party Room</p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Mobile Number</label>
              <div className="flex bg-black/40 border border-gray-700 rounded-xl mt-1 overflow-hidden focus-within:border-purple-500 transition-colors">
                <span className="px-3 py-3.5 text-gray-400 border-r border-gray-700 bg-gray-900/50">+91</span>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 43210"
                  className="flex-1 bg-transparent px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none"
                  autoFocus
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-900/40 active:scale-95 transition-all"
            >
              Send OTP
            </button>
            <div className="text-center">
               <p className="text-xs text-gray-500 mt-4">By continuing, you agree to our Terms & Privacy Policy.</p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4 animate-in slide-in-from-right-10 fade-in duration-300">
             <div>
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Enter OTP</label>
              <input 
                type="text" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full bg-black/40 border border-gray-700 rounded-xl mt-1 px-4 py-3.5 text-white placeholder-gray-600 focus:border-purple-500 focus:outline-none tracking-widest text-center text-xl font-mono"
                maxLength={6}
                autoFocus
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-100 active:scale-95 transition-all"
            >
              Verify & Login
            </button>
            <button 
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-sm text-gray-400 py-2"
            >
              Change Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginOverlay;
