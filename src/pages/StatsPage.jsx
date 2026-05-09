import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { useAppContext } from '../context/AppContext.jsx';

const StatsPage = () => {
  const { stats, addNotification } = useAppContext();
  
  const onlineUsers = useMemo(() => ['John Doe', 'Jane Smith', 'Bob Johnson'], []);

  const xpTrendData = useMemo(() => stats['xp-trend'] ? stats['xp-trend'].map((value, index) => ({
    date: `Day ${index + 1}`,
    xp: value,
  })) : [], [stats]);

  const moduleUsageData = useMemo(() => stats['module-usage'] ? [
    { name: 'Lessons', value: stats['module-usage'][0] },
    { name: 'Quizzes', value: stats['module-usage'][1] },
    { name: 'Voice', value: stats['module-usage'][2] },
  ] : [], [stats]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-text-primary">System Insights & Analytics</h1>
        <button
          onClick={() => addNotification('Analytics data refreshed')}
          className="px-8 py-3 bg-gradient-to-r from-purple-primary/20 to-purple-secondary/20 border border-purple-primary/30 text-purple-primary font-semibold rounded-2xl hover:shadow-lg transition-all"
        >
          Refresh Data
        </button>
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="card p-6 text-center">
          <div className="text-3xl font-black text-text-primary mb-2">{stats['total-students']?.toLocaleString() || '1,234'}</div>
          <div className="text-text-secondary text-sm">Total Students</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-black text-green-400 mb-2">{stats['active-today'] || '456'}</div>
          <div className="text-text-secondary text-sm">Active Today</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-black text-yellow-400 mb-2">{stats['average-accuracy'] || '87%'}%</div>
          <div className="text-text-secondary text-sm">Avg Accuracy</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-black text-purple-primary mb-2">{stats['completion-rate'] || '72%'}</div>
          <div className="text-text-secondary text-sm">Completion Rate</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-black text-emerald-400 mb-2">{onlineUsers.length}</div>
          <div className="text-text-secondary text-sm">Online Now</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-black text-blue-400 mb-2">{stats['module-usage']?.length || '23'}</div>
          <div className="text-text-secondary text-sm">Active Modules</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* XP Trend Chart */}
        <div className="card p-8">
          <h3 className="text-2xl font-black text-text-primary mb-6">XP Trend (Last 5 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={xpTrendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="xp" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6', strokeWidth: 2 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Module Usage Chart */}
        <div className="card p-8">
          <h3 className="text-2xl font-black text-text-primary mb-6">Module Usage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={moduleUsageData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Online Users */}
      <div className="card p-8">
        <h3 className="text-2xl font-black text-text-primary mb-6">Live Users Online ({onlineUsers.length})</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {onlineUsers.map((user, i) => (
            <div key={i} className="p-4 bg-black-card/50 rounded-2xl flex items-center gap-3 border border-border/50 hover:border-purple-primary/50 transition-all group">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-text-primary font-medium group-hover:text-purple-primary transition-colors">{user}</span>
            </div>
          ))}
          {onlineUsers.length === 0 && (
            <div className="col-span-full p-8 text-center text-text-secondary py-12 border-2 border-dashed border-border/50 rounded-3xl">
              No users online
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;

