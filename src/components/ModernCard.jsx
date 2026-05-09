import React from 'react';

const ModernCardComponent = ({ icon: Icon, title, value, change, isPositive = true }) => (
  <div className="group relative bg-black-card border border-border/30 rounded-3xl p-6 hover:border-purple-primary/30 hover:shadow-2xl hover:shadow-purple-primary/10 transition-all duration-500 cursor-pointer overflow-hidden">
    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-purple-primary/5 rounded-full blur-3xl group-hover:bg-purple-primary/10 transition-colors pointer-events-none" />
    
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-primary/10 to-purple-secondary/5 rounded-xl flex items-center justify-center border border-purple-primary/10 group-hover:scale-110 transition-transform duration-500">
        {typeof Icon === 'string' ? (
          <span className="text-xl">{Icon}</span>
        ) : (
          <Icon className="w-6 h-6 text-purple-primary" />
        )}
      </div>
      <div>
        <h3 className="text-text-secondary font-medium text-xs uppercase tracking-wider">{title}</h3>
      </div>
    </div>

    <div className="flex items-end justify-between">
      <div>
        <p className="text-3xl font-bold text-text-primary tracking-tight">{value}</p>
        {change && (
          <div className="flex items-center gap-1.5 mt-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              isPositive 
                ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {change}
            </span>
            <span className="text-[10px] text-text-secondary font-medium italic">vs last month</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const ModernCard = React.memo(ModernCardComponent);

export default ModernCard;

