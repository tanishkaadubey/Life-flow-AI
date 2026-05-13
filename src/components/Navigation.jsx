import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, CheckSquare, FileUp, Settings, LogOut, Zap, Bell, Search, User } from 'lucide-react';
import { supabase } from "../supabaseClient";
export const Sidebar = ({ activePage, setActivePage }) => {

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
    { id: 'files', icon: FileUp, label: 'Files' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="hidden lg:flex flex-col w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 h-screen sticky top-0">

      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-cyan to-primary-purple flex items-center justify-center shadow-lg shadow-primary-cyan/20">
          <Zap size={24} className="text-white fill-current" />
        </div>

        <span className="text-xl font-bold font-['Outfit'] bg-clip-text text-transparent bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-pink">
          LifeFlow AI
        </span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
              ${activePage === item.id
                ? 'bg-white/10 text-primary-cyan border border-white/10'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
          >
            <item.icon
              size={20}
              className={activePage === item.id
                ? 'text-primary-cyan'
                : 'group-hover:text-slate-200'}
            />

            <span className="font-medium">{item.label}</span>

            {activePage === item.id && (
              <motion.div
                layoutId="active"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-cyan shadow-[0_0_8px_rgba(34,211,238,0.8)]"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl transition-all duration-300 hover:border-white/20 p-4 flex items-center gap-3 mb-4">

          <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden">
            <User size={20} />
          </div>

          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate">
              Alex Rivera
            </p>

            <p className="text-xs text-slate-400 truncate text-primary-cyan/80">
              Pro Plan
            </p>
          </div>

        </div>

        <button
          onClick={() => supabase.auth.signOut()}
          className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-rose-400 transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">
            Logout
          </span>
        </button>

      </div>

    </div>
  );
};
export const Navbar = () => {
  return (
    <header className="h-20 bg-white/5 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative group flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-cyan transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search everything..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-12 pr-4 outline-none focus:border-primary-cyan/50 focus:bg-white/10 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-pink rounded-full shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
        </button>
        <div className="h-8 w-px bg-white/10 mx-2" />
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400">Total Progress</p>
            <p className="text-sm font-bold text-primary-cyan">84%</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-primary-cyan/30 p-0.5">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
               <User size={24} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

