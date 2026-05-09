import { useMemo } from 'react';
import ModernCard from './ModernCard.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import { 
  UsersIcon, 
  FireIcon, 
  AcademicCapIcon, 
  BookOpenIcon
} from '@heroicons/react/24/outline';

export const DashboardContent = () => {
  const { stats } = useAppContext();
  
  const recentActivities = useMemo(() => [
    { text: 'Student John registered', time: '2min ago', type: 'student' },
    { text: 'Module Math Basics published', time: '15min ago', type: 'module' },
    { text: 'Announcement sent to 1.2K students', time: '1h ago', type: 'announcement' },
    { text: 'Quiz accuracy improved 5%', time: '3h ago', type: 'stats' },
  ], []);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModernCard 
          icon={UsersIcon} 
          title="Total Students" 
          value={stats['total-students']?.toLocaleString() || '1,234'} 
          change="+12.5%"
        />
        <ModernCard 
          icon={FireIcon} 
          title="Active Today" 
          value={stats['active-today'] || '456'} 
          change="+8.2%"
        />
        <ModernCard 
          icon={AcademicCapIcon} 
          title="Avg Accuracy" 
          value={stats['average-accuracy'] ? `${stats['average-accuracy']}%` : '87%'} 
          change="+2.4%"
        />
        <ModernCard 
          icon={BookOpenIcon} 
          title="Modules Active" 
          value={stats['module-usage']?.[0] || '23'} 
          change="+3"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-black-card border border-border/30 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-text-primary mb-6">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-between p-4 bg-purple-primary/10 hover:bg-purple-primary/20 rounded-2xl text-purple-primary font-bold transition-all border border-purple-primary/10 group">
                <span className="flex items-center gap-3">
                  <PlusIcon className="w-5 h-5" />
                  New Student
                </span>
                <div className="w-8 h-8 bg-purple-primary/10 rounded-lg flex items-center justify-center group-hover:bg-purple-primary group-hover:text-white transition-all">
                  →
                </div>
              </button>
              <button className="flex items-center justify-between p-4 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-2xl text-emerald-500 font-bold transition-all border border-emerald-500/10 group">
                <span className="flex items-center gap-3">
                  <ArrowUpTrayIcon className="w-5 h-5" />
                  Upload Module
                </span>
                <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  ↑
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-black-card border border-border/30 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-text-primary">Recent Activity</h3>
            <button className="text-sm text-purple-primary font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, i) => (
              <div key={i} className="group flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-border/30">
                <div className="w-10 h-10 bg-black-primary border border-border/50 rounded-xl flex items-center justify-center">
                  <div className="w-2 h-2 bg-purple-primary rounded-full shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                </div>
                <div className="flex-1">
                  <p className="text-text-primary font-medium text-sm">{activity.text}</p>
                  <p className="text-text-secondary text-[11px] mt-0.5 uppercase tracking-wider font-bold">{activity.type}</p>
                </div>
                <span className="text-text-secondary text-xs font-medium">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};