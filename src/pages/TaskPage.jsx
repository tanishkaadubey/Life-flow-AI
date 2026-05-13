
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  GripVertical, 
  MoreVertical, 
  Calendar,
  MessageSquare,
  Paperclip,
  X
} from 'lucide-react';
import { GlassCard, NeonButton } from '../components/UIElements';
import { useTaskContext } from '../context/TaskContext';

const TaskPage = () => {
  const { tasks, deleteTask, updateTask, addTask } = useTaskContext();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const handleStatusChange = (id, currentStatus) => {
    const statusOrder = ['todo', 'in progress', 'completed'];
    const currentIndex = statusOrder.indexOf((currentStatus || 'todo').toLowerCase());
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    updateTask(id, { status: nextStatus });
  };

  console.log('TaskPage - Total Tasks in Context:', tasks);
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || task.priority?.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });
  console.log('TaskPage - Filtered Tasks:', filteredTasks);

  const columns = [
    { id: 'todo', label: 'Todo', color: 'bg-slate-400' },
    { id: 'in progress', label: 'In Progress', color: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]' },
    { id: 'completed', label: 'Completed', color: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' }
  ];

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-['Outfit']">Task Management</h1>
          <p className="text-slate-400">Organize and prioritize your workflow with AI-powered insights.</p>
        </div>
        <NeonButton
  className="flex items-center gap-2"
  onClick={() => {

    const title = prompt("Enter task title");

    if (!title) return;

    addTask({
      id: crypto.randomUUID(),
      title,
      dueDate: "No deadline",
      priority: "medium",
      status: "todo",
    });

  }}
>
  <Plus size={18} /> Add New Task
</NeonButton>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:w-64 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-cyan transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 focus:border-primary-cyan/50 focus:bg-white/10 outline-none transition-all text-sm"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-slate-400">
            <Filter size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Priority:</span>
          </div>
          {['All', 'Urgent', 'High', 'Medium', 'Low'].map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap
                ${filter === p 
                  ? 'bg-primary-cyan text-background shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
                  : 'bg-white/5 text-slate-400 border border-white/5 hover:border-white/10 hover:text-slate-200'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden min-h-[600px]">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${column.color}`} />
                <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">{column.label}</h3>
                <span className="ml-2 px-1.5 py-0.5 rounded-md bg-white/5 text-[10px] text-slate-500 font-bold">
                  {filteredTasks.filter(t => (t.status || 'todo').toLowerCase() === column.id).length}
                </span>
              </div>
              <button className="text-slate-500 hover:text-white transition-colors">
                <Plus size={16} />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 pb-8 scrollbar-hide">
              <AnimatePresence mode='popLayout'>
                {filteredTasks.filter(t => (t.status || 'todo').toLowerCase() === column.id).map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GlassCard className="p-4 cursor-grab active:cursor-grabbing hover:border-white/20">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            ['urgent', 'high'].includes((task.priority || '').toLowerCase()) ? 'bg-primary-pink/10 text-primary-pink border border-primary-pink/20' :
                            (task.priority || '').toLowerCase() === 'medium' ? 'bg-primary-purple/10 text-primary-purple border border-primary-purple/20' :
                            'bg-slate-400/10 text-slate-400 border border-slate-400/20'
                          }`}>
                            {task.priority}
                          </span>
                          <button 
                            onClick={() => handleStatusChange(task.id, task.status || 'todo')}
                            className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-slate-400 hover:text-primary-cyan transition-colors"
                          >
                            Move →
                          </button>
                        </div>
                        <button 
                          onClick={() => {
                            if(window.confirm('Delete this task?')) deleteTask(task.id);
                          }}
                          className="text-slate-600 hover:text-rose-400 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      
                      <h4 className="font-bold text-sm mb-3 group-hover:text-primary-cyan transition-colors">{task.title}</h4>
                      
                    
<div className="flex gap-2 mb-3">

  <button
    onClick={() => {

      const calendarUrl =
        `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(task.title)}&details=${encodeURIComponent("Reminder from LifeFlow AI")}`;

      window.open(calendarUrl, "_blank");
    }}
    className="px-3 py-1 rounded-lg bg-primary-cyan/10 border border-primary-cyan/20 text-primary-cyan text-[10px] font-bold hover:bg-primary-cyan/20 transition-all"
  >
    Add to Calendar
  </button>

  <button
    onClick={() => {

      const message =
        `Reminder: ${task.title} | Deadline: ${task.due_date}`;

      const whatsappUrl =
        `https://wa.me/?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, "_blank");
    }}
    className="px-3 py-1 rounded-lg bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-[10px] font-bold hover:bg-emerald-400/20 transition-all"
  >
    WhatsApp Reminder


  </button>

<button
  onClick={async () => {

    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const CHAT_ID = "6375437149";

    console.log("BOT TOKEN:", BOT_TOKEN);
    console.log("CHAT ID:", CHAT_ID);

    const message =
      `⏰ Reminder: ${task.title} | Deadline: ${task.due_date}`;

    await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      }
    );

    alert("Telegram reminder sent!");

  }}
  className="px-3 py-1 rounded-lg bg-sky-400/10 border border-sky-400/20 text-sky-400 text-[10px] font-bold hover:bg-sky-400/20 transition-all"
>
  Telegram Reminder
</button>



</div>
```

                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-4 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{task.due_date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare size={12} />
                          <span>2</span>
                        </div>
                        <div className="ml-auto flex -space-x-2">
                           <div className="w-5 h-5 rounded-full bg-slate-700 border border-background flex items-center justify-center text-[8px] font-bold">JD</div>
                           <div className="w-5 h-5 rounded-full bg-primary-cyan border border-background flex items-center justify-center text-[8px] font-bold text-background">AR</div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
