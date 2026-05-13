import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Sparkles, ArrowRight, BarChart3, Users, Clock } from 'lucide-react';
import { NeonButton, GlassCard } from '../components/UIElements';

const LandingPage = ({ onStart }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="bg-mesh" />
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 relative z-10">
        <div className="flex items-center gap-2">
          <Zap className="text-primary-cyan fill-current" />
          <span className="text-2xl font-bold font-['Outfit'] bg-clip-text text-transparent bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-pink">LifeFlow AI</span>
        </div>
        <div className="hidden md:flex gap-8 text-slate-400 font-medium">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
        </div>
        <NeonButton onClick={onStart}>Get Started</NeonButton>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 px-4 py-1 rounded-full border border-primary-cyan/30 bg-primary-cyan/5 text-primary-cyan text-sm font-semibold flex items-center gap-2"
        >
          <Sparkles size={16} /> New: AI Task Extraction 2.0 is live!
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold font-['Outfit'] mb-6 tracking-tight"
        >
          Organize Your Life <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-pink">With AI Intelligence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl text-lg text-slate-400 mb-10 leading-relaxed"
        >
          Experience the next generation of productivity. LifeFlow AI extracts tasks from your thoughts, 
          automates your schedule, and optimizes your focus using advanced neural networks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <NeonButton onClick={onStart} className="px-10 py-4 text-lg">
            Start Your Flow <ArrowRight size={20} className="inline ml-2" />
          </NeonButton>
          <button className="px-10 py-4 text-lg font-semibold rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all">
            Watch Demo
          </button>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/4 left-10 w-32 h-32 bg-white/5 backdrop-blur-xl border border-primary-cyan/20 rounded-2xl hidden xl:flex flex-col p-4 items-start gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-primary-cyan/20 flex items-center justify-center text-primary-cyan">
             <Clock size={18} />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Focus Mode</p>
          <p className="text-xl font-bold">45:00</p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          className="absolute top-1/3 right-10 w-40 h-40 bg-white/5 backdrop-blur-xl border border-primary-purple/20 rounded-2xl hidden xl:flex flex-col p-4 items-start gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-primary-purple/20 flex items-center justify-center text-primary-purple">
             <BarChart3 size={18} />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Productivity</p>
          <p className="text-2xl font-bold font-['Outfit']">+24%</p>
          <div className="w-full h-2 bg-white/5 rounded-full mt-2">
            <div className="w-3/4 h-full bg-primary-purple rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-8 py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built for the Future</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Harness the power of AI to transform how you work, think, and achieve your goals.</p>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: Zap, title: "Neural Task Extraction", desc: "Instantly convert voice notes, images, or PDFs into structured tasks." },
              { icon: Shield, title: "Private by Design", desc: "Your data is encrypted and processed locally. We value your privacy as much as you do." },
              { icon: Sparkles, title: "Predictive Schedule", desc: "Our AI learns your habits to suggest the best time for deep work." }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={item}>
                <GlassCard className="h-full border-t border-t-white/10">
                  <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center ${idx === 0 ? 'bg-primary-cyan/20 text-primary-cyan' : idx === 1 ? 'bg-primary-purple/20 text-primary-purple' : 'bg-primary-pink/20 text-primary-pink'}`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 text-center border-t border-white/5">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Zap className="text-primary-cyan fill-current" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-pink">LifeFlow AI</span>
        </div>
        <p className="text-slate-500 text-sm mb-8">© 2026 LifeFlow AI Inc. All rights reserved. Designed for the high-achievers.</p>
        <div className="flex justify-center gap-6 text-slate-400">
          <a href="#" className="hover:text-primary-cyan transition-colors">Twitter</a>
          <a href="#" className="hover:text-primary-cyan transition-colors">Discord</a>
          <a href="#" className="hover:text-primary-cyan transition-colors">GitHub</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
