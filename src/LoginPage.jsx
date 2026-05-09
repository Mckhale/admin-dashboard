import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-primary p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-md w-full relative">
        <div className="bg-black-card border border-border/30 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-primary/10 rounded-full blur-3xl group-hover:bg-purple-primary/20 transition-colors duration-700" />
          
          <div className="text-center mb-12 relative z-10">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-primary to-purple-dark rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-primary/20">
              <span className="text-white font-black text-3xl">EV</span>
            </div>
            <h1 className="text-4xl font-black text-text-primary tracking-tight mb-3">
              EduVerso
            </h1>
            <p className="text-purple-secondary font-bold uppercase tracking-[0.3em] text-[10px]">Admin Portal</p>
          </div>

          <div className="space-y-4 relative z-10">
            <button 
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-purple-primary to-purple-dark text-white font-bold py-5 px-8 rounded-2xl hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-500 active:scale-[0.98] group/btn"
            >
              <span className="flex items-center justify-center gap-2">
                Access Dashboard
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </span>
            </button>
            <p className="text-center text-text-secondary text-xs mt-6">
              Authenticated session for <span className="text-text-primary font-semibold">Super Admin</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

