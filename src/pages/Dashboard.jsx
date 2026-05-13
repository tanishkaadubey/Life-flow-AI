import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  BrainCircuit, 
  MoreVertical,
  Calendar as CalendarIcon,
  Plus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { GlassCard, NeonButton } from '../components/UIElements';
import { useTaskContext } from '../context/TaskContext';

const data = [
  { name: 'Mon', score: 65 },
  { name: 'Tue', score: 85 },
  { name: 'Wed', score: 72 },
  { name: 'Thu', score: 90 },
  { name: 'Fri', score: 88 },
  { name: 'Sat', score: 95 },
  { name: 'Sun', score: 92 },
];

const Dashboard = ({ setActivePage }) => {
  const userName = localStorage.getItem('userName') || 'User';
  const { tasks } = useTaskContext();

  const stats = [
    { 
      label: 'Pending Tasks', 
      value: tasks.filter(t => (t.status || '').toLowerCase() !== 'completed').length, 
      icon: Clock, 
      color: 'text-primary-cyan', 
      bg: 'bg-primary-cyan/10' 
    },
    { 
      label: 'Completed', 
      value: tasks.filter(t => (t.status || '').toLowerCase() === 'completed').length, 
      icon: CheckCircle2, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-400/10' 
    },
    { label: 'AI Accuracy', value: '98.4%', icon: BrainCircuit, color: 'text-primary-purple', bg: 'bg-primary-purple/10' },
    { label: 'Productivity Score', value: '84', icon: TrendingUp, color: 'text-primary-pink', bg: 'bg-primary-pink/10' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">
  Welcome back, {userName}
</h1>
          <p className="text-slate-400">Here's what's happening with your productivity today.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all text-sm font-medium">
            <CalendarIcon size={16} /> Last 7 Days
          </button>
          <NeonButton
  onClick={() => setActivePage('upload')}
  className="py-2 px-6 flex items-center gap-2 text-sm"
>
            <Plus size={16} /> New Task
          </NeonButton>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <GlassCard key={idx} className="relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-bl-full -mr-12 -mt-12 blur-2xl group-hover:blur-xl transition-all`} />
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center">
                <TrendingUp size={12} className="mr-1" /> +12%
              </span>
              <span className="text-xs text-slate-500">from last week</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Productivity Chart */}
        <GlassCard className="lg:col-span-2" hover={false}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Productivity Flow</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary-cyan shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                <span className="text-xs text-slate-400">Activity</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#22d3ee" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* AI Suggestions */}
        <GlassCard className="flex flex-col" hover={false}>
          <div className="flex items-center gap-2 mb-6">
            <BrainCircuit className="text-primary-purple" size={20} />
            <h3 className="text-xl font-bold">AI Intelligence</h3>
          </div>
          <div className="space-y-4 flex-1">
            <div className="p-4 rounded-xl bg-primary-purple/5 border border-primary-purple/20">
              <p className="text-xs font-bold text-primary-purple uppercase mb-1">Focus Insight</p>
              <p className="text-sm text-slate-300">You're most productive between <span className="text-white font-semibold">9 AM - 11 AM</span>. We've scheduled your Deep Work session for tomorrow.</p>
            </div>
            <div className="p-4 rounded-xl bg-primary-cyan/5 border border-primary-cyan/20">
              <p className="text-xs font-bold text-primary-cyan uppercase mb-1">Task Suggestion</p>
              <p className="text-sm text-slate-300">"Refactor AI Core" has been sitting for 3 days. Should I break it down into smaller sub-tasks?</p>
              <div className="mt-3 flex gap-2">
                <button className="text-xs px-3 py-1.5 rounded-lg bg-primary-cyan text-background font-bold">Break Down</button>
                <button className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-slate-400">Ignore</button>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-medium">AI Agent Online</span>
            </div>
            <MoreVertical size={16} className="text-slate-500" />
          </div>
        </GlassCard>
      </div>

      {/* Task Preview Table */}
      <GlassCard hover={false}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Recent Tasks</h3>
          <button
  onClick={() => setActivePage('tasks')}
  className="text-sm text-primary-cyan hover:underline font-medium"
>
  View All
</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-slate-500 text-sm">
                <th className="pb-4 font-medium">Task Name</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium">Priority</th>
                <th className="pb-4 font-medium">Due Date</th>
                <th className="pb-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tasks.slice(0, 4).map((task) => (
                <tr key={task.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary-cyan shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                      <span className="font-medium group-hover:text-primary-cyan transition-colors">{task.title}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                      (task.status || '').toLowerCase() === 'completed' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' :
                      (task.status || '').toLowerCase() === 'in progress' ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' :
                      'bg-slate-400/10 text-slate-400 border-slate-400/20'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`text-sm font-medium ${
                      ['urgent', 'high'].includes((task.priority || '').toLowerCase()) ? 'text-primary-pink' :
                      (task.priority || '').toLowerCase() === 'medium' ? 'text-primary-purple' :
                      'text-slate-400'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-slate-400">{task.due_date}</td>
                  <td className="py-4 text-right">
                    <button className="text-slate-500 hover:text-white transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default Dashboard;
