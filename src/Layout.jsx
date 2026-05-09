import { Outlet } from 'react-router-dom';
import { useState, useMemo, useCallback } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  MagnifyingGlassIcon, 
  BellIcon,
  Squares2X2Icon,
  UsersIcon,
  BookOpenIcon,
  MegaphoneIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Squares2X2Icon },
  { name: 'Students', path: '/dashboard/students', icon: UsersIcon },
  { name: 'Modules', path: '/dashboard/modules', icon: BookOpenIcon },
  { name: 'Announcements', path: '/dashboard/announcements', icon: MegaphoneIcon },
  { name: 'Feedback', path: '/dashboard/feedback', icon: ChatBubbleLeftRightIcon },
  { name: 'Stats', path: '/dashboard/stats', icon: ChartBarIcon },
  { name: 'Games', path: '/dashboard/games', icon: RocketLaunchIcon },
  { name: 'Settings', path: '/dashboard/settings', icon: Cog6ToothIcon },
];

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const filteredNavItems = useMemo(() => 
    navItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  const isActive = useCallback((path) => {
    const active = path === '/dashboard' 
      ? location.pathname === '/dashboard' 
      : location.pathname.startsWith(path);
    return `sidebar-link group ${active ? 'sidebar-link-active' : ''}`;
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-black-secondary text-text-primary overflow-hidden relative">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-purple-dark/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-black-primary border-r border-white/5 transform md:relative md:translate-x-0 md:w-72 lg:w-80 h-full transition-transform duration-500 ease-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-border/20">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-primary to-purple-dark rounded-2xl flex items-center justify-center shadow-lg shadow-purple-primary/20">
              <span className="text-white font-bold text-xl">EV</span>
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-text-primary">
                EduVerso
              </h2>
              <p className="text-purple-secondary text-[10px] font-bold uppercase tracking-[0.2em]">Admin Panel</p>
            </div>
          </div>
        </div>
        
        <nav className="p-6 space-y-1.5 flex-1 overflow-y-auto">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={isActive(item.path)}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm tracking-wide">{item.name}</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-primary/40" />
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-border/20">
          <div className="p-4 bg-gradient-to-br from-purple-primary/10 to-transparent rounded-2xl border border-purple-primary/10">
            <p className="text-xs text-text-secondary mb-3">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[11px] font-medium text-text-primary">All systems operational</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        className="fixed top-6 left-6 z-50 p-2.5 rounded-xl bg-black-card border border-border/50 shadow-xl md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <XMarkIcon className="h-6 w-6 text-text-primary" /> : <Bars3Icon className="h-6 w-6 text-text-primary" />}
      </button>

      {/* Main content */}
      <main className="flex-1 min-w-0 p-6 md:p-10 overflow-y-auto bg-transparent relative z-10">
        <header className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary tracking-tight">
                {navItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-text-secondary text-sm">Welcome back,</span>
                <span className="text-purple-primary font-semibold text-sm">Admin</span>
                <span className="text-text-secondary text-sm">👋</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-80 pl-11 pr-4 py-3 bg-black-card border border-border/50 rounded-xl text-sm text-text-primary placeholder-text-secondary focus:border-purple-primary focus:ring-1 focus:ring-purple-primary/20 outline-none transition-all"
                  placeholder="Search everything..."
                />
                <MagnifyingGlassIcon className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-purple-primary transition-colors" />
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-3 bg-black-card hover:bg-white/5 border border-border/50 rounded-xl text-text-secondary hover:text-text-primary transition-all relative">
                  <BellIcon className="h-5 w-5" />
                  <span className="absolute top-2.5 right-3 w-2 h-2 bg-purple-primary rounded-full border-2 border-black-card" />
                </button>
                <div className="flex items-center gap-3 pl-2 border-l border-border/20 ml-2">
                  <div className="hidden md:block text-right">
                    <p className="text-xs font-bold text-text-primary">Admin User</p>
                    <p className="text-[10px] text-text-secondary uppercase tracking-wider">Super Admin</p>
                  </div>
                  <div className="w-11 h-11 bg-gradient-to-br from-purple-primary to-purple-dark rounded-xl flex items-center justify-center text-white font-bold shadow-lg cursor-pointer hover:scale-105 transition-transform">
                    AA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

