import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Brain, 
  Moon, 
  Sun, 
  Zap,
  ChevronRight,
  Globe,
  Mail,
  Palette
} from 'lucide-react';
import { GlassCard, NeonButton } from '../components/UIElements';

const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const sections = [
    {
      title: 'Profile & Account',
      items: [
        { icon: User, label: 'Personal Information', sub: 'Update your name and photo', action: 'Edit' },
        { icon: Mail, label: 'Email Preferences', sub: 'manage your linked emails', action: 'Manage' },
        { icon: Globe, label: 'Connected Apps', sub: 'Notion, Slack, Google Calendar', action: 'Connect' },
      ]
    },
    {
      title: 'AI Preferences',
      items: [
        { icon: Brain, label: 'Model Intelligence', sub: 'Switch between Speed vs Accuracy', action: 'GPT-4o' },
        { icon: Zap, label: 'Auto-Task Extraction', sub: 'Analyze documents automatically', toggle: true, state: true },
        { icon: Shield, label: 'Data Privacy', sub: 'Control local processing settings', action: 'Review' },
      ]
    },
    {
      title: 'Interface',
      items: [
        { icon: Palette, label: 'Theme Style', sub: 'Glassmorphism vs Solid UI', action: 'Glass' },
        { icon: Moon, label: 'Dark Mode', sub: 'Adjust system appearance', toggle: true, state: isDarkMode, setter: setIsDarkMode },
        { icon: Bell, label: 'Push Notifications', sub: 'Get alerts for upcoming deadlines', toggle: true, state: notifications, setter: setNotifications },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-['Outfit']">Settings</h1>
          <p className="text-slate-400">Configure your AI experience and account preferences.</p>
        </div>
        <NeonButton className="py-2.5 px-8">Save Changes</NeonButton>
      </div>

      <div className="space-y-8">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 ml-2">{section.title}</h3>
            <div className="grid gap-px overflow-hidden bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              {section.items.map((item, i) => (
                <div key={i} className="bg-background/40 hover:bg-white/[0.03] transition-colors p-5 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary-cyan transition-colors border border-white/5">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white tracking-wide">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.sub}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {item.toggle ? (
                      <button 
                        onClick={() => item.setter && item.setter(!item.state)}
                        className={`w-12 h-6 rounded-full transition-all duration-300 relative ${item.state ? 'bg-primary-cyan' : 'bg-slate-700'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${item.state ? 'left-7' : 'left-1'}`} />
                      </button>
                    ) : (
                      <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors group/btn">
                        {item.action}
                        <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Danger Zone */}
      <GlassCard className="border-rose-500/20 bg-rose-500/5 mt-12">
         <div className="flex items-center justify-between">
            <div>
              <h3 className="text-rose-400 font-bold mb-1">Danger Zone</h3>
              <p className="text-xs text-slate-500">Irreversibly delete your account and all AI training data.</p>
            </div>
            <button className="px-4 py-2 rounded-xl border border-rose-500/30 text-rose-500 text-xs font-bold hover:bg-rose-500 hover:text-white transition-all">
              Delete Account
            </button>
         </div>
      </GlassCard>
    </div>
  );
};

export default SettingsPage;
